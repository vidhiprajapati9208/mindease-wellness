/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        mindDark: {
          950: 'var(--bg-main)',
          900: 'var(--bg-card)',
          850: 'var(--bg-card-sub)',
          800: 'var(--bg-card-alt)',
          700: 'var(--bg-highlight)',
          border: 'var(--border-main)'
        },
        roseBlush: {
          50: '#fdf8f6',
          100: '#faecea',
          200: '#f5d5d1',
          300: '#ebb4ad',
          400: '#dc8981',
          500: '#cc635a',
          600: '#b54841',
          700: '#973833',
        },
        dustyRose: {
          DEFAULT: '#d9778a',
          hover: '#c86377',
          light: '#fce7f3',
          dark: '#9d3b50',
          glow: 'rgba(217, 119, 138, 0.35)'
        },
        mindPink: {
          DEFAULT: '#d9778a',
          50: '#fdf8f6',
          100: '#faecea',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#d9778a',
          600: '#c86377',
          700: '#be185d',
          hover: '#c86377',
          light: '#fce7f3',
          glow: 'rgba(217, 119, 138, 0.35)'
        },
        mindCyan: {
          DEFAULT: '#d9778a',
          hover: '#c86377',
          light: '#fce7f3',
          glow: 'rgba(217, 119, 138, 0.35)'
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'floatReverse 5s ease-in-out infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 28s linear infinite',
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
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(217, 119, 138, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 24px rgba(217, 119, 138, 0.8))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
