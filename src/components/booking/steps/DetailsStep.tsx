'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import type { PatientDetails } from '../BookingFlow';

interface DetailsStepProps {
  initialData: PatientDetails;
  onSubmit: (details: PatientDetails) => void;
  onBack: () => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
}

export function DetailsStep({ initialData, onSubmit, onBack }: DetailsStepProps) {
  const [formData, setFormData] = useState<PatientDetails>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        newErrors.dateOfBirth = 'Date of birth must be in the past';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\(\)\+]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to date/time selection
      </button>

      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        Your Information
      </h2>
      <p className="text-neutral-600 mb-6">
        Please provide your details to complete the booking
      </p>

      <form onSubmit={handleSubmit} className="card p-6 space-y-6">
        {/* Name row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="label">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={clsx('input', errors.firstName && 'input-error')}
              placeholder="John"
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="label">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={clsx('input', errors.lastName && 'input-error')}
              placeholder="Doe"
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="label">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={clsx('input', errors.dateOfBirth && 'input-error')}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth}</p>}
        </div>

        {/* Contact row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="label">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={clsx('input', errors.email && 'input-error')}
              placeholder="john@example.com"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="label">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={clsx('input', errors.phone && 'input-error')}
              placeholder="(555) 123-4567"
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="label">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="input resize-none"
            placeholder="Any additional information about your visit..."
            maxLength={500}
          />
          <p className="mt-1 text-xs text-neutral-500">
            Please do not include sensitive medical information. {formData.notes.length}/500
          </p>
        </div>

        {/* Submit */}
        <button type="submit" className="btn-primary w-full">
          Continue to Confirmation
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}







