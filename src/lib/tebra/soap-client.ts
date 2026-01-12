/**
 * Tebra SOAP Client
 * Handles all SOAP API communications with Tebra (Kareo)
 */

import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import type {
  TebraConfig,
  RequestHeader,
  Practice,
  ServiceLocation,
  Provider,
  AppointmentReason,
  Patient,
  Appointment,
  CreatePatientRequest,
  CreatePatientResponse,
  CreateAppointmentRequest,
  CreateAppointmentResponse,
  GetAppointmentsRequest,
} from './types';

const WSDL_URL = 'https://webservice.kareo.com/services/soap/2.1/KareoServices.svc';

// Interface for SOAP responses with nested structures
interface SoapResult {
  [key: string]: SoapResult | string | number | boolean | null | undefined | SoapResult[];
  Practices?: { Practice: SoapResult | SoapResult[] };
  ServiceLocations?: { ServiceLocation: SoapResult | SoapResult[] };
  Providers?: { Provider: SoapResult | SoapResult[] };
  AppointmentReasons?: { AppointmentReason: SoapResult | SoapResult[] };
  Patients?: { Patient: SoapResult | SoapResult[] };
  Appointments?: { Appointment: SoapResult | SoapResult[] };
  PatientID?: string;
  AppointmentID?: string;
  ID?: string;
  ErrorMessage?: string;
}

/**
 * Helper to safely access nested SOAP response data
 */
function getSoapResult(response: unknown, ...path: string[]): SoapResult | undefined {
  let current = response as Record<string, unknown>;
  for (const key of path) {
    if (current === null || current === undefined) return undefined;
    current = current[key] as Record<string, unknown>;
  }
  return current as SoapResult;
}

// XML parser configuration
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
});

const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

/**
 * Escape XML special characters in strings
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Get Tebra credentials from environment
 */
function getCredentials(): TebraConfig {
  const customerKey = process.env.TEBRA_CUSTOMER_KEY;
  const username = process.env.TEBRA_USERNAME;
  const password = process.env.TEBRA_PASSWORD;

  if (!customerKey || !username || !password) {
    throw new Error('Tebra credentials not configured');
  }

  return {
    customerKey,
    username,
    password,
    wsdlUrl: WSDL_URL,
  };
}

/**
 * Build request header XML
 */
function buildRequestHeader(config: TebraConfig): string {
  return `
    <RequestHeader xmlns:a="http://www.kareo.com/api/schemas/">
      <a:CustomerKey>${escapeXml(config.customerKey)}</a:CustomerKey>
      <a:User>${escapeXml(config.username)}</a:User>
      <a:Password>${escapeXml(config.password)}</a:Password>
    </RequestHeader>
  `;
}

/**
 * Make a SOAP request to Tebra
 */
