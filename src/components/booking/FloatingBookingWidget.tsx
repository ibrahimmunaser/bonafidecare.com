'use client';

import { useEffect } from 'react';

/**
 * Floating Booking Widget with Tebra Integration
 * 
 * A floating button that appears in the bottom-right corner of all pages.
 * Opens the Tebra booking system in an iframe modal overlay.
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
        width: 4.5rem;
        height: 4.5rem;
        padding: 1.25rem;
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
        outline: 2px solid rgba(220, 38, 38, 0.5);
      }
      
      .booking-button:active {
        transform: scale(0.95);
      }

      #iframeContainer {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
        backdrop-filter: blur(4px);
      }

      #iframeContainer > div {
        position: relative;
        width: 90%;
        max-width: 1200px;
        height: 90%;
        margin: 2% auto;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      }

      #bookingIframe {
        width: 100%;
        height: 100%;
        border: none;
      }

      @media (max-width: 768px) {
        .booking-button {
          width: 3.5rem;
          height: 3.5rem;
          bottom: 1rem;
          right: 1rem;
        }

        #iframeContainer > div {
          width: 95%;
          height: 95%;
          margin: 2.5% auto;
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

    // Create widget container with iframe modal
    const container = document.createElement('div');
    container.innerHTML = `
      <div id="iframeContainer">
        <div>
          <iframe id="bookingIframe"></iframe>
        </div>
      </div>
      <button 
        class="booking-button" 
        id="bookingButton"
        aria-label="Book an appointment"
        title="Book an Appointment"
      >
        <svg 
          version="1.1" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20 3h-2c0-.6-.4-1-1-1s-1 .4-1 1H8c0-.6-.4-1-1-1s-1 .4-1 1H4c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 17H4V10h16v10zm0-12H4V5h2c0 .6.4 1 1 1s1-.4 1-1h8c0 .6.4 1 1 1s1-.4 1-1h2v3z"/>
          <path d="M7 12h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2z"/>
        </svg>
      </button>
    `;
    document.body.appendChild(container);

    // Set up event listeners
    const bookingButton = document.getElementById('bookingButton');
    const iframeContainer = document.getElementById('iframeContainer');
    const bookingIframe = document.getElementById('bookingIframe') as HTMLIFrameElement;

    // Open booking modal
    const openBooking = () => {
      if (bookingIframe && iframeContainer) {
        bookingIframe.src = 'https://d2oe0ra32qx05a.cloudfront.net/?practiceKey=k_84_63229';
        iframeContainer.style.display = 'block';
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
      }
    };

    // Close modal when clicking on overlay
    const closeBooking = (e: MouseEvent) => {
      if (iframeContainer && e.target === iframeContainer) {
        iframeContainer.style.display = 'none';
        // Restore body scroll
        document.body.style.overflow = '';
      }
    };

    // Attach event listeners
    bookingButton?.addEventListener('click', openBooking);
    iframeContainer?.addEventListener('click', closeBooking);

    // Cleanup
    return () => {
      style.remove();
      container.remove();
      document.body.style.overflow = '';
    };
  }, []);

  return null; // This component only injects the widget via useEffect
}
