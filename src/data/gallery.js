import g1 from '../assets/images/gallery-1.svg';
import g2 from '../assets/images/gallery-2.svg';
import g3 from '../assets/images/gallery-3.svg';
import g4 from '../assets/images/gallery-4.svg';
import g5 from '../assets/images/gallery-5.svg';
import g6 from '../assets/images/gallery-6.svg';

export const galleryData = {
  badge: "Visual Diary",
  title: "Moments Captured At Royal Bean",
  subtitle: "A glimpse into our daily craft, aesthetic corners, and shared coffee memories.",
  categories: ["All", "Coffee Craft", "Ambiance", "Artisan Food"],
  items: [
    {
      id: "gallery-1",
      title: "Precision V60 Pour-Over Brew",
      category: "Coffee Craft",
      span: "md:col-span-2 md:row-span-2",
      image: g1,
      alt: "Barista preparing a manual V60 drip pour over"
    },
    {
      id: "gallery-2",
      title: "Signature Swan Latte Art",
      category: "Coffee Craft",
      span: "md:col-span-1 md:row-span-1",
      image: g2,
      alt: "Delicate swan latte art on velvety flat white"
    },
    {
      id: "gallery-3",
      title: "Cozy Study & Reading Booth",
      category: "Ambiance",
      span: "md:col-span-1 md:row-span-1",
      image: g3,
      alt: "Warm wooden table with book and coffee cup in ambient light"
    },
    {
      id: "gallery-4",
      title: "Flaky Golden Croissants & Tarts",
      category: "Artisan Food",
      span: "md:col-span-1 md:row-span-1",
      image: g4,
      alt: "Freshly baked artisan butter croissants and fruit tarts"
    },
    {
      id: "gallery-5",
      title: "Rich Dark Crema Espresso Flow",
      category: "Coffee Craft",
      span: "md:col-span-1 md:row-span-1",
      image: g5,
      alt: "Double shot espresso extracting through portafilter"
    },
    {
      id: "gallery-6",
      title: "Evening Amber Glow & Outdoor Deck",
      category: "Ambiance",
      span: "md:col-span-2 md:row-span-1",
      image: g6,
      alt: "Warm fairy lights and comfortable café seating at dusk"
    }
  ]
};

export default galleryData;
