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
    monday: '10:00 AM - 6:00 PM',
    tuesday: '10:00 AM - 6:00 PM',
    wednesday: '10:00 AM - 6:00 PM',
    thursday: '10:00 AM - 6:00 PM',
    friday: '10:00 AM - 6:00 PM',
    saturday: 'Closed',
    sunday: 'Closed',
  },
  
  // For availability calculation
  workingHours: {
    start: 10, // 10 AM
    end: 18,  // 6 PM
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
    title: 'Primary Care & Preventive Health',
    shortDescription: 'Comprehensive wellness care for adults of all ages.',
    fullDescription: 'We provide complete primary care services including annual physicals and wellness exams, preventive screenings, blood pressure and cholesterol monitoring, diabetes management, immunizations, and routine lab work. Our goal is to keep you healthy and catch potential problems early.',
    icon: 'stethoscope',
    items: [
      'Annual physicals & wellness exams',
      'Preventive screenings',
      'Blood pressure, cholesterol, and diabetes management',
      'Immunizations & routine lab work',
    ],
  },
  {
    id: 'same-day-sick',
    title: 'Same-Day & Sick Visits',
    shortDescription: 'Quick care when illness strikes.',
    fullDescription: "When you're feeling unwell, we work to accommodate same-day appointments. We treat common illnesses like cold, flu, COVID, sinus infections, sore throat, ear infections, urinary tract infections, fever, cough, nausea, vomiting, and diarrhea. Walk-ins are welcome when available.",
    icon: 'clock',
    items: [
      'Cold, flu, COVID, and sinus infections',
      'Sore throat, ear infections',
      'Urinary tract infections',
      'Fever, cough, nausea, vomiting, diarrhea',
      'Walk-ins welcome',
    ],
  },
  {
    id: 'chronic-disease',
    title: 'Chronic Disease Management',
    shortDescription: 'Ongoing support for long-term health conditions.',
    fullDescription: 'Living with a chronic condition requires consistent, coordinated care. We help you manage diabetes, high blood pressure, high cholesterol, asthma, COPD, thyroid disorders, and other ongoing health concerns with regular monitoring, medication management, and personalized treatment plans.',
    icon: 'heart-pulse',
    items: [
      'Diabetes',
      'High blood pressure',
      'High cholesterol',
      'Asthma & COPD',
      'Thyroid disorders',
    ],
  },
  {
    id: 'womens-mens-health',
    title: "Women's & Men's Health",
    shortDescription: 'Specialized care tailored to your needs.',
    fullDescription: "We provide gender-specific health services including well-woman visits, birth control counseling, men's health screenings, hormone concerns, and treatment for erectile dysfunction and low testosterone when appropriate.",
    icon: 'activity',
    items: [
      'Well-woman visits',
      'Birth control counseling',
      "Men's health & hormone concerns",
      'Erectile dysfunction & low testosterone (if applicable)',
    ],
  },
  {
    id: 'minor-injuries',
    title: 'Minor Injuries & In-Office Care',
    shortDescription: 'Treatment for common injuries and quick procedures.',
    fullDescription: 'We handle minor injuries and provide in-office procedures including care for sprains and minor injuries, laceration checks, joint pain evaluation, and various injections including B12, steroid injections, and other treatments as needed.',
    icon: 'shield-check',
    items: [
      'Sprains and minor injuries',
      'Laceration checks',
      'Joint pain',
      'Injections (B12, steroid, etc.)',
    ],
  },
  {
    id: 'physicals-paperwork',
    title: 'Physicals & Paperwork',
    shortDescription: 'Required exams and documentation for work, school, and sports.',
    fullDescription: 'We provide sports physicals, school and work physicals, and DOT/employment exams when applicable. Get the documentation you need quickly and professionally.',
    icon: 'stethoscope',
    items: [
      'Sports physicals',
      'School & work physicals',
      'DOT / employment exams (if applicable)',
    ],
  },
  {
    id: 'labs-testing',
    title: 'Labs & Point-of-Care Testing',
    shortDescription: 'Quick results for immediate care decisions.',
    fullDescription: 'We offer convenient in-office testing including blood glucose checks, A1C testing, urinalysis, and rapid testing for strep, flu, and COVID. Get fast, accurate results during your visit.',
    icon: 'activity',
    items: [
      'Blood glucose checks',
      'A1C testing',
      'Urinalysis',
      'Rapid strep, flu, COVID testing',
    ],
  },
  {
    id: 'care-coordination',
    title: 'Care Coordination',
    shortDescription: 'Seamless connection to specialized care.',
    fullDescription: 'We help coordinate your overall health by providing referrals to specialists when needed, managing your medications, and ensuring proper follow-up after hospital or emergency room visits.',
    icon: 'heart-pulse',
    items: [
      'Referrals to specialists',
      'Medication management',
      'Hospital & ER follow-up visits',
    ],
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
    'same-day sick visits',
    'chronic disease management',
    'women\'s health',
    'men\'s health',
    'sports physicals',
    'work physicals',
    'lab testing',
    'COVID testing',
    'flu testing',
    'minor injuries',
    'urgent care',
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
    description: 'Cold, flu, infection, or other acute illness',
    duration: 30,
    tebraId: '',
  },
  {
    id: 'chronic-care',
    name: 'Chronic Condition Management',
    description: 'Blood pressure, diabetes, cholesterol, or other ongoing care',
    duration: 30,
    tebraId: '',
  },
  {
    id: 'physical-exam',
    name: 'Physical Exam',
    description: 'Sports, school, work, or DOT physical',
    duration: 30,
    tebraId: '',
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    description: 'Well-woman visit, birth control counseling',
    duration: 30,
    tebraId: '',
  },
  {
    id: 'mens-health',
    name: "Men's Health",
    description: 'Wellness visit, hormone concerns',
    duration: 30,
    tebraId: '',
  },
  {
    id: 'minor-injury',
    name: 'Minor Injury',
    description: 'Sprains, joint pain, laceration check',
    duration: 30,
    tebraId: '',
  },
] as const;

