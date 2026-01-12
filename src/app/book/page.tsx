import type { Metadata } from 'next';
import { BookingFlow } from '@/components/booking/BookingFlow';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Schedule your appointment at Bonafide Care Primary Care Clinic. New patient visits, follow-ups, wellness exams, and same-day appointments available.',
};

export default function BookPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-24 lg:pt-28 pb-8 bg-primary-600">
        <div className="container-wide">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              Book an Appointment
            </h1>
            <p className="mt-4 text-lg text-primary-50">
              Schedule your visit in just a few steps. We look forward to seeing you.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-b border-red-100">
        <div className="container-wide py-3">
          <p className="text-red-800 text-sm text-center">
            <span className="font-bold">⚠️ If this is an emergency, please call 911</span> or visit your nearest emergency room.
          </p>
        </div>
      </div>

      {/* Booking Flow */}
      <section className="section bg-white">
        <div className="container-wide">
          <BookingFlow />
        </div>
      </section>
    </>
  );
}

