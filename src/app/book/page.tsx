import type { Metadata } from 'next';

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
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              Book an Appointment
            </h1>
            <p className="mt-4 text-lg text-primary-50">
              Schedule your visit online. We look forward to seeing you.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <div className="bg-primary-600">
        <div className="container-wide py-4">
          <p className="text-white text-sm text-center font-medium">
            <span className="font-bold">⚠️ Medical Emergency?</span> Call 911 or visit your nearest emergency room immediately.
          </p>
        </div>
      </div>

      {/* Tebra Booking Iframe */}
      <section className="bg-neutral-50 py-8 min-h-screen">
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

