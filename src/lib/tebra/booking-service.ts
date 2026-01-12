/**
 * Booking Service
 * High-level service for handling appointment bookings
 */

import { format, addMinutes } from 'date-fns';
import {
  searchPatient,
  createPatient,
  createAppointment,
  getAppointments,
} from './soap-client';
import {
  getBootstrapData,
  getPrimaryPracticeId,
  getPrimaryServiceLocationId,
  getPrimaryProviderId,
  getAppointmentReasonById,
} from './cache';
import { calculateAvailableSlots, type AvailableSlot } from './availability';
import type { CreatePatientRequest, Patient } from './types';

export interface BookingRequest {
  // Patient info
  firstName: string;
  lastName: string;
  dateOfBirth: string;  // YYYY-MM-DD
  email: string;
  phone: string;
  
  // Appointment info
  appointmentReasonId: string;
  startTime: string;  // ISO 8601
  notes?: string;
}

export interface BookingResult {
  success: boolean;
  appointmentId?: string;
  patientId?: string;
  confirmationDetails?: {
    patientName: string;
    providerName: string;
    serviceName: string;
    dateTime: string;
    location: string;
  };
  error?: string;
}

/**
 * Validate booking request
 */
function validateBookingRequest(request: BookingRequest): string | null {
  if (!request.firstName?.trim()) {
    return 'First name is required';
  }
  if (!request.lastName?.trim()) {
    return 'Last name is required';
  }
  if (!request.dateOfBirth?.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return 'Valid date of birth is required (YYYY-MM-DD)';
  }
  if (!request.email?.trim() || !request.email.includes('@')) {
    return 'Valid email is required';
  }
  if (!request.phone?.trim()) {
    return 'Phone number is required';
  }
  if (!request.appointmentReasonId) {
    return 'Appointment reason is required';
  }
  if (!request.startTime) {
    return 'Appointment time is required';
  }
  
  // Validate start time is in the future
  if (new Date(request.startTime) <= new Date()) {
    return 'Appointment time must be in the future';
  }

  // Validate notes length
  if (request.notes && request.notes.length > 500) {
    return 'Notes must be 500 characters or less';
  }

  return null;
}

/**
 * Find or create patient
 */
async function findOrCreatePatient(
  practiceId: string,
  request: BookingRequest
): Promise<{ patientId: string; isNew: boolean }> {
  // Try to find existing patient
  const existingPatient = await searchPatient(
    practiceId,
    request.firstName,
    request.lastName,
    request.dateOfBirth
  );

  if (existingPatient) {
    return { patientId: existingPatient.PatientID, isNew: false };
  }

  // Create new patient
  const createRequest: CreatePatientRequest = {
    PracticeID: practiceId,
    FirstName: request.firstName.trim(),
    LastName: request.lastName.trim(),
    DateOfBirth: request.dateOfBirth,
    Email: request.email.trim(),
    Phone: request.phone.trim(),
  };

  const result = await createPatient(createRequest);

  if (!result.Success || !result.PatientID) {
    throw new Error(result.ErrorMessage || 'Failed to create patient');
  }

  return { patientId: result.PatientID, isNew: true };
}

/**
 * Book an appointment
 */
export async function bookAppointment(
  request: BookingRequest
): Promise<BookingResult> {
  // Validate request
  const validationError = validateBookingRequest(request);
  if (validationError) {
    return { success: false, error: validationError };
  }

  try {
    // Get practice info
    const practiceId = await getPrimaryPracticeId();
    const serviceLocationId = await getPrimaryServiceLocationId();
    const providerId = await getPrimaryProviderId();

    // Get appointment reason details
    const reason = await getAppointmentReasonById(request.appointmentReasonId);
    if (!reason) {
      return { success: false, error: 'Invalid appointment reason' };
    }

    // Find or create patient
    const { patientId } = await findOrCreatePatient(practiceId, request);

    // Calculate end time based on appointment duration
    const startTime = new Date(request.startTime);
    const endTime = addMinutes(startTime, reason.Duration);

    // Create appointment
    const appointmentResult = await createAppointment({
      PracticeID: practiceId,
      ServiceLocationID: serviceLocationId,
      ProviderID: providerId,
      PatientID: patientId,
      AppointmentReasonID: request.appointmentReasonId,
      StartTime: startTime.toISOString(),
      EndTime: endTime.toISOString(),
      Status: 'Scheduled',
      IsRecurring: false,
      WasCreatedOnline: true,
      Notes: request.notes,
    });

    if (!appointmentResult.Success || !appointmentResult.AppointmentID) {
      return {
        success: false,
        error: appointmentResult.ErrorMessage || 'Failed to create appointment',
      };
    }

    // Get bootstrap data for confirmation details
    const bootstrapData = await getBootstrapData();
    const provider = bootstrapData.providers.find((p) => p.ID === providerId);
    const location = bootstrapData.serviceLocations.find((l) => l.ID === serviceLocationId);

    return {
      success: true,
      appointmentId: appointmentResult.AppointmentID,
      patientId,
      confirmationDetails: {
        patientName: `${request.firstName} ${request.lastName}`,
        providerName: provider?.FullName || 'Provider',
        serviceName: reason.Name,
        dateTime: format(startTime, "EEEE, MMMM d, yyyy 'at' h:mm a"),
        location: location ? `${location.Name}, ${location.Address}` : 'Clinic Location',
      },
    };
  } catch (error) {
    console.error('Booking error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

/**
 * Get available slots for a date
 */
export async function getAvailableSlots(
  date: string,  // YYYY-MM-DD
  appointmentReasonId: string
): Promise<AvailableSlot[]> {
  try {
    // Get appointment reason for duration
    const reason = await getAppointmentReasonById(appointmentReasonId);
    if (!reason) {
      throw new Error('Invalid appointment reason');
    }

    // Get practice info
    const practiceId = await getPrimaryPracticeId();
    const bootstrapData = await getBootstrapData();

    // Get existing appointments for the date
    const existingAppointments = await getAppointments({
      PracticeID: practiceId,
      StartDate: date,
      EndDate: date,
    });

    // Calculate available slots
    return calculateAvailableSlots(
      date,
      reason.Duration,
      existingAppointments,
      bootstrapData.providers
    );
  } catch (error) {
    console.error('Error getting available slots:', error);
    return [];
  }
}

/**
 * Check if Tebra integration is configured
 */
export function isTebraConfigured(): boolean {
  return Boolean(
    process.env.TEBRA_CUSTOMER_KEY &&
    process.env.TEBRA_USERNAME &&
    process.env.TEBRA_PASSWORD
  );
}







