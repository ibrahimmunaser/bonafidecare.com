import { clinicInfo } from '@/config/content';
import { MapPin, ExternalLink, Clock, Mail } from 'lucide-react';

export function LocationSection() {
  // Encode address for Google Maps embed
  const encodedAddress = encodeURIComponent(clinicInfo.address.full);
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <section className="section bg-white" id="location">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
            Visit Our Clinic
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Conveniently located in Lincoln Park, Michigan
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map Embed */}
          <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
            <iframe
              title="Clinic Location"
              src={mapEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          {/* Location Details */}
          <div className="card p-8">
            <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-6">
              {clinicInfo.name}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}







