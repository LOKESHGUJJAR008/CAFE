/**
 * src/config.js — Single source of truth for contact / social constants.
 * Change numbers here and they propagate everywhere automatically.
 */

export const WHATSAPP_NUMBER  = '+919876543210';           // digits only, with country code
export const PHONE_RAW        = '+919876543210';
export const PHONE_DISPLAY    = '+91 98765 43210';
export const WHATSAPP_MESSAGE = "Hi TATVA Café, I'd like to place an order.";
export const WHATSAPP_URL     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const CAFE_NAME        = 'TATVA Café';
export const CAFE_TAGLINE     = 'Artisan Coffee, Patisserie & Contemporary Lounge';
export const CAFE_ADDRESS     = 'Talwandi, Kota, Rajasthan – 324005';
export const CAFE_EMAIL       = 'hello@tatvacafe.in';
export const MAPS_LINK        = 'https://www.google.com/maps/search/?api=1&query=TATVA+Café+Talwandi+Kota';
export const INSTAGRAM        = 'https://instagram.com/tatvacafe';

/**
 * GOOGLE_REVIEW_URL — get it from Google Business Profile:
 *   1. Go to business.google.com → your business
 *   2. Click "Get more reviews" / "Share review form"
 *   3. Copy the short URL that appears and paste it here.
 * Leave as '' to hide all Google review buttons automatically.
 */
export const GOOGLE_REVIEW_URL = ''; // e.g. 'https://g.page/r/XXXXXXX/review'
export const GOOGLE_MAPS_URL   = 'https://www.google.com/maps/search/?api=1&query=TATVA+Café+Talwandi+Kota';

/**
 * HOURS — human-readable display strings used in UI.
 * Keep in sync with OPENING_HOURS below.
 */
export const HOURS = [
  { days: 'Mon – Thu', hours: '10:00 AM – 10:30 PM' },
  { days: 'Friday',    hours: '10:00 AM – 11:00 PM' },
  { days: 'Sat – Sun', hours: '9:00 AM  – 11:00 PM' },
];

/**
 * OPENING_HOURS — structured data used by useOpenStatus hook.
 * Times in 24h format (HH:MM), timezone Asia/Kolkata.
 * 0 = Sunday … 6 = Saturday (same as Date.getDay()).
 */
export const OPENING_HOURS = {
  0: { open: '09:00', close: '23:00' }, // Sunday
  1: { open: '10:00', close: '22:30' }, // Monday
  2: { open: '10:00', close: '22:30' }, // Tuesday
  3: { open: '10:00', close: '22:30' }, // Wednesday
  4: { open: '10:00', close: '22:30' }, // Thursday
  5: { open: '10:00', close: '23:00' }, // Friday
  6: { open: '09:00', close: '23:00' }, // Saturday
};

/**
 * OFFER_BAR_MESSAGE — set to an empty string '' to hide the bar.
 * One editable constant; change here to update everywhere.
 */
export const OFFER_BAR_MESSAGE = 'Student discount: 10% off on all orders with a valid ID 🎓';

/** Palette tokens — keep in sync with tailwind.config.js */
export const COLORS = {
  foam:    '#FBF7F1',
  ink:     '#1F1612',
  latte:   '#C9A27E',
  caramel: '#A8612E',
  almond:  '#EADBC8',
  espresso:'#2E1E14',
};

/** DEMO MODE */
export const DEMO_MODE = false;

if (DEMO_MODE && process.env.NODE_ENV === 'production') {
  console.warn("DEMO_MODE is true in production! Some content will appear as placeholders.");
}

export const PLACEHOLDERS = [
  'contact details',
  'prices',
  'diet labels',
  'photos',
  'reviews'
];

export const VERIFIED_STATS = {}; // Empty by default for demo mode

/**
 * ANIMATION — Centralized animation tokens for consistent motion design.
 * All durations in seconds. Easings as cubic-bezier arrays or spring configs.
 */
export const ANIMATION = {
  // Durations
  instant: 0.08,
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  slower: 0.6,
  page: 0.5,
  stagger: 0.08,

  // Easings
  ease: [0.22, 1, 0.36, 1],
  easeOut: [0, 0.55, 0.45, 1],
  easeSpring: { type: 'spring', stiffness: 300, damping: 24 },
  easeSpringSoft: { type: 'spring', stiffness: 200, damping: 20 },

  // Reduced motion tiers
  reducedMotion: {
    full: { duration: 0 },
    minimal: { duration: 0.01 },
    none: { duration: 0.01 },
  },
};
