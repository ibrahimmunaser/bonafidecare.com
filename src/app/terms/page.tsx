import type { Metadata } from 'next';
import { clinicInfo } from '@/config/content';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `Terms of Use for ${clinicInfo.name} website. Please read these terms carefully before using our website.`,
};

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-24 lg:pt-28 pb-12 bg-primary-600">
        <div className="container-narrow">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Terms of Use
          </h1>
          <p className="mt-4 text-primary-50">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-narrow prose prose-neutral max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the {clinicInfo.name} website, you agree to be bound 
            by these Terms of Use. If you do not agree to these terms, please do not 
            use our website.
          </p>

          <h2>Medical Disclaimer</h2>
          <p className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-800">
            <strong>Important:</strong> The information provided on this website is for 
            general informational purposes only and does not constitute medical advice, 
            diagnosis, or treatment. Always seek the advice of a qualified healthcare 
            provider with any questions you may have regarding a medical condition.
          </p>

          <h3>Not Medical Advice</h3>
          <p>
            The content on this website, including text, graphics, images, and other 
            material, is intended for informational purposes only. It is not a substitute 
            for professional medical advice, diagnosis, or treatment.
          </p>

          <h3>Emergency Situations</h3>
          <p>
            <strong>If you are experiencing a medical emergency, call 911 immediately 
            or go to your nearest emergency room.</strong> Do not use this website or 
            any contact forms for emergency situations.
          </p>

          <h2>Use of Website</h2>
          <p>You agree to use this website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use the website in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to any part of the website</li>
            <li>Interfere with or disrupt the website or its servers</li>
            <li>Submit false or misleading information</li>
            <li>Use automated systems to access the website without our permission</li>
          </ul>

          <h2>Appointment Scheduling</h2>
          <p>
            Online appointment requests are subject to confirmation. Submitting a request 
            does not guarantee an appointment. We will contact you to confirm your 
            appointment or suggest alternative times.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and images, 
            is the property of {clinicInfo.name} or its content suppliers and is 
            protected by copyright and other intellectual property laws.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible 
            for the content, accuracy, or practices of these external sites. The inclusion 
            of any link does not imply endorsement by {clinicInfo.name}.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {clinicInfo.name} shall not be 
            liable for any indirect, incidental, special, consequential, or punitive 
            damages arising from your use of this website or reliance on any information 
            provided herein.
          </p>

          <h2>Privacy</h2>
          <p>
            Your use of this website is also governed by our{' '}
            <a href="/privacy">Privacy Policy</a>, which is incorporated into these 
            Terms of Use by reference.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. Changes will 
            be effective immediately upon posting to the website. Your continued use of 
            the website after changes are posted constitutes acceptance of the modified terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with 
            the laws of the State of Michigan, without regard to its conflict of law 
            provisions.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have questions about these Terms of Use, please contact us at:
          </p>
          <p>
            <strong>{clinicInfo.name}</strong><br />
            {clinicInfo.address.full}<br />
            Email: <a href={`mailto:${clinicInfo.contact.email}`}>{clinicInfo.contact.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}

