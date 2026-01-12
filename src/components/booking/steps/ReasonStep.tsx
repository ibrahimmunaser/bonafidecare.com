'use client';

import { Check } from 'lucide-react';
import clsx from 'clsx';
import type { AppointmentReason } from '../BookingFlow';

interface ReasonStepProps {
  reasons: AppointmentReason[];
  selectedReason: AppointmentReason | null;
  onSelect: (reason: AppointmentReason) => void;
}

export function ReasonStep({ reasons, selectedReason, onSelect }: ReasonStepProps) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        What brings you in today?
      </h2>
      <p className="text-neutral-600 mb-6">
        Select the reason for your visit
      </p>

      <div className="grid gap-3">
        {reasons.map((reason) => {
          const isSelected = selectedReason?.id === reason.id;
          
          return (
            <button
              key={reason.id}
              onClick={() => onSelect(reason)}
              className={clsx(
                'card p-4 text-left flex items-center gap-4 transition-all',
                'hover:border-primary-300 hover:shadow-md',
                isSelected && 'border-primary-600 ring-2 ring-primary-100'
              )}
            >
              <div
                className={clsx(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  isSelected
                    ? 'border-primary-600 bg-primary-600'
                    : 'border-neutral-300'
                )}
              >
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-neutral-900">{reason.name}</p>
                <p className="text-sm text-neutral-500">{reason.duration} minutes</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}







