/**
 * Availability Calculator
 * Computes available appointment slots based on existing appointments
 * and clinic working hours
 */

import { format, parse, addMinutes, isBefore, isAfter, startOfDay, setHours, setMinutes } from 'date-fns';
import { clinicInfo } from '@/config/content';
import type { Appointment, Provider } from './types';

export interface AvailableSlot {
  startTime: string;  // ISO 8601
  endTime: string;    // ISO 8601
  providerId: string;
  providerName: string;
}

interface WorkingHours {
  start: number;  // Hour (0-23)
  end: number;    // Hour (0-23)
  slotDurationMinutes: number;
  workingDays: number[];  // 0 = Sunday, 6 = Saturday
}

/**
 * Get working hours configuration
 */
function getWorkingHours(): WorkingHours {
  return {
    start: clinicInfo.workingHours.start,
    end: clinicInfo.workingHours.end,
    slotDurationMinutes: clinicInfo.workingHours.slotDurationMinutes,
    workingDays: [...clinicInfo.workingHours.workingDays],
  };
}

/**
 * Check if a time slot conflicts with existing appointments
 */
function hasConflict(
  slotStart: Date,
  slotEnd: Date,
  appointments: Appointment[]
): boolean {
  return appointments.some((apt) => {
    const aptStart = new Date(apt.StartTime);
    const aptEnd = new Date(apt.EndTime);
    
    // Check for overlap
    return (
      (slotStart >= aptStart && slotStart < aptEnd) ||
      (slotEnd > aptStart && slotEnd <= aptEnd) ||
      (slotStart <= aptStart && slotEnd >= aptEnd)
    );
  });
}

/**
 * Generate all possible slots for a given date
 */
function generateDaySlots(
  date: Date,
  duration: number,
  workingHours: WorkingHours
): { start: Date; end: Date }[] {
  const slots: { start: Date; end: Date }[] = [];
  
  // Check if it's a working day
  const dayOfWeek = date.getDay();
  if (!workingHours.workingDays.includes(dayOfWeek)) {
    return slots;
  }

  // Start of working hours
  let currentSlot = setMinutes(setHours(startOfDay(date), workingHours.start), 0);
  const endOfDay = setMinutes(setHours(startOfDay(date), workingHours.end), 0);

  // Generate slots
  while (isBefore(addMinutes(currentSlot, duration), endOfDay) || 
         format(addMinutes(currentSlot, duration), 'HH:mm') === format(endOfDay, 'HH:mm')) {
    const slotEnd = addMinutes(currentSlot, duration);
    
    // Don't go past end of day
    if (isAfter(slotEnd, endOfDay)) {
      break;
    }

    slots.push({
      start: new Date(currentSlot),
      end: slotEnd,
    });

    currentSlot = addMinutes(currentSlot, workingHours.slotDurationMinutes);
  }

  return slots;
}

/**
 * Calculate available slots for a specific date
 */
export function calculateAvailableSlots(
  date: string,  // YYYY-MM-DD
  duration: number,  // minutes
  existingAppointments: Appointment[],
  providers: Provider[]
): AvailableSlot[] {
  const workingHours = getWorkingHours();
  const targetDate = parse(date, 'yyyy-MM-dd', new Date());
  const now = new Date();
  
  // Don't allow booking in the past
  if (isBefore(targetDate, startOfDay(now))) {
    return [];
  }

  const availableSlots: AvailableSlot[] = [];

  // For each provider, calculate their available slots
  for (const provider of providers) {
    // Filter appointments for this provider
    const providerAppointments = existingAppointments.filter(
      (apt) => apt.ProviderID === provider.ID && apt.Status !== 'Cancelled'
    );

    // Generate all possible slots
    const daySlots = generateDaySlots(targetDate, duration, workingHours);

    // Filter out slots that conflict with existing appointments
    for (const slot of daySlots) {
      // Skip if slot is in the past
      if (isBefore(slot.start, now)) {
        continue;
      }

      // Check for conflicts
      if (!hasConflict(slot.start, slot.end, providerAppointments)) {
        availableSlots.push({
          startTime: slot.start.toISOString(),
          endTime: slot.end.toISOString(),
          providerId: provider.ID,
          providerName: provider.FullName,
        });
      }
    }
  }

  // Sort by start time
  availableSlots.sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return availableSlots;
}

/**
 * Get available dates for the next N days
 */
export function getAvailableDates(
  startDate: string,
  days: number = 30
): string[] {
  const workingHours = getWorkingHours();
  const dates: string[] = [];
  const start = parse(startDate, 'yyyy-MM-dd', new Date());

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + i);
    
    // Only include working days
    if (workingHours.workingDays.includes(currentDate.getDay())) {
      dates.push(format(currentDate, 'yyyy-MM-dd'));
    }
  }

  return dates;
}

/**
 * Format slot for display
 */
export function formatSlotTime(isoString: string): string {
  const date = new Date(isoString);
  return format(date, 'h:mm a');
}

/**
 * Format date for display
 */
export function formatSlotDate(isoString: string): string {
  const date = new Date(isoString);
  return format(date, 'EEEE, MMMM d, yyyy');
}

