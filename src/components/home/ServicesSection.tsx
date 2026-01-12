import Link from 'next/link';
import { services } from '@/config/content';
import { 
  Stethoscope, 
  HeartPulse, 
  Activity, 
  ShieldCheck, 
  Clock,
  ArrowRight 
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'stethoscope': Stethoscope,
  'heart-pulse': HeartPulse,
  'activity': Activity,
  'shield-check': ShieldCheck,
  'clock': Clock,
};

export function ServicesSection() {
  return (
    <section className="section bg-white" id="services">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">
            What We Do
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Comprehensive primary care services focused on your long-term health
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 5).map((service) => {
            const Icon = iconMap[service.icon] || Stethoscope;
            return (
              <div
                key={service.id}
                className="card p-6 group hover:border-primary-200 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 font-heading font-semibold text-lg text-neutral-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-neutral-600 text-sm leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
            );
          })}
          
          {/* CTA Card */}
          <div className="card p-6 bg-primary-600 text-white border-primary-600">
            <h3 className="font-heading font-semibold text-lg">
              Ready to get started?
            </h3>
            <p className="mt-2 text-primary-100 text-sm leading-relaxed">
              Book an appointment today and take the first step toward better health.
            </p>
            <Link 
              href="/book" 
              className="mt-4 inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/services" className="btn-secondary">
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}







