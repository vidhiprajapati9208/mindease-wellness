/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mindDark: {
          950: 'var(--bg-main)',
          900: 'var(--bg-card)',
          850: 'var(--bg-card-sub)',
          800: 'var(--bg-card-alt)',
          700: 'var(--bg-highlight)',
          border: 'var(--border-main)'
        },
        mindPink: {
          DEFAULT: '#ec4899',
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          hover: '#db2777',
          light: '#f472b6',
          deep: '#e11d48',
          glow: 'rgba(236, 72, 153, 0.35)'
        },
        // Alias mindCyan to mindPink so any existing mindCyan references automatically glow in pink!
        mindCyan: {
          DEFAULT: '#ec4899',
          hover: '#db2777',
          light: '#f472b6',
          glow: 'rgba(236, 72, 153, 0.35)'
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'floatReverse 5s ease-in-out infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 24px rgba(244, 63, 94, 0.8))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
