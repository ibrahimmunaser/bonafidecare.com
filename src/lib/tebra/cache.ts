/**
 * Tebra Cache Manager
 * Caches bootstrap data (practices, providers, locations, reasons)
 * to avoid excessive API calls
 */

import type {
  Practice,
  ServiceLocation,
  Provider,
  AppointmentReason,
  BootstrapCache,
} from './types';
import {
  getPractices,
  getServiceLocations,
  getProviders,
  getAppointmentReasons,
} from './soap-client';

// Cache TTL: 12 hours in milliseconds
const CACHE_TTL = 12 * 60 * 60 * 1000;

// In-memory cache
let bootstrapCache: BootstrapCache | null = null;

/**
 * Check if cache is valid
 */
function isCacheValid(): boolean {
  if (!bootstrapCache) return false;
  return Date.now() < bootstrapCache.expiresAt;
}

/**
 * Get cached bootstrap data or fetch if expired
 */
export async function getBootstrapData(): Promise<BootstrapCache> {
  if (isCacheValid() && bootstrapCache) {
    return bootstrapCache;
  }

  // Fetch fresh data
  const practices = await getPractices();
  
  if (practices.length === 0) {
    throw new Error('No practices found');
  }

  // Use the first practice (clinic typically has one)
  const practiceId = practices[0].PracticeID;

  // Fetch related data in parallel
  const [serviceLocations, providers, appointmentReasons] = await Promise.all([
    getServiceLocations(practiceId),
    getProviders(practiceId),
    getAppointmentReasons(practiceId),
  ]);

  // Update cache
  bootstrapCache = {
    practices,
    serviceLocations,
    providers,
    appointmentReasons,
    cachedAt: Date.now(),
    expiresAt: Date.now() + CACHE_TTL,
  };

  return bootstrapCache;
}

/**
 * Get the primary practice ID
 */
export async function getPrimaryPracticeId(): Promise<string> {
  const data = await getBootstrapData();
  if (data.practices.length === 0) {
    throw new Error('No practices configured');
  }
  return data.practices[0].PracticeID;
}

/**
 * Get the primary service location ID
 */
export async function getPrimaryServiceLocationId(): Promise<string> {
  const data = await getBootstrapData();
  if (data.serviceLocations.length === 0) {
    throw new Error('No service locations configured');
  }
  return data.serviceLocations[0].ID;
}

/**
 * Get the primary provider ID
 */
export async function getPrimaryProviderId(): Promise<string> {
  const data = await getBootstrapData();
  if (data.providers.length === 0) {
    throw new Error('No providers configured');
  }
  return data.providers[0].ID;
}

/**
 * Get all providers
 */
export async function getCachedProviders(): Promise<Provider[]> {
  const data = await getBootstrapData();
  return data.providers;
}

/**
 * Get all appointment reasons
 */
export async function getCachedAppointmentReasons(): Promise<AppointmentReason[]> {
  const data = await getBootstrapData();
  return data.appointmentReasons;
}

/**
 * Get appointment reason by ID
 */
export async function getAppointmentReasonById(
  reasonId: string
): Promise<AppointmentReason | null> {
  const reasons = await getCachedAppointmentReasons();
  return reasons.find((r) => r.ID === reasonId) || null;
}

/**
 * Clear the cache (useful for testing or manual refresh)
 */
export function clearCache(): void {
  bootstrapCache = null;
}

/**
 * Get cache status
 */
export function getCacheStatus(): {
  isCached: boolean;
  cachedAt: number | null;
  expiresAt: number | null;
  timeRemaining: number | null;
} {
  if (!bootstrapCache) {
    return {
      isCached: false,
      cachedAt: null,
      expiresAt: null,
      timeRemaining: null,
    };
  }

  return {
    isCached: true,
    cachedAt: bootstrapCache.cachedAt,
    expiresAt: bootstrapCache.expiresAt,
    timeRemaining: Math.max(0, bootstrapCache.expiresAt - Date.now()),
  };
}







