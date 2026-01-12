'use client';

import { useState, useEffect } from 'react';
import { format, addDays, parse, isWeekend } from 'date-fns';
import { ChevronLeft, ChevronRight, Loader2, ArrowLeft, Calendar } from 'lucide-react';
import clsx from 'clsx';
import type { AppointmentReason, AvailableSlot } from '../BookingFlow';

interface DateTimeStepProps {
  reason: AppointmentReason;
  selectedDate: string;
  selectedSlot: AvailableSlot | null;
  onSelect: (date: string, slot: AvailableSlot) => void;
  onBack: () => void;
}

export function DateTimeStep({
  reason,
  selectedDate,
  selectedSlot,
  onSelect,
  onBack,
}: DateTimeStepProps) {
  const [currentDate, setCurrentDate] = useState(
    selectedDate ? parse(selectedDate, 'yyyy-MM-dd', new Date()) : new Date()
  );
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate dates for the week view
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentDate, i);
    return {
      date,
      dateString: format(date, 'yyyy-MM-dd'),
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
      isWeekend: isWeekend(date),
      isPast: date < new Date(new Date().setHours(0, 0, 0, 0)),
    };
  });

  // Load slots when date changes
  useEffect(() => {
    if (!selectedDate) return;

    async function loadSlots() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/tebra/available-slots?date=${selectedDate}&reason=${reason.id}`
        );
        const data = await response.json();

        if (data.success) {
          setSlots(data.data.slots);
        } else {
          setError(data.error || 'Failed to load available times');
          setSlots([]);
        }
      } catch (err) {
        console.error('Error loading slots:', err);
        setError('Failed to load available times');
        setSlots([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadSlots();
  }, [selectedDate, reason.id]);

  const handleDateSelect = (dateString: string) => {
    if (selectedSlot) {
      // Clear selected slot when date changes
      onSelect(dateString, null as unknown as AvailableSlot);
    }
    // Trigger slot loading by updating parent
    const dummySlot: AvailableSlot = {
      startTime: '',
      endTime: '',
      providerId: '',
      providerName: '',
      displayTime: '',
      displayDate: '',
    };
    // Actually just update the selected date in parent
    setSlots([]);
    onSelect(dateString, dummySlot);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const days = direction === 'next' ? 7 : -7;
    const newDate = addDays(currentDate, days);
    
    // Don't allow navigating to the past
    if (newDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      setCurrentDate(new Date());
    } else {
      setCurrentDate(newDate);
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to reason selection
      </button>

      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        Choose a date and time
      </h2>
      <p className="text-neutral-600 mb-6">
        Select when you'd like to come in for your {reason.name.toLowerCase()}
      </p>

      {/* Date selector */}
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h3 className="font-medium text-neutral-900">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Next week"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {dates.map((day) => (
            <button
              key={day.dateString}
              onClick={() => !day.isPast && !day.isWeekend && handleDateSelect(day.dateString)}
              disabled={day.isPast || day.isWeekend}
              className={clsx(
                'p-2 rounded-lg text-center transition-colors',
                day.isPast || day.isWeekend
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-primary-50',
                selectedDate === day.dateString
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-50'
              )}
            >
              <div className="text-xs text-neutral-500">{day.dayName}</div>
              <div className="font-medium">{day.dayNumber}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="card p-4">
          <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Available times for {format(parse(selectedDate, 'yyyy-MM-dd', new Date()), 'EEEE, MMMM d')}
          </h3>

          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="w-6 h-6 text-primary-600 animate-spin mx-auto" />
              <p className="mt-2 text-neutral-500 text-sm">Loading available times...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-neutral-500">No available times for this date. Please select another date.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.startTime}
                  onClick={() => onSelect(selectedDate, slot)}
                  className={clsx(
                    'p-3 rounded-lg text-center font-medium transition-colors',
                    selectedSlot?.startTime === slot.startTime
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-50 hover:bg-primary-50 text-neutral-700'
                  )}
                >
                  {slot.displayTime}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!selectedDate && (
        <div className="card p-8 text-center bg-neutral-50">
          <Calendar className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-neutral-500">Select a date above to see available times</p>
        </div>
      )}
    </div>
  );
}







