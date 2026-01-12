/**
 * Clinic Content Configuration
 * 
 * Edit this file to update clinic information displayed on the website.
 * This centralizes all text content for easy maintenance.
 */

export const clinicInfo = {
  name: 'Bonafide Care Primary Care Clinic',
  shortName: 'Bonafide Care',
  tagline: 'Primary Care You Can Trust.',
  subTagline: 'Clear communication. Prevention-first. Practical treatment plans.',
  
  address: {
    street: '1158 Fort Street',
    city: 'Lincoln Park',
    state: 'MI',
    zip: '48101',
    full: '1158 Fort Street, Lincoln Park, MI 48101',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=1158+Fort+Street+Lincoln+Park+MI+48101',
  },
  
  contact: {
    email: 'Bonafidecare2@gmail.com',
    // Phone is loaded from env variable to allow runtime configuration
  },
  
  // Clinic operating hours
  hours: {
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: 'Closed',
    sunday: 'Closed',
  },
  
  // For availability calculation
  workingHours: {
    start: 9, // 9 AM
    end: 17,  // 5 PM
    slotDurationMinutes: 30,
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday (0 = Sunday)
  },
} as const;

export const provider = {
  name: 'Salahuddin Mohamed',
  credentials: 'PA-C',
  fullName: 'Salahuddin Mohamed, PA-C',
  title: 'Physician Assistant',
  
  // This text must be used verbatim as specified
  bio: `Salahuddin Mohamed is a PA with experience in primary care, urgent care, and cardiology. He's passionate about delivering high-quality, patient-centered care with a focus on clear communication, prevention, and practical treatment plans that fit real life.

Salahuddin has always wanted to build a practice that serves the community—especially underserved populations—by making healthcare more approachable, more thorough, and easier to access. He believes patients deserve time, attention, and a provider who truly listens, and he prioritizes visits that feel unhurried and respectful.

Outside the clinic, Salahuddin enjoys playing sports, spending time with family, and traveling. His goal at Bonafide Care is simple: provide reliable care, build long-term relationships, and help patients feel confident about their health.`,
  
  shortBio: `Salahuddin Mohamed is a Physician Assistant with experience in primary care, urgent care, and cardiology. He's passionate about delivering high-quality, patient-centered care with a focus on clear communication and prevention.`,
} as const;

export const services = [
  {
    id: 'primary-care',
    title: 'Primary Care for Adults',
    shortDescription: 'Comprehensive health management for everyday wellness.',
    fullDescription: 'We provide complete primary care services for adults, including routine check-ups, sick visits, and ongoing health management. Our focus is on building a long-term relationship with you to understand your unique health needs.',
    icon: 'stethoscope',
  },
  {
    id: 'blood-pressure',
    title: 'Blood Pressure Management',
    shortDescription: 'Regular monitoring and personalized treatment plans.',
    fullDescription: 'High blood pressure often has no symptoms but can lead to serious health problems. We offer regular monitoring, lifestyle guidance, and medication management when needed to keep your blood pressure under control.',
    icon: 'heart-pulse',
  },
  {
    id: 'diabetes',
    title: 'A1C Checks & Diabetes Support',
    shortDescription: 'Diabetes monitoring and comprehensive care.',
    fullDescription: 'Managing diabetes requires consistent attention. We provide A1C testing, blood sugar monitoring guidance, medication management, and lifestyle counseling to help you take control of your diabetes.',
    icon: 'activity',
  },
  {
    id: 'preventive',
    title: 'Preventive Care & Wellness',
    shortDescription: 'Stay healthy with regular screenings and check-ups.',
    fullDescription: 'Prevention is the best medicine. We offer annual wellness exams, age-appropriate health screenings, immunizations, and personalized advice to help you maintain your health and catch problems early.',
    icon: 'shield-check',
  },
  {
    id: 'urgent',
    title: 'Same-Day Appointments',
    shortDescription: 'Quick care when you need it most.',
    fullDescription: "When health concerns arise unexpectedly, we work to accommodate same-day appointments for urgent needs. From sudden illness to minor injuries, we're here to help.",
    icon: 'clock',
  },
] as const;

export const whyChooseUs = [
  {
    title: 'Patient-Centered Visits',
    description: 'Every visit is unhurried. We take time to listen and understand your concerns.',
  },
  {
    title: 'Prevention-Focused',
    description: 'We believe in catching problems early and keeping you healthy long-term.',
  },
  {
    title: 'Clear Communication',
    description: 'No medical jargon. We explain everything in terms you can understand.',
  },
  {
    title: 'Community-First',
    description: "We're committed to making quality healthcare accessible to everyone.",
  },
] as const;

export const heroContent = {
  headline: 'Primary Care You Can Trust.',
  subheadline: 'Clear communication. Prevention-first. Practical treatment plans.',
  primaryCta: 'Book an Appointment',
  secondaryCta: 'Contact Us',
  emergencyNote: 'If this is an emergency, please call 911.',
} as const;

// External Booking System
export const booking = {
  tebraSchedulingUrl: 'https://d2oe0ra32qx05a.cloudfront.net/?practiceKey=k_84_63229',
} as const;

export const seoDefaults = {
  siteName: 'Bonafide Care Primary Care Clinic',
  defaultTitle: 'Bonafide Care | Primary Care Clinic in Lincoln Park, MI',
  defaultDescription: 'Bonafide Care offers trusted primary care services in Lincoln Park, Michigan. Patient-centered, prevention-focused healthcare with clear communication. Book your appointment today.',
  keywords: [
    'primary care clinic',
    'Lincoln Park MI',
    'physician assistant',
    'family medicine',
    'preventive care',
    'diabetes management',
    'blood pressure monitoring',
    'wellness exams',
    'Bonafide Care',
  ],
} as const;

// Appointment reasons - these should match Tebra configuration
// IDs will be populated from Tebra API during bootstrap
export const appointmentReasons = [
  {
    id: 'new-patient',
    name: 'New Patient Visit',
    description: 'First time visiting our clinic',
    duration: 45, // minutes
    tebraId: '', // Will be populated from Tebra
  },
  {
    id: 'follow-up',
    name: 'Follow-Up Visit',
    description: 'Returning for a scheduled follow-up',
    duration: 30,
    tebraId: '',
  },
  {
    id: 'annual-wellness',
    name: 'Annual Wellness Exam',
    description: 'Yearly preventive health check-up',
    duration: 45,
    tebraId: '',
  },
  {
    id: 'sick-visit',
    name: 'Sick Visit',
    description: 'Feeling unwell and need to be seen',
    duration: 30,
    tebraId: '',
  },
  {
    id: 'chronic-care',
    name: 'Chronic Condition Check-In',
    description: 'Blood pressure, diabetes, or other ongoing care',
    duration: 30,
    tebraId: '',
  },
] as const;

