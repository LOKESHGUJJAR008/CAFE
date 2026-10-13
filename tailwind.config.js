/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foam: '#FDF8FA',     // serene blush cream (clean, aesthetic, easy-to-read)
        ink: '#221220',      // deep aubergine charcoal (high-contrast, crystal-clear readability)
        latte: '#C48B9F',    // dusty rose / mauve quartz
        caramel: '#EA5C89',  // radiant blossom rose (signature Tatva pink from logo)
        almond: '#F3DFE7',   // pale blush silk
        plum: {
          DEFAULT: '#432A3B',
          dark: '#2D1827',
          deep: '#1E0E1B',
          light: '#5A3B50',
          velvet: '#382132',
        },
        tatva: {
          pink: '#EA5C89',
          blush: '#FCE7EE',
          mauve: '#C48B9F',
          wine: '#432A3B',
          night: '#221220',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        caveat: ['Caveat', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(34, 18, 32, 0.08), 0 1px 4px -1px rgba(234, 92, 137, 0.06)',
        'warm': '0 8px 24px -4px rgba(34, 18, 32, 0.12), 0 4px 12px -2px rgba(234, 92, 137, 0.08)',
        'warm-lg': '0 16px 36px -6px rgba(34, 18, 32, 0.16), 0 8px 20px -3px rgba(234, 92, 137, 0.12)',
        'glow-caramel': '0 0 25px rgba(234, 92, 137, 0.35)',
        'glow-rose': '0 0 30px rgba(234, 92, 137, 0.45)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