async function soapRequest(
  action: string,
  body: string,
  retries = 3
): Promise<unknown> {
  const config = getCredentials();
  
  const envelope = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope 
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
      xmlns:kar="http://www.kareo.com/api/schemas/">
      <soap:Header>
        ${buildRequestHeader(config)}
      </soap:Header>
      <soap:Body>
        ${body}
      </soap:Body>
    </soap:Envelope>`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(WSDL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': `http://www.kareo.com/api/schemas/${action}`,
        },
        body: envelope,
      });

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.pow(2, attempt) * 1000;
        console.log(`Rate limited. Retrying after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        throw new Error(`SOAP request failed: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      const parsed = parser.parse(text);
      
      // Extract response from SOAP envelope
      const soapBody = parsed?.['soap:Envelope']?.['soap:Body'] || 
                       parsed?.Envelope?.Body ||
                       parsed?.['s:Envelope']?.['s:Body'];
                       
      if (!soapBody) {
        throw new Error('Invalid SOAP response structure');
      }

      return soapBody;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Request failed, retrying in ${delay}ms...`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error('Max retries exceeded');
}

/**
 * Get all practices
 */
export async function getPractices(): Promise<Practice[]> {
  const body = `
    <kar:GetPractices>
      <kar:request>
        <kar:RequestHeader>${buildRequestHeader(getCredentials())}</kar:RequestHeader>
      </kar:request>
    </kar:GetPractices>
  `;

  const response = await soapRequest('GetPractices', body);
  const result = getSoapResult(response, 'GetPracticesResponse', 'GetPracticesResult');
  
  if (!result?.Practices) {
    return [];
  }

  const practices = Array.isArray(result.Practices.Practice) 
    ? result.Practices.Practice 
    : [result.Practices.Practice];

  return practices.map((p: Record<string, unknown>) => ({
    PracticeID: String(p.PracticeID || p.ID || ''),
    PracticeName: String(p.PracticeName || p.Name || ''),
  }));
}

/**
 * Get service locations for a practice
 */
export async function getServiceLocations(practiceId: string): Promise<ServiceLocation[]> {
  const body = `
    <kar:GetServiceLocations>
      <kar:request>
        <kar:RequestHeader>${buildRequestHeader(getCredentials())}</kar:RequestHeader>
        <kar:Fields>
          <kar:PracticeID>${escapeXml(practiceId)}</kar:PracticeID>
        </kar:Fields>
      </kar:request>
    </kar:GetServiceLocations>
  `;

  const response = await soapRequest('GetServiceLocations', body);
  const result = getSoapResult(response, 'GetServiceLocationsResponse', 'GetServiceLocationsResult');
  
  if (!result?.ServiceLocations) {
    return [];
  }

  const locations = Array.isArray(result.ServiceLocations.ServiceLocation)
    ? result.ServiceLocations.ServiceLocation
    : [result.ServiceLocations.ServiceLocation];

  return locations.map((l: Record<string, unknown>) => ({
    ID: String(l.ID || ''),
    PracticeID: String(l.PracticeID || practiceId),
    Name: String(l.Name || ''),
    Address: String(l.Address || ''),
    City: String(l.City || ''),
    State: String(l.State || ''),
    ZipCode: String(l.ZipCode || ''),
  }));
}

/**
 * Get providers for a practice
 */
export async function getProviders(practiceId: string): Promise<Provider[]> {
  const body = `
    <kar:GetProviders>
      <kar:request>
        <kar:RequestHeader>${buildRequestHeader(getCredentials())}</kar:RequestHeader>
        <kar:Fields>
          <kar:PracticeID>${escapeXml(practiceId)}</kar:PracticeID>
        </kar:Fields>
      </kar:request>
    </kar:GetProviders>
  `;

  const response = await soapRequest('GetProviders', body);
  const result = getSoapResult(response, 'GetProvidersResponse', 'GetProvidersResult');
  
  if (!result?.Providers) {
    return [];
  }

  const providers = Array.isArray(result.Providers.Provider)
    ? result.Providers.Provider
    : [result.Providers.Provider];

  return providers.map((p: Record<string, unknown>) => ({
    ID: String(p.ID || ''),
    PracticeID: String(p.PracticeID || practiceId),
    FirstName: String(p.FirstName || ''),
    LastName: String(p.LastName || ''),
    FullName: `${p.FirstName || ''} ${p.LastName || ''}`.trim(),
    NPI: p.NPI ? String(p.NPI) : undefined,
    Specialty: p.Specialty ? String(p.Specialty) : undefined,
  }));
}

/**
 * Get appointment reasons for a practice
 */
export async function getAppointmentReasons(practiceId: string): Promise<AppointmentReason[]> {
  const body = `
    <kar:GetAppointmentReasons>
      <kar:request>
        <kar:RequestHeader>${buildRequestHeader(getCredentials())}</kar:RequestHeader>
        <kar:Fields>
          <kar:PracticeID>${escapeXml(practiceId)}</kar:PracticeID>
        </kar:Fields>
      </kar:request>
    </kar:GetAppointmentReasons>
  `;

  const response = await soapRequest('GetAppointmentReasons', body);
  const result = getSoapResult(response, 'GetAppointmentReasonsResponse', 'GetAppointmentReasonsResult');
  
  if (!result?.AppointmentReasons) {
    return [];
  }

  const reasons = Array.isArray(result.AppointmentReasons.AppointmentReason)
    ? result.AppointmentReasons.AppointmentReason
    : [result.AppointmentReasons.AppointmentReason];

  return reasons.map((r: Record<string, unknown>) => ({
    ID: String(r.ID || ''),
    Name: String(r.Name || ''),
    Duration: parseInt(String(r.Duration || '30'), 10),
    PracticeID: String(r.PracticeID || practiceId),
  }));
}

/**
 * Search for an existing patient
 */
export async function searchPatient(
  practiceId: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string
): Promise<Patient | null> {
  const body = `
    <kar:GetPatients>
      <kar:request>
        <kar:RequestHeader>${buildRequestHeader(getCredentials())}</kar:RequestHeader>
        <kar:Fields>
          <kar:PracticeID>${escapeXml(practiceId)}</kar:PracticeID>
          <kar:FirstName>${escapeXml(firstName)}</kar:FirstName>
          <kar:LastName>${escapeXml(lastName)}</kar:LastName>
          <kar:DOB>${escapeXml(dateOfBirth)}</kar:DOB>
        </kar:Fields>
      </kar:request>
    </kar:GetPatients>
  `;

  const response = await soapRequest('GetPatients', body);
  const result = getSoapResult(response, 'GetPatientsResponse', 'GetPatientsResult');
  
  if (!result?.Patients?.Patient) {
    return null;
  }

  const patients = Array.isArray(result.Patients.Patient)
    ? result.Patients.Patient
    : [result.Patients.Patient];

  // Find exact match
  const match = patients.find((p: Record<string, unknown>) => 
    String(p.FirstName).toLowerCase() === firstName.toLowerCase() &&
    String(p.LastName).toLowerCase() === lastName.toLowerCase()
  );

  if (!match) {
    return null;
  }

  return {
    PatientID: String(match.PatientID || match.ID || ''),
    FirstName: String(match.FirstName || ''),
    LastName: String(match.LastName || ''),
    DateOfBirth: String(match.DateOfBirth || match.DOB || ''),
    Email: match.Email ? String(match.Email) : undefined,
    Phone: match.Phone ? String(match.Phone) : undefined,
    PracticeID: practiceId,
  };
}

/**
 * Create a new patient
 */
export async function createPatient(
  request: CreatePatientRequest
): Promise<CreatePatientResponse> {
  const body = `
    <kar:CreatePatient>
      <kar:request>
        <kar:RequestHeader>${buildRequestHeader(getCredentials())}</kar:RequestHeader>
        <kar:Patient>
          <kar:PracticeID>${escapeXml(request.PracticeID)}</kar:PracticeID>
          <kar:FirstName>${escapeXml(request.FirstName)}</kar:FirstName>
          <kar:LastName>${escapeXml(request.LastName)}</kar:LastName>
          <kar:DOB>${escapeXml(request.DateOfBirth)}</kar:DOB>
          ${request.Email ? `<kar:Email>${escapeXml(request.Email)}</kar:Email>` : ''}
          ${request.Phone ? `<kar:Phone>${escapeXml(request.Phone)}</kar:Phone>` : ''}
        </kar:Patient>
      </kar:request>
    </kar:CreatePatient>
  `;

  const response = await soapRequest('CreatePatient', body);
  const result = getSoapResult(response, 'CreatePatientResponse', 'CreatePatientResult');
  
  return {
    PatientID: String(result?.PatientID || result?.ID || ''),
    Success: Boolean(result?.PatientID || result?.ID),
    ErrorMessage: result?.ErrorMessage ? String(result.ErrorMessage) : undefined,
  };
}

/**
 * Get appointments for a date range
 */
export async function getAppointments(
  request: GetAppointmentsRequest
): Promise<Appointment[]> {
  const body = `
    <kar:GetAppointments>
      <kar:request>
        <kar:RequestHeader>${buildRequestHeader(getCredentials())}</kar:RequestHeader>
        <kar:Fields>
          <kar:PracticeID>${escapeXml(request.PracticeID)}</kar:PracticeID>
          ${request.ProviderID ? `<kar:ProviderID>${escapeXml(request.ProviderID)}</kar:ProviderID>` : ''}
          ${request.ServiceLocationID ? `<kar:ServiceLocationID>${escapeXml(request.ServiceLocationID)}</kar:ServiceLocationID>` : ''}
          <kar:StartDate>${escapeXml(request.StartDate)}</kar:StartDate>
          <kar:EndDate>${escapeXml(request.EndDate)}</kar:EndDate>
        </kar:Fields>
      </kar:request>
    </kar:GetAppointments>
  `;

  const response = await soapRequest('GetAppointments', body);
  const result = getSoapResult(response, 'GetAppointmentsResponse', 'GetAppointmentsResult');
  
  if (!result?.Appointments?.Appointment) {
    return [];
  }

  const appointments = Array.isArray(result.Appointments.Appointment)
    ? result.Appointments.Appointment
    : [result.Appointments.Appointment];

  return appointments.map((a: Record<string, unknown>) => ({
    AppointmentID: String(a.AppointmentID || a.ID || ''),
    PatientID: String(a.PatientID || ''),
    ProviderID: String(a.ProviderID || ''),
    PracticeID: String(a.PracticeID || request.PracticeID),
    ServiceLocationID: String(a.ServiceLocationID || ''),
    AppointmentReasonID: String(a.AppointmentReasonID || ''),
    StartTime: String(a.StartTime || ''),
    EndTime: String(a.EndTime || ''),
    Status: String(a.Status || 'Scheduled') as Appointment['Status'],
    Notes: a.Notes ? String(a.Notes) : undefined,
  }));
}

/**
 * Create a new appointment
 */
export async function createAppointment(
  request: CreateAppointmentRequest
): Promise<CreateAppointmentResponse> {
  const body = `
    <kar:CreateAppointment>
      <kar:request>
        <kar:RequestHeader>${buildRequestHeader(getCredentials())}</kar:RequestHeader>
        <kar:Appointment>
          <kar:PracticeID>${escapeXml(request.PracticeID)}</kar:PracticeID>
          <kar:ServiceLocationID>${escapeXml(request.ServiceLocationID)}</kar:ServiceLocationID>
          <kar:ProviderID>${escapeXml(request.ProviderID)}</kar:ProviderID>
          <kar:PatientID>${escapeXml(request.PatientID)}</kar:PatientID>
          <kar:AppointmentReasonID>${escapeXml(request.AppointmentReasonID)}</kar:AppointmentReasonID>
          <kar:StartTime>${escapeXml(request.StartTime)}</kar:StartTime>
          <kar:EndTime>${escapeXml(request.EndTime)}</kar:EndTime>
          <kar:AppointmentStatus>${escapeXml(request.Status)}</kar:AppointmentStatus>
          <kar:IsRecurring>${request.IsRecurring}</kar:IsRecurring>
          <kar:WasCreatedOnline>${request.WasCreatedOnline}</kar:WasCreatedOnline>
          ${request.Notes ? `<kar:Notes>${escapeXml(request.Notes)}</kar:Notes>` : ''}
        </kar:Appointment>
      </kar:request>
    </kar:CreateAppointment>
  `;

  const response = await soapRequest('CreateAppointment', body);
  const result = getSoapResult(response, 'CreateAppointmentResponse', 'CreateAppointmentResult');
  
  return {
    AppointmentID: String(result?.AppointmentID || result?.ID || ''),
    Success: Boolean(result?.AppointmentID || result?.ID),
    ErrorMessage: result?.ErrorMessage ? String(result.ErrorMessage) : undefined,
  };
}

