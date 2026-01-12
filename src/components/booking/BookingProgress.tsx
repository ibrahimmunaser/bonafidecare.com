'use client';

import { Check } from 'lucide-react';
import clsx from 'clsx';

const stepLabels: Record<string, string> = {
  reason: 'Select Reason',
  datetime: 'Choose Time',
  details: 'Your Details',
  confirm: 'Confirm',
};

interface BookingProgressProps {
  currentStep: string;
  steps: string[];
}

export function BookingProgress({ currentStep, steps }: BookingProgressProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <nav aria-label="Booking progress">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li
              key={step}
              className={clsx(
                'flex items-center',
                index < steps.length - 1 && 'flex-1'
              )}
            >
              <div className="flex flex-col items-center">
                {/* Step indicator */}
                <div
                  className={clsx(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
                    isCompleted && 'bg-primary-600 text-white',
                    isCurrent && 'bg-primary-600 text-white ring-4 ring-primary-100',
                    !isCompleted && !isCurrent && 'bg-neutral-200 text-neutral-500'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                {/* Step label */}
                <span
                  className={clsx(
                    'mt-2 text-xs sm:text-sm font-medium text-center hidden sm:block',
                    isCurrent ? 'text-primary-600' : 'text-neutral-500'
                  )}
                >
                  {stepLabels[step]}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    'flex-1 h-1 mx-2 sm:mx-4 rounded',
                    index < currentIndex ? 'bg-primary-600' : 'bg-neutral-200'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}







