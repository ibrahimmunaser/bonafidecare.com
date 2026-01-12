import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { bookAppointment, isTebraConfigured } from '@/lib/tebra/booking-service';

// Validation schema
const bookingSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required').max(20),
  appointmentReasonId: z.string().min(1, 'Appointment reason is required'),
  startTime: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    'Invalid date/time format'
  ),
  notes: z.string().max(500, 'Notes must be 500 characters or less').optional(),
});

export async function POST(request: NextRequest) {
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

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request body',
      },
      { status: 400 }
    );
  }

  // Validate request body
  const validation = bookingSchema.safeParse(body);
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        errors,
      },
      { status: 400 }
    );
  }

  const data = validation.data;

  // Additional server-side validations
  const startTime = new Date(data.startTime);
  if (startTime <= new Date()) {
    return NextResponse.json(
      {
        success: false,
        error: 'Appointment time must be in the future',
      },
      { status: 400 }
    );
  }

  try {
    const result = await bookAppointment({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      dateOfBirth: data.dateOfBirth,
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      appointmentReasonId: data.appointmentReasonId,
      startTime: data.startTime,
      notes: data.notes?.trim(),
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to create appointment',
        },
        { status: 500 }
      );
    }

    // Don't log PHI, just the appointment ID
    console.log(`Appointment created: ${result.appointmentId}`);

    return NextResponse.json({
      success: true,
      data: {
        appointmentId: result.appointmentId,
        confirmation: result.confirmationDetails,
      },
      message: 'Appointment booked successfully. We\'ll contact you if anything changes.',
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    );
  }
}







