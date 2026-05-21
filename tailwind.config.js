/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9eeff',
          200: '#bce0ff',
          300: '#8ecdff',
          400: '#59afff',
          500: '#338eff',
          600: '#1a6ef5',
          700: '#1559e0',
          800: '#1849b5',
          900: '#1a418f',
          950: '#142a5a'
        },
        aqua: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave-1': 'wave 1.2s ease-in-out infinite',
        'wave-2': 'wave 1.2s ease-in-out 0.15s infinite',
        'wave-3': 'wave 1.2s ease-in-out 0.3s infinite',
        'wave-4': 'wave 1.2s ease-in-out 0.45s infinite',
        'wave-5': 'wave 1.2s ease-in-out 0.6s infinite'
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' }
        }
      }
    }
  },
  plugins: []
}
