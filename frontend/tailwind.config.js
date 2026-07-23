/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b91c1c',
        'primary-hover': '#dc2626',
        dark: '#111111',
        darkgray: '#1a1a1a',
        cardgray: '#222222',
      },
      fontFamily: {
        heading: ['Sora', 'Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        space: ['Sora', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}