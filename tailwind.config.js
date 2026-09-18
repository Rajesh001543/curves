/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  safelist: [
    'animate-fly-out',
    'translate-x-0',
    'opacity-100',
    'translate-x-32',
    'opacity-0',
    'pointer-events-none'
  ],
  theme: {
    extend: {
      colors: {
        blush: '#f9e8e8',
        rose: '#e5b2b2',
        cream: '#fdfbf7',
        champagne: '#f7e7ce',
        burgundy: '#800020',
        charcoal: '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out both',
        'slide-up': 'slideUp 0.8s ease-out both',
        'fade-in-up': 'fadeInUp 1s ease-out both',
        'fade-in-right': 'fadeInRight 1s ease-out both',
        'fade-in-left': 'fadeInLeft 1s ease-out both',
        'fly-out': 'flyOut 0.8s cubic-bezier(0.5, 0, 0.2, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        flyOut: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '20%': { transform: 'translate(-5px, 5px) scale(0.9)', opacity: '1' },
          '100%': { transform: 'translate(60px, -60px) scale(0)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
