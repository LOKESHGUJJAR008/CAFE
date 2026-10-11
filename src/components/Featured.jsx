import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Coffee,
  CupSoda,
  CakeSlice,
  Croissant,
  ArrowRight,
  Plus
} from 'lucide-react';
import { featuredData } from '../data/featured';
import { getSpecialImage } from '../lib/homeImages';

/**
 * Fallback configuration for each of the 5 Royal Bean Specials:
 * Uses warm palette gradient pairs, centered low-opacity Lucide icon,
 * and fine caramel arch outline.
 */
const fallbackConfigs = [
  { gradient: 'from-ink to-latte',    icon: Coffee   },
  { gradient: 'from-latte to-caramel', icon: CupSoda  },
  { gradient: 'from-caramel to-latte', icon: CakeSlice },
  { gradient: 'from-ink to-caramel',   icon: CakeSlice },
  { gradient: 'from-latte to-caramel', icon: Croissant },
];

export const Specials = () => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Track active card for mobile dot indicators
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, offsetWidth } = scrollContainerRef.current;
    if (offsetWidth > 0) {
      // Card width on mobile is ~72vw + gap
      const cardWidth = offsetWidth * 0.72;
      const index = Math.round(scrollLeft / (cardWidth + 16));
      setActiveIndex(Math.min(Math.max(index, 0), featuredData.items.length - 1));
    }
  };

  const scrollToCard = (idx) => {
    if (!scrollContainerRef.current) return;
    const card = scrollContainerRef.current.children[idx];
    if (card) {
      card.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setActiveIndex(idx);
    }
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0.1 }
        : { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="specials"
      className="bg-almond py-20 sm:py-24 px-6 sm:px-10 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header Row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-2 font-inter">
              {featuredData.eyebrow}
            </span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
              {featuredData.title}
            </h2>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 self-start sm:self-auto px-6 py-2.5 rounded-full border border-ink/30 text-ink hover:bg-ink hover:text-foam text-xs sm:text-sm font-semibold tracking-wide transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 text-ink group-hover:text-foam group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* ── Cards Row: 5 cols on Desktop (>=1280px), snap-row on Tablet/Laptop, swipe carousel on Mobile ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 gap-5 xl:grid xl:grid-cols-5 xl:gap-5 xl:overflow-visible xl:pb-0"
        >
          {featuredData.items.map((item, idx) => {
            const imageSrc = getSpecialImage(item.slug);
            const fallback = fallbackConfigs[idx % fallbackConfigs.length];
            const FallbackIcon = fallback.icon;

            return (
              <motion.article
                key={item.id}
                variants={itemVariants}
                className="group relative bg-almond aspect-[3/4] w-[72vw] sm:w-[42vw] lg:w-[calc((100%-2.5rem)/3.2)] xl:w-auto flex-shrink-0 xl:flex-shrink rounded-2xl overflow-hidden shadow-warm-sm hover:shadow-warm transition-all duration-300 snap-center [@media(hover:hover)]:hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-caramel"
              >
                {/* ── Image Slot or Fallback ── */}
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={item.name}
                    width={320}
                    height={427}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.06]"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${fallback.gradient} relative overflow-hidden flex items-center justify-center transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.06]`}
                  >
                    {/* Centered Large Low-Opacity Lucide Icon */}
                    <FallbackIcon
                      className="w-24 h-24 sm:w-28 sm:h-28 text-foam/15 absolute inset-0 m-auto pointer-events-none"
                      strokeWidth={1.2}
                      aria-hidden="true"
                    />

                    {/* Fine Caramel Arch Outline */}
                    <svg
                      className="absolute inset-4 sm:inset-5 w-[calc(100%-2rem)] sm:w-[calc(100%-2.5rem)] h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)] pointer-events-none"
                      viewBox="0 0 100 133"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M 6 128 V 50 C 6 22, 94 22, 94 50 V 128"
                        stroke="#A8612E"
                        strokeWidth="1.2"
                        strokeOpacity="0.45"
                      />
                    </svg>
                  </div>
                )}

                {/* ── Bottom Overlay: gradient espresso/90 to transparent ── */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-transparent flex flex-col justify-end p-5 sm:p-6 text-foam pointer-events-none">
                  {/* Category label: small caps, cream/70 */}
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foam/70 font-inter">
                    {item.category}
                  </span>

                  {/* Name: Playfair, cream, about 20px */}
                  <h3 className="font-playfair text-[19px] sm:text-[20px] font-bold text-foam leading-tight mt-1 line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Description: cream/80, 2 lines max */}
                  <p className="text-foam/80 text-xs leading-relaxed mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price & Action Row */}
                  <div className="mt-3.5 pt-3 border-t border-foam/15 flex items-center justify-between gap-3 pointer-events-auto">
                    <span className="font-semibold text-foam text-base tracking-tight font-inter">
                      {item.formattedPrice}
                    </span>

                    {/* Round "+" Button: cream fill, espresso icon, 36px, links to /menu */}
                    <Link
                      to="/menu"
                      aria-label={`View ${item.name} on menu`}
                      className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-foam hover:bg-foam text-ink flex items-center justify-center transition-all duration-300 shadow-warm-sm [@media(hover:hover)]:group-hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                    >
                      <Plus className="w-4 h-4 text-ink" strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* ── Mobile Dot Indicators ── */}
        <div className="flex xl:hidden justify-center items-center gap-2 mt-6">
          {featuredData.items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to special item ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-6 bg-caramel'
                  : 'w-2 bg-ink/25 hover:bg-ink/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;
