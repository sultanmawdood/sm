/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#131619',
        secondary: '#2a2d31',
        accent: '#00ff88',
        light: '#f8f9fa',
        dark: '#131619',
        'dark-lighter': '#1a1d21',
        'dark-hover': '#1f2328',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
