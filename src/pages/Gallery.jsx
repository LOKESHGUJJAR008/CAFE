import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Lightbox from '../components/Lightbox';
import { getImage } from '../data/images';

/**
 * Gallery images — swap src URLs for your own CDN / local imports.
 * The grid uses CSS grid areas for an asymmetric masonry feel.
 */
const IMAGES = [
  { id: 1, label: 'Morning Ritual',    url: getImage('latteArt'), span: 'lg:col-span-2 lg:row-span-2' },
  { id: 2, label: 'Our Space',         url: getImage('interior'), span: 'lg:col-span-1 lg:row-span-1' },
  { id: 3, label: 'Latte Art',         url: getImage('latteArt'), span: 'lg:col-span-1 lg:row-span-1' },
  { id: 4, label: 'Cold Brew Station', url: getImage('icedCoffee'), span: 'lg:col-span-1 lg:row-span-1' },
  { id: 5, label: 'Study Corner',      url: getImage('seating'), span: 'lg:col-span-1 lg:row-span-1' },
  { id: 6, label: 'Beans & Roasts',    url: getImage('chocolatePastry'), span: 'lg:col-span-2 lg:row-span-1' },
  { id: 7, label: 'Dessert Plate',     url: getImage('blueberryCheesecake'), span: 'lg:col-span-1 lg:row-span-1' },
  { id: 8, label: 'Evening Mood',      url: getImage('barista'), span: 'lg:col-span-1 lg:row-span-1' },
  { id: 9, label: 'Pour Over',         url: getImage('walnutBrownie'), span: 'lg:col-span-1 lg:row-span-1' },
];

const GalleryPage = () => {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => setLightboxIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  const handleNext = () => setLightboxIndex((prev) => (prev + 1) % IMAGES.length);

  return (
  <div className="bg-foam text-ink min-h-screen">
    {/* Banner */}
    <section className="bg-ink text-foam py-24 px-6 sm:px-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,97,46,0.15)_0%,transparent_70%)] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative max-w-2xl mx-auto"
      >
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-caramel bg-caramel/10 border border-caramel/25 px-4 py-1.5 rounded-full mb-6">
          Gallery
        </span>
        <h1 className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-foam leading-tight mb-4">
          Moments at<br />
          <span className="text-caramel italic font-normal">TATVA</span>
        </h1>
        <p className="text-almond/75 text-base sm:text-lg">
          A glimpse into the warmth, craft and community of our space.
        </p>
      </motion.div>
    </section>

    {/* Masonry grid */}
    <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto px-4 columns-2 md:columns-3 lg:columns-4 gap-4">
        {IMAGES.map((img, i) => (
          <motion.article
            key={img.id}
            initial={{ opacity: 0.001 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: Math.min(i * 0.06, 0.3) }}
            onClick={() => openLightbox(i)}
            className="mb-4 break-inside-avoid relative rounded-2xl overflow-hidden shadow-warm-sm group cursor-pointer cursor-zoom-in inline-block w-full"
          >
            <img
              src={img.url}
              alt={img.label}
              className="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              loading={i < 3 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent
                            flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-foam text-xs sm:text-sm font-semibold">{img.label}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-almond py-16 md:py-24 px-6 sm:px-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-ink mb-4">
          Ready to experience it live?
        </h2>
        <p className="text-ink/70 mb-8 max-w-md mx-auto">Visit us in Talwandi, Kota and let us brew you something beautiful.</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-caramel hover:bg-caramel/90
                     text-foam font-semibold tracking-wide shadow-warm transition-all transform hover:-translate-y-0.5"
        >
          Find Us <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>

    <Lightbox
      isOpen={lightboxOpen}
      currentIndex={lightboxIndex}
      images={IMAGES}
      onClose={() => setLightboxOpen(false)}
      onPrev={handlePrev}
      onNext={handleNext}
    />
  </div>
  );
};

export default GalleryPage;
