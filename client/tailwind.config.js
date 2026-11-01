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
        mindCyan: {
          DEFAULT: '#00a8e8',
          hover: '#0090c7',
          light: '#38bdf8',
          glow: 'rgba(0, 168, 232, 0.25)'
        }
      }
    },
  },
  plugins: [],
}
