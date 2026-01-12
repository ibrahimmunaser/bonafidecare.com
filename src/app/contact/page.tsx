import type { Metadata } from 'next';
import { clinicInfo } from '@/config/content';
import { ContactForm } from '@/components/contact/ContactForm';
import { PatientPortal } from '@/components/contact/PatientPortal';
import { MapPin, Mail, Clock, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Bonafide Care Primary Care Clinic in Lincoln Park, MI. Send us a message or visit our location.',
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-24 lg:pt-28 pb-12 bg-primary-600">
        <div className="container-wide">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-primary-50">
              Have a question or need to reach us? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info & Patient Portal */}
            <div className="space-y-8">
              {/* Patient Portal Section */}
              <PatientPortal />

              {/* Contact Information */}
              <div className="card p-6">
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Address</p>
                      <p className="text-neutral-600 mt-1">{clinicInfo.address.full}</p>
                      <a
                        href={clinicInfo.address.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium mt-2"
                      >
                        Get Directions
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Email</p>
                      <a
                        href={`mailto:${clinicInfo.contact.email}`}
                        className="text-primary-600 hover:text-primary-700 mt-1 block"
                      >
                        {clinicInfo.contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Office Hours</p>
                      <div className="text-neutral-600 mt-1 text-sm space-y-1">
                        <p>Monday – Friday: {clinicInfo.hours.monday}</p>
                        <p>Saturday – Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
                <iframe
                  title="Clinic Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(clinicInfo.address.full)}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="py-8 bg-red-50 border-y border-red-100">
        <div className="container-wide text-center">
          <p className="text-red-800 font-medium">
            <span className="font-bold">⚠️ Medical Emergency?</span>{' '}
            If you are experiencing a medical emergency, please call 911 or visit your nearest emergency room.
          </p>
        </div>
      </section>
    </>
  );
}

