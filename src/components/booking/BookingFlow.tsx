'use client';

import { useState, useEffect, useCallback } from 'react';
import { ReasonStep } from './steps/ReasonStep';
import { DateTimeStep } from './steps/DateTimeStep';
import { DetailsStep } from './steps/DetailsStep';
import { ConfirmStep } from './steps/ConfirmStep';
import { SuccessStep } from './steps/SuccessStep';
import { ErrorStep } from './steps/ErrorStep';
import { BookingProgress } from './BookingProgress';
import { Loader2 } from 'lucide-react';

export interface AppointmentReason {
  id: string;
  name: string;
  duration: number;
}

export interface AvailableSlot {
  startTime: string;
  endTime: string;
  providerId: string;
  providerName: string;
  displayTime: string;
  displayDate: string;
}

export interface PatientDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  notes: string;
}

export interface BookingConfirmation {
  appointmentId: string;
  patientName: string;
  providerName: string;
  serviceName: string;
  dateTime: string;
  location: string;
}

type Step = 'reason' | 'datetime' | 'details' | 'confirm' | 'success' | 'error';

const steps: Step[] = ['reason', 'datetime', 'details', 'confirm'];

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('reason');
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Booking data
  const [reasons, setReasons] = useState<AppointmentReason[]>([]);
  const [selectedReason, setSelectedReason] = useState<AppointmentReason | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  // Load bootstrap data
  useEffect(() => {
    async function loadBootstrap() {
      try {
        const response = await fetch('/api/tebra/bootstrap');
        const data = await response.json();

        if (data.success) {
          setReasons(data.data.appointmentReasons);
          setIsConfigured(true);
        } else {
          setIsConfigured(false);
        }
      } catch (err) {
        console.error('Bootstrap error:', err);
        setIsConfigured(false);
      } finally {
        setIsLoading(false);
      }
    }

    loadBootstrap();
  }, []);

  const handleReasonSelect = useCallback((reason: AppointmentReason) => {
    setSelectedReason(reason);
    setSelectedSlot(null); // Reset slot when reason changes
    setCurrentStep('datetime');
  }, []);

  const handleSlotSelect = useCallback((date: string, slot: AvailableSlot) => {
    setSelectedDate(date);
    setSelectedSlot(slot);
    setCurrentStep('details');
  }, []);

  const handleDetailsSubmit = useCallback((details: PatientDetails) => {
    setPatientDetails(details);
    setCurrentStep('confirm');
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!selectedReason || !selectedSlot) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/tebra/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: patientDetails.firstName,
          lastName: patientDetails.lastName,
          dateOfBirth: patientDetails.dateOfBirth,
          email: patientDetails.email,
          phone: patientDetails.phone,
          appointmentReasonId: selectedReason.id,
          startTime: selectedSlot.startTime,
          notes: patientDetails.notes || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setConfirmation(data.data.confirmation);
        setCurrentStep('success');
      } else {
        setError(data.error || 'Failed to book appointment');
        setCurrentStep('error');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('An unexpected error occurred. Please try again.');
      setCurrentStep('error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedReason, selectedSlot, patientDetails]);

  const handleBack = useCallback(() => {
    const stepIndex = steps.indexOf(currentStep as (typeof steps)[number]);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1]);
    }
  }, [currentStep]);

  const handleRetry = useCallback(() => {
    setError(null);
    setCurrentStep('confirm');
  }, []);

  const handleStartOver = useCallback(() => {
    setSelectedReason(null);
    setSelectedDate('');
    setSelectedSlot(null);
    setPatientDetails({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      notes: '',
    });
    setConfirmation(null);
    setError(null);
    setCurrentStep('reason');
  }, []);

  // Loading state
  if (isLoading && currentStep === 'reason') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto" />
        <p className="mt-4 text-neutral-600">Loading booking system...</p>
      </div>
    );
  }

  // Not configured state
  if (!isConfigured) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📞</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
            Online Booking Coming Soon
          </h2>
          <p className="text-neutral-600 mb-6">
            Our online booking system is being set up. In the meantime, please 
            contact us directly to schedule your appointment.
          </p>
          <a
            href="mailto:Bonafidecare2@gmail.com"
            className="btn-primary inline-flex"
          >
            Email to Schedule
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      {!['success', 'error'].includes(currentStep) && (
        <BookingProgress currentStep={currentStep} steps={steps} />
      )}

      {/* Step content */}
      <div className="mt-8">
        {currentStep === 'reason' && (
          <ReasonStep
            reasons={reasons}
            selectedReason={selectedReason}
            onSelect={handleReasonSelect}
          />
        )}

        {currentStep === 'datetime' && selectedReason && (
          <DateTimeStep
            reason={selectedReason}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSelect={handleSlotSelect}
            onBack={handleBack}
          />
        )}

        {currentStep === 'details' && (
          <DetailsStep
            initialData={patientDetails}
            onSubmit={handleDetailsSubmit}
            onBack={handleBack}
          />
        )}

        {currentStep === 'confirm' && selectedReason && selectedSlot && (
          <ConfirmStep
            reason={selectedReason}
            slot={selectedSlot}
            details={patientDetails}
            isLoading={isLoading}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        )}

        {currentStep === 'success' && confirmation && (
          <SuccessStep
            confirmation={confirmation}
            onStartOver={handleStartOver}
          />
        )}

        {currentStep === 'error' && (
          <ErrorStep
            error={error || 'An error occurred'}
            onRetry={handleRetry}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
}







