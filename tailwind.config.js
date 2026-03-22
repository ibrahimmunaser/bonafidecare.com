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
        // Primary clinic colors - Custom Red (#C83A2E)
        primary: {
          50: '#fef5f4',
          100: '#fde9e7',
          200: '#fbd7d4',
          300: '#f7b8b3',
          400: '#f08f87',
          500: '#e5675d',
          600: '#C83A2E',  // Main custom red
          700: '#b32f24',  // Darker
          800: '#95271f',  // Very dark
          900: '#7c241f',  // Almost black red
          950: '#431210',  // Deepest
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



