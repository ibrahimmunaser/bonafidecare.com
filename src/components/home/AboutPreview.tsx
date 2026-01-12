import Link from 'next/link';
import { provider, whyChooseUs } from '@/config/content';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="section bg-primary-600" id="about">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Provider Info */}
          <div>
            {/* Provider Image Placeholder */}
            <div className="aspect-[3/4] max-w-md rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 mx-auto lg:mx-0">
              <div className="text-center p-8">
                <span className="text-6xl">👨‍⚕️</span>
                <p className="mt-4 text-primary-100 text-sm">
                  Provider photo placeholder
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Meet Your Provider
            </h2>
            
            <div className="mt-6">
              <h3 className="font-heading text-2xl font-semibold text-white">
                {provider.fullName}
              </h3>
              <p className="mt-1 text-primary-100">{provider.title}</p>
            </div>

            <p className="mt-4 text-primary-50 leading-relaxed">
              {provider.shortBio}
            </p>

            {/* Why Choose Us */}
            <div className="mt-8">
              <h4 className="font-heading font-semibold text-white mb-4">
                Why Choose Bonafide Care?
              </h4>
              <ul className="space-y-3">
                {whyChooseUs.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-white">
                        {item.title}:
                      </span>{' '}
                      <span className="text-primary-50">{item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/about" className="btn bg-white text-primary-600 hover:bg-primary-50 mt-8">
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
