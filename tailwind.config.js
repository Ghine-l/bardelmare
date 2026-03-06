/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand:    { DEFAULT: '#1a1610', light: '#252018', mid: '#2e2820', surface: '#342f26' },
        wave:    { DEFAULT: '#2563eb', bright: '#3b82f6', pale: '#93c5fd', dark: '#1d4ed8' },
        sun:     '#f59e0b',
        foam:    '#e8f0fe',
        salt:    '#f0ede8',
      },
      fontFamily: {
        poster:  ['"Barlow Condensed"', 'sans-serif'],
        body:    ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.7s cubic-bezier(.16,1,.3,1) forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'wave-drift': 'waveDrift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(28px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        waveDrift: { '0%,100%': { transform: 'translateX(0)' }, '50%': { transform: 'translateX(-3%)' } },
      },
    },
  },
  plugins: [],
}
