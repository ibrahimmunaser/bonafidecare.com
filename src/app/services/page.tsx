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
      <section className="pt-24 lg:pt-28 pb-12 bg-primary-600">
        <div className="container-wide">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-primary-50">
              Comprehensive primary care designed to keep you healthy at every stage of life.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Stethoscope;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={service.id}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                >
                  {/* Icon/Visual */}
                  <div className="w-full lg:w-1/3">
                    <div className="aspect-square max-w-xs mx-auto rounded-2xl bg-gradient-to-br from-primary-50 to-white flex items-center justify-center border border-primary-100">
                      <Icon className="w-24 h-24 text-primary-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-2/3">
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
                      {service.fullDescription}
                    </p>
                    {service.items && service.items.length > 0 && (
                      <ul className="mt-6 space-y-2">
                        {service.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                            <span className="text-neutral-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services Info */}
      <section className="section bg-primary-600">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white">
                What to Expect
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  'Thorough initial health assessments',
                  'Personalized treatment plans',
                  'Clear explanations of your health status',
                  'Coordination with specialists when needed',
                  'Follow-up care and ongoing support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-primary-50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-8 bg-primary-600 text-white border-primary-600">
              <h3 className="font-heading text-2xl font-bold">
                Ready to Schedule?
              </h3>
              <p className="mt-4 text-primary-100 leading-relaxed">
                Whether you're a new patient or returning for a follow-up, 
                we're here to help you on your health journey.
              </p>
              <Link href="/book" className="btn bg-white text-primary-600 hover:bg-primary-50 mt-6">
                Book an Appointment
                <ArrowRight className="w-4 h-4" />
              </Link>
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

