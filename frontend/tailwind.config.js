/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#0f172a',
        accent: '#f59e0b',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Amiri', 'serif'],
      }
    },
  },
  plugins: [],
}
