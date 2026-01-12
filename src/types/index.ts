/**
 * Type definitions for Bonafide Care Clinic
 */

// ============================================
// Tebra API Types
// ============================================

export interface TebraCredentials {
  customerKey: string;
  username: string;
  password: string;
}

export interface TebraPractice {
  id: string;
  name: string;
}

export interface TebraServiceLocation {
  id: string;
  practiceId: string;
  name: string;
  address: string;
}

export interface TebraProvider {
  id: string;
  practiceId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  npi?: string;
}

export interface TebraAppointmentReason {
  id: string;
  name: string;
  duration: number;
  practiceId: string;
}

export interface TebraPatient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
}

export interface TebraAppointment {
  id: string;
  patientId: string;
  providerId: string;
  practiceId: string;
  serviceLocationId: string;
  appointmentReasonId: string;
  startTime: string; // ISO string UTC
  endTime: string;   // ISO string UTC
  status: 'Scheduled' | 'Confirmed' | 'Cancelled' | 'Completed' | 'NoShow';
  notes?: string;
}

export interface CreateAppointmentRequest {
  practiceId: string;
  serviceLocationId: string;
  providerId: string;
  appointmentReasonId: string;
  startTime: string; // ISO string UTC
  endTime: string;   // ISO string UTC
  patient: {
    firstName: string;
    lastName: string;
    dateOfBirth: string; // YYYY-MM-DD
    email: string;
    phone: string;
  };
  notes?: string;
}

export interface CreatePatientRequest {
  practiceId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
}

export interface AvailableSlot {
  startTime: string; // ISO string
  endTime: string;   // ISO string
  providerId: string;
  providerName: string;
}

// ============================================
// Google Reviews Types
// ============================================

export interface GoogleReview {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  time: number; // Unix timestamp
}

// ============================================
// Contact Form Types
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot?: string; // Anti-spam field
  acknowledgedNotEmergency: boolean;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

// ============================================
// Booking Flow Types
// ============================================

export interface BookingState {
  step: 'reason' | 'datetime' | 'details' | 'confirm' | 'success' | 'error';
  selectedReason?: AppointmentReason;
  selectedDate?: string;
  selectedSlot?: AvailableSlot;
  patientDetails?: PatientDetails;
  confirmationDetails?: BookingConfirmation;
  errorMessage?: string;
}

export interface AppointmentReason {
  id: string;
  name: string;
  description: string;
  duration: number;
  tebraId: string;
}

export interface PatientDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingConfirmation {
  appointmentId: string;
  patientName: string;
  providerName: string;
  serviceName: string;
  dateTime: string;
  location: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string>;
}

export interface BootstrapData {
  practices: TebraPractice[];
  serviceLocations: TebraServiceLocation[];
  providers: TebraProvider[];
  appointmentReasons: TebraAppointmentReason[];
  lastUpdated: string;
}







