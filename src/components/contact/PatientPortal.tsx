'use client';

import { ExternalLink, UserCircle } from 'lucide-react';

export function PatientPortal() {
  const portalUrl = process.env.NEXT_PUBLIC_PATIENT_PORTAL_URL;

  // Hide entirely if no portal URL is configured
  if (!portalUrl) {
    return null;
  }

  return (
    <div className="card p-6 bg-primary-50 border-primary-100">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
          <UserCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-lg font-bold text-neutral-900">
            Patient Portal
          </h3>
          <p className="mt-1 text-sm text-neutral-600">
            Access your medical records, view test results, and communicate securely with our team.
          </p>
          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 inline-flex"
          >
            Open Patient Portal
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}







