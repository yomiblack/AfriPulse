// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // class strategy — you toggle dark by adding class="dark" to <html>
  // darkMode: 'media', // media strategy — respects system appearance preferences
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf6ee',
          100: '#fae9d4',
          200: '#f4d0a4',
          300: '#ecb06a',
          400: '#e58a33',
          500: '#df6d18', // primary — pan-African gold
          600: '#d05a12',
          700: '#ac4410',
          800: '#8b3715',
          900: '#712f15',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8f7f4',
          dark: '#0f1117',
          'dark-muted': '#1a1d27',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
