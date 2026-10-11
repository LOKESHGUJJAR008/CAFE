import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Lightbox from '../Lightbox';
import { getImage } from '../../data/images';

/**
 * Gallery image URLs — swap these for real CDN URLs or local imports.
 * Sizes follow the grid spans so images arrive pre-cropped correctly.
 */
const GALLERY_IMAGES = [
  { id: 1, label: 'Morning Pour',       span: 'col-span-2 row-span-2', url: getImage('interior') },
  { id: 2, label: 'The Space',          span: 'col-span-1 row-span-1', url: getImage('seating') },
  { id: 3, label: 'Latte Art',          span: 'col-span-1 row-span-1', url: getImage('latteArt') },
  { id: 4, label: 'Cold Brew Counter',  span: 'col-span-1 row-span-1', url: getImage('icedCoffee') },
  { id: 5, label: 'Study Corner',       span: 'col-span-1 row-span-1', url: getImage('barista') },
];

export const GalleryTeaser = () => {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => setLightboxIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  const handleNext = () => setLightboxIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);

  return (
  <section id="gallery" className="bg-foam py-20 sm:py-24 px-6 sm:px-10 lg:px-12 relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14"
      >
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-2 font-inter">
            Visual Diary
          </span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
            Moments at Royal Bean
          </h2>
        </div>
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-6 py-2.5 rounded-full
                     border border-latte text-ink hover:bg-latte hover:text-foam
                     text-xs sm:text-sm font-semibold tracking-wide
                     transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
        >
          <span>View Gallery</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Asymmetrical grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[240px] gap-4 sm:gap-5">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.article
            key={img.id}
            initial={{ opacity: 0.001 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.07 }}
            onClick={() => openLightbox(i)}
            className={`${img.span} relative rounded-2xl overflow-hidden shadow-warm-sm group cursor-pointer cursor-zoom-in`}
          >
            <img
              src={img.url}
              alt={img.label}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              loading="lazy"
            />
            {/* Caption overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent
                            flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-foam text-xs sm:text-sm font-semibold tracking-wide">{img.label}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
    
    <Lightbox
      isOpen={lightboxOpen}
      currentIndex={lightboxIndex}
      images={GALLERY_IMAGES}
      onClose={() => setLightboxOpen(false)}
      onPrev={handlePrev}
      onNext={handleNext}
    />
  </section>
  );
};

export default GalleryTeaser;
