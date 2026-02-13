import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { provider, whyChooseUs, clinicInfo } from '@/config/content';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${provider.fullName} and the mission of Bonafide Care Primary Care Clinic - patient-centered, prevention-focused healthcare in Lincoln Park, MI.`,
};

export default function AboutPage() {
  // Split bio into paragraphs
  const bioParagraphs = provider.bio.split('\n\n');

  return (
    <>
      {/* Header */}
      <section className="pt-24 lg:pt-28 pb-12 bg-primary-600">
        <div className="container-wide">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              About Us
            </h1>
            <p className="mt-4 text-lg text-primary-50">
              Get to know the people and mission behind {clinicInfo.shortName}.
            </p>
          </div>
        </div>
      </section>

      {/* Provider Section */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Provider Image */}
            <div className="lg:sticky lg:top-28">
              <div className="aspect-[3/4] max-w-md rounded-2xl overflow-hidden shadow-xl mx-auto lg:mx-0">
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

            {/* Provider Bio */}
            <div>
              <div className="mb-8">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-600">
                  {provider.fullName}
                </h2>
                <p className="mt-2 text-xl text-neutral-500">{provider.title}</p>
              </div>

              <div className="prose prose-lg prose-neutral max-w-none">
                {bioParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-neutral-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bonafide Care */}
      <section className="section bg-primary-600">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white text-center mb-12">
              Why Choose Bonafide Care?
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="card p-6 bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-primary-50 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              To make quality healthcare more approachable, more thorough, and easier to access—
              especially for underserved communities. We believe every patient deserves time, 
              attention, and a provider who truly listens.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-600">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-white">
              Ready to Experience the Difference?
            </h2>
            <p className="mt-4 text-lg text-primary-50">
              Schedule your first appointment and see what patient-centered care really feels like.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="btn-primary">
                Book an Appointment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

