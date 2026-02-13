import Link from 'next/link';
import Image from 'next/image';
import { provider, whyChooseUs } from '@/config/content';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="section bg-primary-600" id="about">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Provider Info */}
          <div>
            {/* Provider Image */}
            <div className="aspect-[3/4] max-w-md rounded-2xl overflow-hidden shadow-2xl mx-auto lg:mx-0 border-4 border-white/20">
              <Image
                src="/Images/Doctor.png"
                alt={provider.fullName}
                width={600}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
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
