/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foam: '#FBF7F1',     // pristine warm alabaster / cream
        ink: '#1F1612',      // deep roasted espresso charcoal
        latte: '#C9A27E',    // warm cafe au lait / soft hazelnut taupe
        caramel: '#A8612E',  // artisan roasted warm amber caramel
        almond: '#EADBC8',   // delicate warm oat / linen almond
        espresso: {
          DEFAULT: '#1F1612',
          dark: '#140E0B',
          deep: '#0D0907',
          light: '#2E1E14',
          roast: '#3A2518',
        },
        tatva: {
          caramel: '#A8612E',
          latte: '#C9A27E',
          almond: '#EADBC8',
          espresso: '#1F1612',
          cream: '#FBF7F1',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        inter: ['Inter', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        caveat: ['Caveat', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(31, 22, 18, 0.08), 0 1px 4px -1px rgba(168, 97, 46, 0.06)',
        'warm': '0 8px 24px -4px rgba(31, 22, 18, 0.12), 0 4px 12px -2px rgba(168, 97, 46, 0.08)',
        'warm-lg': '0 16px 36px -6px rgba(31, 22, 18, 0.16), 0 8px 20px -3px rgba(168, 97, 46, 0.12)',
        'glow-caramel': '0 0 25px rgba(168, 97, 46, 0.35)',
        'glow-amber': '0 0 30px rgba(168, 97, 46, 0.45)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
