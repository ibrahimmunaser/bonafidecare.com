import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/config/content';
import { 
  Stethoscope, 
  HeartPulse, 
  Activity, 
  ShieldCheck, 
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive primary care services at Bonafide Care including preventive care, same-day sick visits, chronic disease management, women\'s & men\'s health, minor injuries, physicals, lab testing, and care coordination.',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'stethoscope': Stethoscope,
  'heart-pulse': HeartPulse,
  'activity': Activity,
  'shield-check': ShieldCheck,
  'clock': Clock,
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900">
              Our Services
            </h1>
            <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
              Comprehensive primary care designed to keep you healthy at every stage of life.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      {services.map((service, index) => {
        const Icon = iconMap[service.icon] || Stethoscope;
        const isEven = index % 2 === 0;
        const isRedBackground = index % 2 === 0;
        
        return (
          <section 
            key={service.id}
            className={`py-16 lg:py-24 ${isRedBackground ? 'bg-primary-600' : 'bg-neutral-50'}`}
          >
            <div className="container-wide">
              <div 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}
              >
                {/* Icon/Visual */}
                <div className="w-full lg:w-2/5">
                  <div className={`aspect-square max-w-sm mx-auto rounded-3xl ${
                    isRedBackground 
                      ? 'bg-gradient-to-br from-white/10 to-primary-700/50 border-2 border-white/20 shadow-xl' 
                      : 'bg-gradient-to-br from-primary-50 to-white border-2 border-primary-100 shadow-lg'
                  } flex items-center justify-center`}>
                    <Icon className={`w-28 h-28 ${isRedBackground ? 'text-white' : 'text-primary-600'}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-3/5">
                  <h2 className={`font-heading text-3xl sm:text-4xl font-bold ${
                    isRedBackground ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {service.title}
                  </h2>
                  <p className={`mt-6 text-lg leading-relaxed ${
                    isRedBackground ? 'text-white/90' : 'text-neutral-600'
                  }`}>
                    {service.fullDescription}
                  </p>
                  {service.items && service.items.length > 0 && (
                    <ul className="mt-8 space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                            isRedBackground ? 'text-white' : 'text-primary-600'
                          }`} />
                          <span className={`text-base ${isRedBackground ? 'text-white' : 'text-neutral-700'}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Call to Action */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white">
                What to Expect
              </h2>
              <p className="mt-4 text-lg text-white/90 leading-relaxed">
                When you visit Bonafide Care, you can count on receiving personalized, thorough care that puts you first.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Thorough initial health assessments',
                  'Personalized treatment plans',
                  'Clear explanations of your health status',
                  'Coordination with specialists when needed',
                  'Follow-up care and ongoing support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white/95 text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-12">
              <h3 className="font-heading text-3xl font-bold text-neutral-900">
                Ready to Schedule?
              </h3>
              <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
                Whether you're a new patient or returning for a follow-up, 
                we're here to help you on your health journey.
              </p>
              <Link href="/book" className="btn bg-primary-600 text-white hover:bg-primary-700 mt-8 w-full justify-center text-lg py-4">
                Book an Appointment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-6 text-center text-sm text-neutral-500">
                Same-day appointments often available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="py-6 bg-red-600">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-3xl">⚠️</span>
            <p className="text-white font-medium">
              <span className="font-bold">Medical Emergency?</span>{' '}
              Call 911 or visit your nearest emergency room immediately.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

