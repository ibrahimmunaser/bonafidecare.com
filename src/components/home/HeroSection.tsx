import Link from 'next/link';
import Image from 'next/image';
import { heroContent, clinicInfo, booking } from '@/config/content';
import { ArrowRight, Mail, Phone } from 'lucide-react';

export function HeroSection() {
  const phone = process.env.NEXT_PUBLIC_CLINIC_PHONE;

  return (
    <section className="relative pt-20 lg:pt-24 bg-primary-600">
      <div className="container-wide py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-xl">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
              {heroContent.headline}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-primary-50 leading-relaxed">
              {heroContent.subheadline}
            </p>
            
            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a 
                href={booking.tebraSchedulingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-primary-600 hover:bg-primary-50 text-lg px-8 py-4"
              >
                {heroContent.primaryCta}
                <ArrowRight className="h-5 w-5" />
              </a>
              
              <div className="flex gap-3">
                <a
                  href={`mailto:${clinicInfo.contact.email}`}
                  className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 flex-1 sm:flex-none"
                  aria-label="Email us"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sm:hidden">Email</span>
                </a>
                
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 flex-1 sm:flex-none"
                    aria-label="Call us"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="sm:hidden">Call</span>
                  </a>
                )}
              </div>
            </div>

            {/* Emergency note */}
            <p className="mt-6 text-sm text-primary-100">
              <span className="font-semibold">⚠️</span>{' '}
              {heroContent.emergencyNote}
            </p>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 bg-white/10">
              <Image
                src="/Images/image 1.jpg"
                alt="Bonafide Care Primary Care Clinic"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 top-8 right-8 w-full h-full rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
}

