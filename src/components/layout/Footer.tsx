import Link from 'next/link';
import Image from 'next/image';
import { clinicInfo } from '@/config/content';
import { MapPin, Mail, Clock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-wide py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center"
            >
              <div className="relative h-12 w-auto" style={{ width: '150px' }}>
                <Image
                  src="/Images/logo.png"
                  alt={`${clinicInfo.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="mt-4 text-neutral-400 text-sm leading-relaxed">
              {clinicInfo.tagline}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li>
                <a
                  href={clinicInfo.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-white transition-colors"
                >
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{clinicInfo.address.full}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${clinicInfo.contact.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>{clinicInfo.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Hours</h3>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Monday – Friday</p>
                  <p>{clinicInfo.hours.monday}</p>
                </div>
              </li>
              <li className="pl-6">
                <p>Saturday – Sunday</p>
                <p>Closed</p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li>
                <Link href="/book" className="hover:text-white transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © {currentYear} {clinicInfo.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-neutral-500 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
          
          {/* Medical disclaimer */}
          <p className="mt-6 text-neutral-600 text-xs text-center md:text-left">
            The information on this website is for general informational purposes only and does not 
            constitute medical advice. If you are experiencing a medical emergency, please call 911 
            or go to your nearest emergency room.
          </p>
        </div>
      </div>
    </footer>
  );
}





