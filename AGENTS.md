# Royal Bean Café website: rules for any AI agent

## Stack
Vite + React + Tailwind + React Router + framer-motion + lucide-react. Do not add new dependencies without asking.

## Palette (use ONLY these tokens, no other hex values)
foam #FBF7F1 (background) · ink #1F1612 (text, dark sections) · latte #C9A27E (borders, secondary) · caramel #A8612E (accent, CTA) · almond #EADBC8 (soft panels)
Fonts: Playfair Display for headings, Inter for body.

## Structure
- Pages in src/pages, home sections in src/components/home
- Menu data only in src/data/menu.js; image slots in src/data/images.js
- WhatsApp number, phone, hours, address, maps link ONLY in src/config.js (never hard-code)

## Rules
- Do not invent facts: no ratings, review counts, guest numbers, years or awards. Reviews and contact details are demo placeholders (DEMO_MODE).
- Diet marker per dish: veg / egg / nonveg / unconfirmed. Unconfirmed items never appear under "Veg only".
- Animations: use the shared EASE [0.22, 1, 0.36, 1], animate only transform and opacity, never leave content stuck at opacity 0, respect prefers-reduced-motion.
- Fully responsive (390, 768, 1280, 1920px), no horizontal overflow, accessible labels and focus rings.
- Change only what is asked. Run `npm run build` and `npm run lint` before finishing and list the changed files.