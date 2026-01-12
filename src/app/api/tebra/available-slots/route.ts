import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots, isTebraConfigured } from '@/lib/tebra/booking-service';
import { formatSlotTime, formatSlotDate } from '@/lib/tebra/availability';

export async function GET(request: NextRequest) {
  // Check if Tebra is configured
  if (!isTebraConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: 'Booking system not available',
      },
      { status: 503 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const reasonId = searchParams.get('reason');

  // Validate parameters
  if (!date) {
    return NextResponse.json(
      {
        success: false,
        error: 'Date is required',
      },
      { status: 400 }
    );
  }

  if (!reasonId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Appointment reason is required',
      },
      { status: 400 }
    );
  }

  // Validate date format
  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid date format. Use YYYY-MM-DD',
      },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableSlots(date, reasonId);

    // Format slots for frontend
    const formattedSlots = slots.map((slot) => ({
      ...slot,
      displayTime: formatSlotTime(slot.startTime),
      displayDate: formatSlotDate(slot.startTime),
    }));

    return NextResponse.json({
      success: true,
      data: {
        date,
        slots: formattedSlots,
        totalSlots: formattedSlots.length,
      },
    });
  } catch (error) {
    console.error('Available slots error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve available slots',
      },
      { status: 500 }
    );
  }
}







