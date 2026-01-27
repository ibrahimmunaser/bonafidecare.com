'use client';

import { useEffect } from 'react';
import { booking } from '@/config/content';

/**
 * Floating Booking Widget
 * 
 * A floating button that appears in the bottom-right corner of all pages.
 * Provides an always-available way to book appointments.
 * Opens booking in a new tab for maximum compatibility.
 */
export function FloatingBookingWidget() {
  useEffect(() => {
    // Create and inject styles
    const style = document.createElement('style');
    style.innerText = `
      .booking-button {
        background-color: #dc2626;
        color: white;
        position: fixed;
        bottom: 1.25rem;
        right: 1.25rem;
        width: 4rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        cursor: pointer;
        border: none;
        transition: all 0.3s ease;
        z-index: 999;
      }
      
      .booking-button:hover {
        background-color: #b91c1c;
        transform: scale(1.05);
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      }
      
      .booking-button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.4);
      }
      
      .booking-button:active {
        transform: scale(0.95);
      }

      .booking-button svg {
        width: 1.75rem;
        height: 1.75rem;
      }

      .booking-tooltip {
        position: absolute;
        right: 5rem;
        bottom: 1.25rem;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 0.625rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        z-index: 998;
      }

      .booking-button:hover + .booking-tooltip {
        opacity: 1;
      }

      @media (max-width: 768px) {
        .booking-button {
          width: 3.5rem;
          height: 3.5rem;
          bottom: 1rem;
          right: 1rem;
        }
        
        .booking-button svg {
          width: 1.5rem;
          height: 1.5rem;
        }

        .booking-tooltip {
          display: none;
        }
      }

      @keyframes pulse-ring {
        0% {
          transform: scale(1);
          opacity: 0.8;
        }
        50% {
          transform: scale(1.15);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }

      .booking-button::before {
        content: '';
        position: absolute;
        inset: -4px;
        border-radius: 9999px;
        background: #dc2626;
        opacity: 0;
        animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `;
    document.head.appendChild(style);

    // Create widget container
    const container = document.createElement('div');
    container.innerHTML = `
      <button 
        class="booking-button" 
        id="bookingButton"
        aria-label="Book an appointment"
        title="Book an Appointment"
      >
        <svg 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20 3h-2c0-.6-.4-1-1-1s-1 .4-1 1H8c0-.6-.4-1-1-1s-1 .4-1 1H4c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 17H4V10h16v10zm0-12H4V5h2c0 .6.4 1 1 1s1-.4 1-1h8c0 .6.4 1 1 1s1-.4 1-1h2v3z"/>
          <path d="M7 12h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2z"/>
        </svg>
      </button>
      <div class="booking-tooltip">Book Appointment</div>
    `;
    document.body.appendChild(container);

    // Set up event listeners
    const bookingButton = document.getElementById('bookingButton');

    const openBooking = () => {
      // Open booking system in new tab
      window.open(booking.tebraSchedulingUrl, '_blank', 'noopener,noreferrer');
      
      // Optional: Add analytics tracking here
      console.log('Booking widget clicked - opening Tebra scheduler');
    };

    // Open on button click
    bookingButton?.addEventListener('click', openBooking);

    // Cleanup
    return () => {
      style.remove();
      container.remove();
    };
  }, []);

  return null; // This component only injects the widget via useEffect
}
