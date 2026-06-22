/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './**/*.{tsx,ts,jsx,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          50:  '#FDF8EC',
          100: '#FAF0D0',
          200: '#F3DFA1',
          300: '#ECCC72',
          400: '#E3B843',
          500: '#C9A84C',
          600: '#A88535',
          700: '#866521',
          800: '#634912',
          900: '#3A2A07',
        },
      },
      animation: {
        'fade-in':       'fadeIn 1s ease-in-out both',
        'fade-in-slow':  'fadeIn 1.8s ease-in-out both',
        'slide-in-up':   'slideInUp 0.3s ease-out both',
        'slide-in-left': 'slideInLeft 0.3s ease-out both',
        'pulse-soft':    'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
