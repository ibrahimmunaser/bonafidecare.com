'use client';

import Link from 'next/link';
import { CheckCircle2, Calendar, User, Clock, MapPin, Home } from 'lucide-react';
import type { BookingConfirmation } from '../BookingFlow';

interface SuccessStepProps {
  confirmation: BookingConfirmation;
  onStartOver: () => void;
}

export function SuccessStep({ confirmation, onStartOver }: SuccessStepProps) {
  return (
    <div className="text-center">
      {/* Success icon */}
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>

      <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-2">
        Appointment Confirmed!
      </h2>
      <p className="text-neutral-600 mb-8">
        We've sent a confirmation to your email. We look forward to seeing you!
      </p>

      {/* Confirmation details */}
      <div className="card p-6 text-left mb-8">
        <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4 text-center">
          Appointment Details
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Patient</p>
              <p className="font-medium text-neutral-900">{confirmation.patientName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Date & Time</p>
              <p className="font-medium text-neutral-900">{confirmation.dateTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Service</p>
              <p className="font-medium text-neutral-900">{confirmation.serviceName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Location</p>
              <p className="font-medium text-neutral-900">{confirmation.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-neutral-50 rounded-lg text-center">
          <p className="text-sm text-neutral-600">
            <strong>Confirmation #:</strong> {confirmation.appointmentId}
          </p>
        </div>
      </div>

      {/* Important notes */}
      <div className="card p-4 bg-primary-50 border-primary-100 mb-8 text-left">
        <h4 className="font-semibold text-neutral-900 mb-2">What to Bring</h4>
        <ul className="text-sm text-neutral-700 space-y-1">
          <li>• Photo ID</li>
          <li>• Insurance card (if applicable)</li>
          <li>• List of current medications</li>
          <li>• Any relevant medical records</li>
        </ul>
      </div>

      {/* Contact info */}
      <p className="text-sm text-neutral-500 mb-6">
        Need to reschedule or have questions? Contact us at{' '}
        <a href="mailto:Bonafidecare2@gmail.com" className="text-primary-600 hover:underline">
          Bonafidecare2@gmail.com
        </a>
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={onStartOver} className="btn-secondary">
          Book Another Appointment
        </button>
        <Link href="/" className="btn-primary">
          <Home className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}







