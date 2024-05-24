/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-light': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'custom-neumorphism': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
      },
      ringWidth: {
        '3': '3px',
      },
      ringColor: {
        'custom-blue': '#3b82f6',
      },
    },
  },
  plugins: [],
}