/**
 * src/data/moods.js
 * "Find Your Coffee Mood" experience data.
 * 
 * Visual treatments strictly utilize the Tatva brand palette tokens:
 * - foam (#FBF7F1)
 * - ink (#1F1612)
 * - latte (#C9A27E)
 * - caramel (#A8612E)
 * - almond (#EADBC8)
 */

export const moods = [
  {
    id: 'slow-mornings',
    title: 'Slow Mornings',
    caption: 'A slower start. A better day.',
    description: 'Gentle morning rays, unhurried pour-overs, and calm corners to ease into your day before the world rushes in.',
    featuredImage: {
      src: '/images/hero.webp',
      alt: 'Artisanal cappuccino with heart latte art and fresh golden croissant in morning sunlight',
      caption: 'The morning ritual: freshly poured latte art and a warm croissant',
    },
    galleryImages: [
      {
        src: '/images/hero.webp',
        alt: 'Croissant and artisan coffee cup on wooden table in morning sun',
        caption: 'First light over breakfast: delicate crema and flaky pastry',
      },
      {
        src: '/images/gallery/cafe-3.webp',
        alt: 'Rattan pendant lamps and lush vines by sunlit daylight window',
        caption: 'Tranquil natural light filtering through botanical canopies',
      },
      {
        src: '/images/gallery/cafe-7.webp',
        alt: 'Calm window seating overlooking outdoor garden corner',
        caption: 'A quiet window nook to gather your thoughts',
      },
      {
        src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
        alt: 'Steaming hand-poured coffee in morning rays',
        caption: 'Handcrafted single-origin brew to start the morning right (placeholder)',
      },
      {
        src: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
        alt: 'Quiet cafe reading nook with journal and hot cup',
        caption: 'Peaceful reading hours with your favorite cup (placeholder)',
      },
    ],
    visualTreatment: {
      bgTint: '#FBF7F1',       // foam
      accentColor: '#A8612E',  // caramel
      textColor: '#1F1612',    // ink
      secondaryColor: '#C9A27E', // latte
      panelBg: '#EADBC8',      // almond
      badgeBg: 'rgba(234, 219, 200, 0.6)',
      cardBorder: 'rgba(201, 162, 126, 0.35)',
    },
  },
  {
    id: 'coffee-conversations',
    title: 'Coffee & Conversations',
    caption: 'Good coffee. Better company.',
    description: 'Shared plates, aromatic cups passed across the table, and endless stories that flow when friends gather.',
    featuredImage: {
      src: '/images/gallery/cafe-5.webp',
      alt: 'Table filled with fresh pizza, french fries, and chilled frappés for friends',
      caption: 'Shared table moments: hot pizza, crunchy bites, and chilled coffees',
    },
    galleryImages: [
      {
        src: '/images/gallery/cafe-5.webp',
        alt: 'Crispy fries, gourmet pizza, and iced coffee drinks on wooden table',
        caption: 'Lively lunch table spread with friends at TATVA',
      },
      {
        src: '/images/gallery/cafe-4.webp',
        alt: 'Bright and open café floor with group seating and bistro tables',
        caption: 'Spacious seating curated for lively gatherings and shared smiles',
      },
      {
        src: '/images/gallery/cafe-2.webp',
        alt: 'Framed typography art celebrating coffee, smiles, and laughter',
        caption: 'Walls echoing the warmth: coffee, smiles, and good company',
      },
      {
        src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80',
        alt: 'Friends laughing and toasting coffee cups over brunch',
        caption: 'Laughter and rich espresso shared between friends (placeholder)',
      },
      {
        src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80',
        alt: 'Two hands reaching across a cafe table with warm lattes',
        caption: 'Unforgettable catch-ups over warm mugs (placeholder)',
      },
    ],
    visualTreatment: {
      bgTint: '#EADBC8',       // almond
      accentColor: '#A8612E',  // caramel
      textColor: '#1F1612',    // ink
      secondaryColor: '#C9A27E', // latte
      panelBg: '#FBF7F1',      // foam
      badgeBg: 'rgba(251, 247, 241, 0.7)',
      cardBorder: 'rgba(201, 162, 126, 0.4)',
    },
  },
  {
    id: 'sweet-cravings',
    title: 'Sweet Cravings',
    caption: 'Save room for something sweet.',
    description: 'Freshly baked flaky pastries, melt-in-the-mouth chocolate creations, and artisan desserts crafted to pair with dark roasts.',
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
      alt: 'Artisanal golden pastries and sweet bakery treats displayed fresh',
      caption: 'Warm from the oven: handcrafted pastries and sweet delicacies (placeholder)',
    },
    galleryImages: [
      {
        src: '/images/hero.webp',
        alt: 'Golden flaky butter croissant beside creamy cappuccino',
        caption: 'Flaky layers baked to perfection with a hint of butter',
      },
      {
        src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
        alt: 'Rich chocolate walnut fudge brownie with dark chocolate drizzle',
        caption: 'Decadent chocolate brownie with a rich fudge center (placeholder)',
      },
      {
        src: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=80',
        alt: 'Creamy blueberry cheesecake slice garnished with fresh berries',
        caption: 'Silky cheesecake with a tangy berry compote finish (placeholder)',
      },
      {
        src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
        alt: 'Delicate handcrafted confection and dessert plate',
        caption: 'Artisan patisserie creations made fresh daily (placeholder)',
      },
    ],
    visualTreatment: {
      bgTint: '#FBF7F1',       // foam
      accentColor: '#A8612E',  // caramel
      textColor: '#1F1612',    // ink
      secondaryColor: '#C9A27E', // latte
      panelBg: '#EADBC8',      // almond
      badgeBg: 'rgba(234, 219, 200, 0.65)',
      cardBorder: 'rgba(201, 162, 126, 0.35)',
    },
  },
  {
    id: 'late-night',
    title: 'Late Night Vibes',
    caption: 'Stay a little longer.',
    description: 'Amber pendant glows, quiet evening jazz, intense dark roasts, and unhurried conversations long after sunset.',
    featuredImage: {
      src: '/images/gallery/cafe-6.webp',
      alt: 'Evening café ceiling with glowing orb lamps nestled in creeping green vines',
      caption: 'Evening warmth: soft suspended orb lights and nighttime greenery',
    },
    galleryImages: [
      {
        src: '/images/gallery/cafe-6.webp',
        alt: 'Illuminated orb lights glowing in twilight suspended from ceiling foliage',
        caption: 'Soft ambient illumination under the evening vines',
      },
      {
        src: '/images/gallery/cafe-1.webp',
        alt: 'Intimate dinner booth seating under focused warm metallic pendant lamps',
        caption: 'Warm, secluded booths for calm after-hours conversations',
      },
      {
        src: '/images/gallery/cafe-2.webp',
        alt: 'Warm lighting casting soft shadows over brick wall artwork',
        caption: 'Moody reflections on brick and brass as the night settles',
      },
      {
        src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
        alt: 'Warm amber glow inside cafe after hours',
        caption: 'Atmospheric evening seating in golden amber light (placeholder)',
      },
      {
        src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
        alt: 'Rich late night espresso extraction into ceramic cup',
        caption: 'A quiet late-evening double shot with thick crema (placeholder)',
      },
    ],
    visualTreatment: {
      bgTint: '#1F1612',       // ink
      accentColor: '#C9A27E',  // latte
      textColor: '#FBF7F1',    // foam
      secondaryColor: '#A8612E', // caramel
      panelBg: '#1F1612',      // ink
      badgeBg: 'rgba(201, 162, 126, 0.2)',
      cardBorder: 'rgba(201, 162, 126, 0.25)',
    },
  },
];

export default moods;
