/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#241812',
          dark: '#18100C',
          light: '#36241B',
        },
        roast: {
          DEFAULT: '#5A3825',
          dark: '#452A1C',
          light: '#70462F',
        },
        cream: {
          DEFAULT: '#F5EBDD',
          light: '#FAF5EE',
          dark: '#EBDCC8',
        },
        caramel: {
          DEFAULT: '#C58B4E',
          light: '#D79F64',
          dark: '#AD7437',
        },
        beige: {
          DEFAULT: '#D8C3A5',
          light: '#E5D6C1',
          dark: '#C7AE8C',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(36, 24, 18, 0.08), 0 1px 4px -1px rgba(197, 139, 78, 0.06)',
        'warm': '0 8px 24px -4px rgba(36, 24, 18, 0.12), 0 4px 12px -2px rgba(197, 139, 78, 0.08)',
        'warm-lg': '0 16px 36px -6px rgba(36, 24, 18, 0.16), 0 8px 20px -3px rgba(197, 139, 78, 0.12)',
        'glow-caramel': '0 0 25px rgba(197, 139, 78, 0.35)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
