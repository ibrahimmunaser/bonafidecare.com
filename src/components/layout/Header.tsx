'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { clinicInfo, booking } from '@/config/content';
import { Menu, X, Phone } from 'lucide-react';
import clsx from 'clsx';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Book', href: '/book' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const phone = process.env.NEXT_PUBLIC_CLINIC_PHONE;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white',
        scrolled && 'shadow-lg'
      )}
    >
      <nav className="container-wide" aria-label="Main navigation">
        <div className="flex h-20 items-center lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded flex-shrink-0"
          >
            <div className="relative h-[52px] w-auto lg:h-[52px]" style={{ width: '260px' }}>
              <Image
                src="/Images/logo.png"
                alt={`${clinicInfo.name} Logo`}
                fill
                className="object-contain"
                style={{ 
                  objectPosition: 'center',
                  imageRendering: 'crisp-edges',
                  WebkitFontSmoothing: 'antialiased'
                }}
                quality={100}
                priority
              />
            </div>
          </Link>

          {/* Centered Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-8 flex-1 mx-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Action Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2 border border-neutral-300 text-neutral-700 hover:border-primary-600 hover:text-primary-600 rounded-md font-medium transition-all duration-200 text-sm"
            >
              Contact Us
            </Link>

            <a 
              href={booking.tebraSchedulingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-md font-medium transition-all duration-200 shadow-sm text-sm"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">
              {mobileMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={clsx(
            'lg:hidden overflow-hidden transition-all duration-300',
            mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-2 pt-2 border-t border-neutral-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-3 text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 px-4 py-3 text-primary-600 font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>Call: {phone}</span>
              </a>
            )}

            <div className="px-4 pt-2">
              <a
                href={booking.tebraSchedulingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full inline-block text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}





