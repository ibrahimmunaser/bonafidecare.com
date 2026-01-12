# Bonafide Care Primary Care Clinic Website

A clean, modern, mobile-first website for Bonafide Care Primary Care Clinic, featuring online appointment booking via Tebra integration, Google Reviews display, and a patient contact system.

## Features

- **Marketing Website**: Professional pages for Home, Services, About, Contact, Privacy, and Terms
- **Online Appointment Booking**: Full integration with Tebra (Kareo) for scheduling
- **Google Reviews**: Display 5-star reviews from Google Places
- **Contact Form**: Secure messaging with anti-spam protection
- **Patient Portal**: Configurable link to external patient portal
- **SEO Optimized**: Structured data, meta tags, sitemap-ready
- **Mobile-First**: Responsive design with excellent accessibility

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Testing**: Vitest
- **APIs**: Tebra SOAP, Google Places

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bonafide-care-clinic

# Install dependencies
npm install

# Copy environment file
cp env.example.txt .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

Rename `env.example.txt` to `.env.local` and configure:

### Required for Booking

```env
# Tebra API Credentials
TEBRA_CUSTOMER_KEY=your-customer-key
TEBRA_USERNAME=your-username
TEBRA_PASSWORD=your-password
```

### Required for Reviews

```env
# Google Places API
GOOGLE_PLACES_API_KEY=your-api-key
GOOGLE_PLACE_ID=your-place-id
```

### Optional

```env
# Email Configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CLINIC_EMAIL=Bonafidecare2@gmail.com

# Patient Portal URL (leave empty to hide)
PATIENT_PORTAL_URL=

# Clinic Phone (leave empty to hide)
CLINIC_PHONE=

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## How Booking Works

### Architecture

1. **Bootstrap**: On page load, the app fetches practice, provider, location, and appointment reason data from Tebra
2. **Cache**: Bootstrap data is cached for 12 hours to minimize API calls
3. **Availability**: Slots are calculated by fetching existing appointments and computing open times
4. **Booking**: Patient is created (or found) in Tebra, then appointment is created

### Booking Flow

1. User selects appointment reason
2. User selects date and time from available slots
3. User enters personal details
4. User confirms and appointment is created in Tebra
5. Success page shows confirmation

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tebra/bootstrap` | GET | Fetch practice configuration |
| `/api/tebra/available-slots` | GET | Get available time slots for a date |
| `/api/tebra/book` | POST | Create appointment |
| `/api/reviews` | GET | Fetch 5-star Google reviews |
| `/api/contact` | POST | Submit contact form |

## Configuration

### Appointment Reasons

Edit `src/config/content.ts` to customize appointment types:

```typescript
export const appointmentReasons = [
  {
    id: 'new-patient',
    name: 'New Patient Visit',
    description: 'First time visiting our clinic',
    duration: 45,
    tebraId: '', // Populated from Tebra API
  },
  // ... more reasons
];
```

### Clinic Hours

Edit `src/config/content.ts`:

```typescript
export const clinicInfo = {
  workingHours: {
    start: 9,  // 9 AM
    end: 17,   // 5 PM
    slotDurationMinutes: 30,
    workingDays: [1, 2, 3, 4, 5], // Mon-Fri
  },
  // ...
};
```

### Content

All text content is centralized in `src/config/content.ts`:

- Clinic info (name, address, hours)
- Provider bio (verbatim as specified)
- Services list
- Hero content
- SEO defaults

## Switching to Real Patient Portal

1. Set `PATIENT_PORTAL_URL` in environment
2. The "Patient Portal" button will automatically appear on the Contact page

For full Tebra portal integration, you would need to:
1. Implement OAuth flow with Tebra
2. Add secure session management
3. Build portal screens for messages, records, etc.

## Running Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the production bundle:

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── tebra/         # Tebra integration
│   │   ├── reviews/       # Google reviews
│   │   └── contact/       # Contact form
│   ├── about/
│   ├── book/
│   ├── contact/
│   ├── privacy/
│   ├── services/
│   ├── terms/
│   ├── layout.tsx
│   └── page.tsx           # Home
├── components/
│   ├── booking/           # Booking flow components
│   ├── contact/           # Contact form
│   ├── home/              # Home page sections
│   └── layout/            # Header, Footer
├── config/
│   └── content.ts         # All clinic content
├── lib/
│   └── tebra/             # Tebra SOAP client
│       ├── soap-client.ts
│       ├── cache.ts
│       ├── availability.ts
│       └── booking-service.ts
└── types/
    └── index.ts
```

## Security Notes

- **No PHI Logging**: Patient health information is never logged
- **Server-Side API Calls**: All Tebra calls happen server-side
- **Rate Limiting**: Contact form has rate limiting
- **Input Validation**: All inputs are validated with Zod
- **HTTPS**: Production should always use HTTPS
- **Environment Variables**: Secrets are never exposed to client

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader friendly
- High contrast mode support

## License

Private - All rights reserved.

---

Built with ❤️ for Bonafide Care Primary Care Clinic







