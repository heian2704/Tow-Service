// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // Adjust these paths according to where your components are
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',   // Example of custom color
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],  // Example of custom font family
      },
    },
  },
  plugins: [],
}
