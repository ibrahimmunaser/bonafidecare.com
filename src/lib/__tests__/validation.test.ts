import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Booking validation schema (same as in API route)
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

// Contact validation schema (same as in API route)
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required').max(20),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

describe('Booking Validation', () => {
  describe('bookingSchema', () => {
    it('should validate a complete valid booking request', () => {
      const validBooking = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        email: 'john@example.com',
        phone: '555-123-4567',
        appointmentReasonId: 'reason-1',
        startTime: '2025-06-01T14:00:00.000Z',
        notes: 'First visit',
      };

      const result = bookingSchema.safeParse(validBooking);
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const invalidBooking = {
        firstName: '',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        email: 'john@example.com',
        phone: '555-123-4567',
        appointmentReasonId: 'reason-1',
        startTime: '2025-06-01T14:00:00.000Z',
      };

      const result = bookingSchema.safeParse(invalidBooking);
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format', () => {
      const invalidBooking = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        email: 'not-an-email',
        phone: '555-123-4567',
        appointmentReasonId: 'reason-1',
        startTime: '2025-06-01T14:00:00.000Z',
      };

      const result = bookingSchema.safeParse(invalidBooking);
      expect(result.success).toBe(false);
    });

    it('should reject invalid date of birth format', () => {
      const invalidBooking = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '05/15/1990', // Wrong format
        email: 'john@example.com',
        phone: '555-123-4567',
        appointmentReasonId: 'reason-1',
        startTime: '2025-06-01T14:00:00.000Z',
      };

      const result = bookingSchema.safeParse(invalidBooking);
      expect(result.success).toBe(false);
    });

    it('should reject too short phone number', () => {
      const invalidBooking = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        email: 'john@example.com',
        phone: '12345', // Too short
        appointmentReasonId: 'reason-1',
        startTime: '2025-06-01T14:00:00.000Z',
      };

      const result = bookingSchema.safeParse(invalidBooking);
      expect(result.success).toBe(false);
    });

    it('should reject notes that are too long', () => {
      const invalidBooking = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        email: 'john@example.com',
        phone: '555-123-4567',
        appointmentReasonId: 'reason-1',
        startTime: '2025-06-01T14:00:00.000Z',
        notes: 'a'.repeat(501), // Too long
      };

      const result = bookingSchema.safeParse(invalidBooking);
      expect(result.success).toBe(false);
    });

    it('should allow optional notes to be omitted', () => {
      const validBooking = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        email: 'john@example.com',
        phone: '555-123-4567',
        appointmentReasonId: 'reason-1',
        startTime: '2025-06-01T14:00:00.000Z',
        // No notes field
      };

      const result = bookingSchema.safeParse(validBooking);
      expect(result.success).toBe(true);
    });
  });
});

describe('Contact Validation', () => {
  describe('contactSchema', () => {
    it('should validate a complete valid contact submission', () => {
      const validContact = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        message: 'I have a question about your services.',
      };

      const result = contactSchema.safeParse(validContact);
      expect(result.success).toBe(true);
    });

    it('should reject message that is too short', () => {
      const invalidContact = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        message: 'Hi', // Too short
      };

      const result = contactSchema.safeParse(invalidContact);
      expect(result.success).toBe(false);
    });

    it('should reject message that is too long', () => {
      const invalidContact = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        message: 'a'.repeat(2001), // Too long
      };

      const result = contactSchema.safeParse(invalidContact);
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const invalidContact = {
        name: 'John Doe',
        email: 'not-valid',
        phone: '555-123-4567',
        message: 'This is my message to the clinic.',
      };

      const result = contactSchema.safeParse(invalidContact);
      expect(result.success).toBe(false);
    });
  });
});







