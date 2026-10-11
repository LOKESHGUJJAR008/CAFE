/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foam: '#FBF7F1',
        ink: '#1F1612',
        latte: '#C9A27E',
        caramel: '#A8612E',
        almond: '#EADBC8',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(31, 22, 18, 0.08), 0 1px 4px -1px rgba(168, 97, 46, 0.06)',
        'warm': '0 8px 24px -4px rgba(31, 22, 18, 0.12), 0 4px 12px -2px rgba(168, 97, 46, 0.08)',
        'warm-lg': '0 16px 36px -6px rgba(31, 22, 18, 0.16), 0 8px 20px -3px rgba(168, 97, 46, 0.12)',
        'glow-caramel': '0 0 25px rgba(168, 97, 46, 0.35)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
