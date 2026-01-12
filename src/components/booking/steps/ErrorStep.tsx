'use client';

import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorStepProps {
  error: string;
  onRetry: () => void;
  onStartOver: () => void;
}

export function ErrorStep({ error, onRetry, onStartOver }: ErrorStepProps) {
  return (
    <div className="text-center">
      {/* Error icon */}
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-10 h-10 text-red-600" />
      </div>

      <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-2">
        Something Went Wrong
      </h2>
      <p className="text-neutral-600 mb-4">
        We couldn't complete your booking. Please try again.
      </p>

      {/* Error message */}
      <div className="card p-4 bg-red-50 border-red-200 mb-8 text-left">
        <p className="text-red-800 text-sm">
          <strong>Error:</strong> {error}
        </p>
      </div>

      {/* Suggestions */}
      <div className="card p-6 text-left mb-8">
        <h3 className="font-semibold text-neutral-900 mb-3">What you can do:</h3>
        <ul className="text-sm text-neutral-600 space-y-2">
          <li>• <strong>Try again</strong> – The issue may be temporary</li>
          <li>• <strong>Start over</strong> – Select a different time or date</li>
          <li>• <strong>Contact us directly</strong> – Email us to schedule</li>
        </ul>
      </div>

      {/* Contact fallback */}
      <p className="text-sm text-neutral-500 mb-6">
        If the problem persists, please contact us at{' '}
        <a href="mailto:Bonafidecare2@gmail.com" className="text-primary-600 hover:underline">
          Bonafidecare2@gmail.com
        </a>
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={onRetry} className="btn-primary">
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </button>
        <button onClick={onStartOver} className="btn-secondary">
          Start Over
        </button>
        <Link href="/" className="btn-ghost">
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}







