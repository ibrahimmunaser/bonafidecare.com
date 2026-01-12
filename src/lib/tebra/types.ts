/**
 * Tebra API Types
 * Types for SOAP API interactions with Tebra (Kareo)
 */

export interface TebraConfig {
  customerKey: string;
  username: string;
  password: string;
  wsdlUrl: string;
}

export interface RequestHeader {
  CustomerKey: string;
  User: string;
  Password: string;
}

// Practice types
export interface Practice {
  PracticeID: string;
  PracticeName: string;
}

export interface GetPracticesResponse {
  Practices: Practice[];
}

// Service Location types
export interface ServiceLocation {
  ID: string;
  PracticeID: string;
  Name: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
}

export interface GetServiceLocationsResponse {
  ServiceLocations: ServiceLocation[];
}

// Provider types
export interface Provider {
  ID: string;
  PracticeID: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  NPI?: string;
  Specialty?: string;
}

export interface GetProvidersResponse {
  Providers: Provider[];
}

// Appointment Reason types
export interface AppointmentReason {
  ID: string;
  Name: string;
  Duration: number;
  PracticeID: string;
}

export interface GetAppointmentReasonsResponse {
  AppointmentReasons: AppointmentReason[];
}

// Patient types
export interface Patient {
  PatientID: string;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Email?: string;
  Phone?: string;
  PracticeID: string;
}

export interface SearchPatientRequest {
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  PracticeID: string;
}

export interface CreatePatientRequest {
  PracticeID: string;
  FirstName: string;
  LastName: string;
  DateOfBirth: string; // YYYY-MM-DD
  Email?: string;
  Phone?: string;
}

export interface CreatePatientResponse {
  PatientID: string;
  Success: boolean;
  ErrorMessage?: string;
}

// Appointment types
export interface Appointment {
  AppointmentID: string;
  PatientID: string;
  ProviderID: string;
  PracticeID: string;
  ServiceLocationID: string;
  AppointmentReasonID: string;
  StartTime: string; // ISO 8601 UTC
  EndTime: string;
  Status: AppointmentStatus;
  Notes?: string;
}

export type AppointmentStatus = 
  | 'Scheduled'
  | 'Confirmed'
  | 'Cancelled'
  | 'Completed'
  | 'NoShow';

export interface GetAppointmentsRequest {
  PracticeID: string;
  ProviderID?: string;
  ServiceLocationID?: string;
  StartDate: string; // YYYY-MM-DD
  EndDate: string;
}

export interface GetAppointmentsResponse {
  Appointments: Appointment[];
}

export interface CreateAppointmentRequest {
  PracticeID: string;
  ServiceLocationID: string;
  ProviderID: string;
  PatientID: string;
  AppointmentReasonID: string;
  StartTime: string; // ISO 8601 UTC
  EndTime: string;
  Status: AppointmentStatus;
  IsRecurring: boolean;
  Notes?: string;
  WasCreatedOnline: boolean;
}

export interface CreateAppointmentResponse {
  AppointmentID: string;
  Success: boolean;
  ErrorMessage?: string;
}

// Cached bootstrap data
export interface BootstrapCache {
  practices: Practice[];
  serviceLocations: ServiceLocation[];
  providers: Provider[];
  appointmentReasons: AppointmentReason[];
  cachedAt: number;
  expiresAt: number;
}

// Error types
export interface TebraError {
  code: string;
  message: string;
  details?: string;
}







