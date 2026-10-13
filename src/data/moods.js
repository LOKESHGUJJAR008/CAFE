/**
 * src/data/moods.js
 * "Find Your Coffee Mood" experience data.
 * 
 * Uses real images imported from src/assets/images/gallery via Vite static imports.
 * Palette compliance:
 * - foam (#FBF7F1)
 * - ink (#1F1612)
 * - latte (#C9A27E)
 * - caramel (#A8612E)
 * - almond (#EADBC8)
 */

import heroLatteCroissant from '../assets/images/gallery/hero/hero-latte-croissant.png';
import slowMornings01 from '../assets/images/gallery/slow-mornings/01-marble-latte-croissant.png';
import slowMornings02 from '../assets/images/gallery/slow-mornings/02-sunlit-wooden-table.png';
import slowMornings03 from '../assets/images/gallery/slow-mornings/03-latte-heart-croissant.png';
import sweetCravings01 from '../assets/images/gallery/sweet-cravings/01-dessert-espresso-terracotta.png';
import sweetCravings02 from '../assets/images/gallery/sweet-cravings/02-topview-dessert-latte.png';
import lateNight01 from '../assets/images/gallery/late-night/01-lamp-steam-book.png';
import lateNight02 from '../assets/images/gallery/late-night/02-candle-string-lights.png';
import coffeeConversations01 from '../assets/images/gallery/coffee-conversations/01-barista-pouring.png';

export const heroImage = {
  src: heroLatteCroissant,
  alt: 'Heart latte art in a ceramic cup beside a freshly baked flaky croissant on a sunlit wooden counter',
  caption: 'Morning light over freshly poured latte art and a golden, flaky croissant',
  objectPosition: 'center',
};

