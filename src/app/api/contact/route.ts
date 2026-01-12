import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '5', 10);
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000', 10); // 1 hour

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required').max(20),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

/**
 * Get client IP for rate limiting
 */
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

/**
 * Check rate limit
 */
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

/**
 * Send email notification
 */
async function sendEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const clinicEmail = process.env.CLINIC_EMAIL || 'Bonafidecare2@gmail.com';

  // If SMTP not configured, log and return success
  if (!smtpHost || !smtpUser || !smtpPassword) {
    console.log('SMTP not configured. Contact form submission:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      messageLength: data.message.length,
    });
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    await transporter.sendMail({
      from: `"Bonafide Care Website" <${smtpUser}>`,
      to: clinicEmail,
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}

---
This message was sent from the Bonafide Care website contact form.
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
    .content { background: #f9fafb; padding: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #666; }
    .message-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; }
    .footer { padding: 15px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <p class="label">Name:</p>
        <p>${escapeHtml(data.name)}</p>
      </div>
      <div class="field">
        <p class="label">Email:</p>
        <p><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
      </div>
      <div class="field">
        <p class="label">Phone:</p>
        <p><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>
      </div>
      <div class="field">
        <p class="label">Message:</p>
        <div class="message-box">
          <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>This message was sent from the Bonafide Care website contact form.</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
    });

    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientIP = getClientIP(request);
  const rateLimit = checkRateLimit(clientIP);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: 'Too many requests. Please try again later.',
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW / 1000)),
        },
      }
    );
  }

  // Parse body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request body',
      },
      { status: 400 }
    );
  }

  // Validate
  const validation = contactSchema.safeParse(body);
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed',
        errors,
      },
      { status: 400 }
    );
  }

  const data = validation.data;

  // Send email
  const emailSent = await sendEmail(data);

  if (!emailSent) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    );
  }

  // Log for records (no PHI in logs)
  console.log('Contact form submission processed:', {
    timestamp: new Date().toISOString(),
    name: data.name,
  });

  return NextResponse.json({
    success: true,
    message: 'Message sent successfully. We\'ll get back to you soon.',
  });
}







