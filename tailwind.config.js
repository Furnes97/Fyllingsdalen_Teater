/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theater: {
          primary: '#1a1a1a', // Dark background
          accent: '#c0a062', // Gold/brass accent
          light: '#f4f4f5', // Off-white text
          muted: '#a1a1aa',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'], // I'll need to import this google font
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

