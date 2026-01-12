'use client';

import { ArrowLeft, Calendar, User, Clock, FileText, Loader2 } from 'lucide-react';
import type { AppointmentReason, AvailableSlot, PatientDetails } from '../BookingFlow';

interface ConfirmStepProps {
  reason: AppointmentReason;
  slot: AvailableSlot;
  details: PatientDetails;
  isLoading: boolean;
  onConfirm: () => void;
  onBack: () => void;
}

export function ConfirmStep({
  reason,
  slot,
  details,
  isLoading,
  onConfirm,
  onBack,
}: ConfirmStepProps) {
  return (
    <div>
      <button
        onClick={onBack}
        disabled={isLoading}
        className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-6 transition-colors disabled:opacity-50"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to your details
      </button>

      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        Confirm Your Appointment
      </h2>
      <p className="text-neutral-600 mb-6">
        Please review the details below before confirming
      </p>

      <div className="card p-6 space-y-6">
        {/* Appointment Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Reason for Visit</p>
              <p className="font-medium text-neutral-900">{reason.name}</p>
              <p className="text-sm text-neutral-500">{reason.duration} minutes</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Date & Time</p>
              <p className="font-medium text-neutral-900">{slot.displayDate}</p>
              <p className="text-sm text-neutral-500">{slot.displayTime}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Provider</p>
              <p className="font-medium text-neutral-900">{slot.providerName}</p>
            </div>
          </div>
        </div>

        <hr className="border-neutral-200" />

        {/* Patient Details */}
        <div>
          <h3 className="font-medium text-neutral-900 mb-3">Your Information</h3>
          <div className="bg-neutral-50 rounded-lg p-4 space-y-2 text-sm">
            <p>
              <span className="text-neutral-500">Name:</span>{' '}
              <span className="font-medium">{details.firstName} {details.lastName}</span>
            </p>
            <p>
              <span className="text-neutral-500">Date of Birth:</span>{' '}
              <span className="font-medium">{details.dateOfBirth}</span>
            </p>
            <p>
              <span className="text-neutral-500">Email:</span>{' '}
              <span className="font-medium">{details.email}</span>
            </p>
            <p>
              <span className="text-neutral-500">Phone:</span>{' '}
              <span className="font-medium">{details.phone}</span>
            </p>
            {details.notes && (
              <p>
                <span className="text-neutral-500">Notes:</span>{' '}
                <span className="font-medium">{details.notes}</span>
              </p>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Please note:</strong> By confirming, you acknowledge that this is 
            not for emergency medical care. We will contact you if any changes need 
            to be made to your appointment.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onBack}
            disabled={isLoading}
            className="btn-secondary flex-1"
          >
            Edit Details
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="btn-primary flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Booking...
              </>
            ) : (
              'Confirm Appointment'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}







