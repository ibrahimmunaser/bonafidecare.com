import { NextResponse } from 'next/server';
import { getBootstrapData, getCacheStatus } from '@/lib/tebra/cache';
import { isTebraConfigured } from '@/lib/tebra/booking-service';

export async function GET() {
  // Check if Tebra is configured
  if (!isTebraConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: 'Tebra integration not configured',
        configured: false,
      },
      { status: 503 }
    );
  }

  try {
    const data = await getBootstrapData();
    const cacheStatus = getCacheStatus();

    return NextResponse.json({
      success: true,
      data: {
        practices: data.practices,
        serviceLocations: data.serviceLocations,
        providers: data.providers.map((p) => ({
          id: p.ID,
          name: p.FullName,
        })),
        appointmentReasons: data.appointmentReasons.map((r) => ({
          id: r.ID,
          name: r.Name,
          duration: r.Duration,
        })),
      },
      cache: {
        isCached: cacheStatus.isCached,
        expiresIn: cacheStatus.timeRemaining,
      },
    });
  } catch (error) {
    console.error('Bootstrap error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load clinic configuration',
      },
      { status: 500 }
    );
  }
}







