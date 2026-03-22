/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary clinic colors - Darker Red to match logo
        primary: {
          50: '#fef5f4',
          100: '#fde8e6',
          200: '#fbd4d0',
          300: '#f7aba3',
          400: '#f0786c',
          500: '#e54f3f',
          600: '#9B2C23',  // Main darker red from logo
          700: '#842419',  // Darker
          800: '#6e1f16',  // Very dark
          900: '#5b1d17',  // Almost black red
          950: '#310c0a',  // Deepest
        },
        // Neutral tones - Custom Dark Blue (#2E4062)
        neutral: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae2',
          300: '#b1baca',
          400: '#8695ad',
          500: '#677694',
          600: '#525f7a',
          700: '#434e64',
          800: '#2E4062',  // Main custom dark blue
          900: '#273654',  // Darker
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        heading: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}