export const moods = [
  {
    id: 'slow-mornings',
    title: 'Slow Mornings',
    caption: 'A slower start. A better day.',
    description: 'Gentle morning rays, unhurried pour-overs, and calm corners to ease into your day before the world rushes in.',
    featuredImage: {
      src: slowMornings01,
      alt: 'Tulip latte art in a speckled cup and butter croissant on a round marble bistro table with dried flowers',
      caption: 'Tulip latte art and warm butter croissant on marble, bathed in early morning sun',
      handwrittenNote: 'first morning pour & warm flaky layers ♡',
      rotation: -2.8,
      filmDate: '12 · 10 · 26',
      tapeType: 'washi-latte',
      objectPosition: 'center',
    },
    galleryImages: [
      {
        src: slowMornings01,
        alt: 'Tulip latte art in a speckled cup and butter croissant on a round marble bistro table with dried flowers',
        caption: 'Tulip latte art and warm butter croissant on marble, bathed in early morning sun',
        handwrittenNote: 'first morning pour & warm flaky layers ♡',
        rotation: -2.8,
        filmDate: '12 · 10 · 26',
        tapeType: 'washi-latte',
        objectPosition: 'center',
      },
      {
        src: slowMornings02,
        alt: 'Minimalist round wooden table with powdered sugar mini cake, black coffee cup, and dried florals in sunlight',
        caption: 'Quiet sunlit corner with freshly baked mini cake and single-origin brew',
        handwrittenNote: 'quiet sunlit corner with single origin',
        rotation: 4.2,
        filmDate: '08 · 10 · 26',
        tapeType: 'paperclip',
        objectPosition: 'center',
      },
      {
        src: slowMornings03,
        alt: 'Silky heart latte art in white ceramic mug beside a golden breakfast croissant on rustic timber sill',
        caption: 'Handcrafted heart foam and golden croissant by the morning window',
        handwrittenNote: 'warm ceramic mug on rustic sill',
        rotation: -4.5,
        filmDate: '15 · 10 · 26',
        tapeType: 'corner-tape',
        objectPosition: 'center',
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
    recommendationTitle: 'Pair your morning with…',
    recommendationSubtitle: 'Freshly pulled espresso & morning bites to gently awaken your senses',
    recommendedSlugs: ['cappuccino-royal', 'avocado-toast', 'cafe-latte'],
  },
  {
    id: 'coffee-conversations',
    title: 'Coffee & Conversations',
    caption: 'Good coffee. Better company.',
    description: 'Shared plates, aromatic cups passed across the table, and endless stories that flow when friends gather.',
    featuredImage: {
      src: coffeeConversations01,
      alt: 'Barista pouring steamed milk for latte art behind an illuminated wooden espresso bar with patrons chatting in the background',
      caption: 'The barista’s craft: pouring fresh latte art amidst the gentle buzz of conversation',
      handwrittenNote: 'gentle hum of conversation & steam',
      rotation: 3.2,
      filmDate: '11 · 10 · 26',
      tapeType: 'washi-caramel',
      objectPosition: '35% 50%',
    },
    galleryImages: [
      {
        src: coffeeConversations01,
        alt: 'Barista pouring steamed milk for latte art behind an illuminated wooden espresso bar with patrons chatting in the background',
        caption: 'The barista’s craft: pouring fresh latte art amidst the gentle buzz of conversation',
        handwrittenNote: 'gentle hum of conversation & steam',
        rotation: 3.2,
        filmDate: '11 · 10 · 26',
        tapeType: 'washi-caramel',
        objectPosition: '35% 50%',
      },
      {
        src: slowMornings02,
        alt: 'Shared round bistro table with cups and plates',
        caption: 'Table for friends & shared moments',
        handwrittenNote: 'two cups passed across the timber',
        rotation: -3.6,
        filmDate: '09 · 10 · 26',
        tapeType: 'washi-latte',
        objectPosition: 'center',
      },
      {
        src: lateNight02,
        alt: 'Warm amber lights and cozy wooden seating',
        caption: 'Amber lights across the café lounge',
        handwrittenNote: 'hours flying by with good company',
        rotation: 4.4,
        filmDate: '16 · 10 · 26',
        tapeType: 'paperclip',
        objectPosition: 'center',
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
    recommendationTitle: 'Order for the table',
    recommendationSubtitle: 'Savory shareables & chilled brews crafted to pass around with friends',
    recommendedSlugs: ['paneer-tikka-sandwich', 'classic-french-fries', 'classic-iced-latte'],
  },
  {
    id: 'sweet-cravings',
    title: 'Sweet Cravings',
    caption: 'Save room for something sweet.',
    description: 'Freshly baked flaky pastries, melt-in-the-mouth chocolate creations, and artisan desserts crafted to pair with dark roasts.',
    featuredImage: {
      src: sweetCravings01,
      alt: 'Artisan panna cotta mousse dessert with almond tuile wafer, dark chocolate glaze, and hot espresso on terracotta linen',
      caption: 'Velvety dessert with crisp almond tuile and hot espresso on warm terracotta',
      handwrittenNote: 'melt-in-mouth dark ganache & espresso',
      rotation: -3.5,
      filmDate: '10 · 10 · 26',
      tapeType: 'washi-caramel',
      objectPosition: 'center',
    },
    galleryImages: [
      {
        src: sweetCravings01,
        alt: 'Artisan panna cotta mousse dessert with almond tuile wafer, dark chocolate glaze, and hot espresso on terracotta linen',
        caption: 'Velvety dessert with crisp almond tuile and hot espresso on warm terracotta',
        handwrittenNote: 'melt-in-mouth dark ganache & espresso',
        rotation: -3.5,
        filmDate: '10 · 10 · 26',
        tapeType: 'washi-caramel',
        objectPosition: 'center',
      },
      {
        src: sweetCravings02,
        alt: 'Top-down view of piped hazelnut meringue confection with powdered sugar paired with a heart latte on a bistro table',
        caption: 'Piped hazelnut dessert and velvety latte art seen from above',
        handwrittenNote: 'save room for something sweet ✨',
        rotation: 4.0,
        filmDate: '13 · 10 · 26',
        tapeType: 'corner-tape',
        objectPosition: 'center',
      },
      {
        src: slowMornings03,
        alt: 'Freshly baked artisan golden croissant by the morning window',
        caption: 'Flaky layers fresh from the stone oven',
        handwrittenNote: 'crisp golden pastry crumbs',
        rotation: -5.2,
        filmDate: '07 · 10 · 26',
        tapeType: 'washi-latte',
        objectPosition: 'center',
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
    recommendationTitle: 'Something sweet for you',
    recommendationSubtitle: 'Artisanal confections & decadent bakes whipped to satisfy your sweet tooth',
    recommendedSlugs: ['belgian-chocolate-truffle-cake', 'blueberry-cheesecake', 'warm-walnut-brownie'],
  },
  {
    id: 'late-night',
    title: 'Late Night Vibes',
    caption: 'Stay a little longer.',
    description: 'Amber pendant glows, quiet evening jazz, intense dark roasts, and unhurried conversations long after sunset.',
    featuredImage: {
      src: lateNight01,
      alt: 'Steaming coffee cup and pastry beside a glowing cordless brass lamp and open book in an evening cafe',
      caption: 'A glowing table lamp, rising coffee steam, and quiet late-night reading',
      handwrittenNote: 'cordless brass glow & dark roast study',
      rotation: 3.6,
      filmDate: '14 · 10 · 26',
      tapeType: 'paperclip',
      objectPosition: 'center',
    },
    galleryImages: [
      {
        src: lateNight01,
        alt: 'Steaming coffee cup and pastry semi-silhouette beside a glowing brass lamp and open book in an evening cafe',
        caption: 'A glowing table lamp, rising coffee steam, and quiet late-night reading',
        handwrittenNote: 'cordless brass glow & dark roast study',
        rotation: 3.6,
        filmDate: '14 · 10 · 26',
        tapeType: 'paperclip',
        objectPosition: 'center',
      },
      {
        src: lateNight02,
        alt: 'Cozy twilight cafe interior with glowing Edison string lights and candlelit wooden tables set with coffee cups',
        caption: 'Amber string lights and flickering candle glow across wooden bistro tables',
        handwrittenNote: 'amber string lights after hours',
        rotation: -4.2,
        filmDate: '17 · 10 · 26',
        tapeType: 'washi-latte',
        objectPosition: 'center',
      },
      {
        src: coffeeConversations01,
        alt: 'Late espresso pull behind the dark timber bar with ambient glow',
        caption: 'Midnight espresso pull at the bar',
        handwrittenNote: 'midnight single-origin espresso',
        rotation: 2.5,
        filmDate: '12 · 10 · 26',
        tapeType: 'corner-tape',
        objectPosition: '35% 50%',
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
    recommendationTitle: 'For the late hours',
    recommendationSubtitle: 'Deep roasts & warm savory bites to keep you company into the night',
    recommendedSlugs: ['espresso-solo', 'cheese-corn-nuggets', 'flat-white'],
  },
];

export default moods;
