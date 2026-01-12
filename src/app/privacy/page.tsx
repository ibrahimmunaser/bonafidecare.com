import type { Metadata } from 'next';
import { clinicInfo } from '@/config/content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${clinicInfo.name}. Learn how we collect, use, and protect your information.`,
};

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-24 lg:pt-28 pb-12 bg-primary-600">
        <div className="container-narrow">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-primary-50">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-narrow prose prose-neutral max-w-none">
          <h2>Introduction</h2>
          <p>
            {clinicInfo.name} ("we," "us," or "our") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your 
            information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <p>We may collect information that you voluntarily provide to us, including:</p>
          <ul>
            <li>Name, email address, and phone number</li>
            <li>Appointment requests and related information</li>
            <li>Messages sent through our contact form</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information 
            about your device, including your browser type, operating system, and IP address. 
            This information is used to improve our website and services.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and requests</li>
            <li>Schedule and manage appointments</li>
            <li>Send appointment reminders and confirmations</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Protected Health Information (PHI)</h2>
          <p>
            If you become a patient, your medical records and health information are 
            protected under the Health Insurance Portability and Accountability Act (HIPAA). 
            We maintain separate policies and procedures for protecting your PHI in 
            accordance with federal and state laws.
          </p>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to 
            third parties except as described in this policy or with your consent. We may 
            share information with:
          </p>
          <ul>
            <li>Service providers who assist us in operating our website and services</li>
            <li>Legal authorities when required by law</li>
            <li>Other healthcare providers as necessary for your care (with appropriate authorization)</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect 
            your personal information. However, no method of transmission over the 
            internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to legal requirements)</li>
            <li>Opt out of certain communications</li>
          </ul>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible 
            for the privacy practices of these external sites and encourage you to review 
            their privacy policies.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not 
            knowingly collect personal information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of 
            any changes by posting the new policy on this page and updating the "Last 
            updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
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

