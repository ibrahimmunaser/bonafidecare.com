import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Schedule your appointment at Bonafide Care Primary Care Clinic. New patient visits, follow-ups, wellness exams, and same-day appointments available.',
};

export default function BookPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-24 lg:pt-28 pb-8 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-neutral-900">
              Book an Appointment
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              Schedule your visit online. We look forward to seeing you.
            </p>
          </div>
        </div>
      </section>

      {/* Tebra Booking Iframe */}
      <section className="bg-primary-600 py-8 min-h-screen">
        <div className="container-wide">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <iframe
              src="https://d2oe0ra32qx05a.cloudfront.net/?practiceKey=k_84_63229"
              className="w-full"
              style={{
                height: '1000px',
                minHeight: '100vh',
                border: 'none',
                display: 'block'
              }}
              title="Book an Appointment with Bonafide Care"
              loading="eager"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

