import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
import { featuredData } from '../data/featured';
import Reveal from './Reveal';
import WaveDivider from './WaveDivider';

/* ─────────────────────────────────────────────
   FEATURED PRODUCT CARD
───────────────────────────────────────────── */
const FeaturedCard = ({ item, index }) => {
  const isOffset = index === 1 || index === 3; // 2nd & 4th cards shift down on desktop

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: isOffset ? 24 : 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: isOffset ? 20 : -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col rounded-3xl bg-white border border-beige/50
                 shadow-warm hover:shadow-warm-lg transition-shadow duration-300
                 overflow-hidden cursor-default select-none"
      style={{ marginTop: isOffset ? 0 : 0 }} // visual shift handled by whileInView y
    >
      {/* Badge pill */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full
                      bg-espresso/90 text-cream text-[10px] font-bold uppercase
                      tracking-widest shadow-warm-sm">
        {item.badge}
      </div>

      {/* Image area — soft beige arch / circle container */}
      <div className="relative w-full h-56 sm:h-60 bg-cream-light flex items-center
                      justify-center overflow-hidden">
        {/* Decorative arch shape behind image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48
                        rounded-full bg-beige/60 blur-sm" aria-hidden="true" />
        {/* Product image with zoom on hover */}
        <img
          src={item.image}
          alt={item.name}
          width={220}
          height={220}
          loading="lazy"
          className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 object-contain
                     transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 pt-4 gap-3">
        {/* Tagline */}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-caramel">
          {item.tagline}
        </span>

        {/* Name */}
        <h3 className="font-playfair font-bold text-espresso text-xl leading-tight">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-roast/75 leading-relaxed line-clamp-3 flex-1">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-beige/40 text-espresso/70
                         text-[10px] font-medium tracking-wide border border-beige/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: price + rating + arrow */}
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-beige/40">
          <span className="px-3.5 py-1.5 rounded-full bg-caramel text-espresso
                           font-playfair font-bold text-base shadow-warm-sm">
            {item.formattedPrice}
          </span>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs font-semibold text-roast/80">
              <Star className="w-3.5 h-3.5 fill-caramel text-caramel" />
              {item.rating}
              <span className="font-normal text-roast/50">({item.reviewCount})</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-espresso flex items-center justify-center
                            text-caramel group-hover:bg-caramel group-hover:text-espresso
                            transition-colors shadow-warm-sm">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MOBILE SWIPE CAROUSEL
───────────────────────────────────────────── */
const MobileCarousel = ({ items }) => {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const cardWidth = clientWidth * 0.85 + 16; // card width + gap
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIdx(Math.min(idx, items.length - 1));
  };

  const scrollToIdx = (idx) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.85 + 16;
    scrollRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        role="region"
        aria-label="Featured coffee items carousel"
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory
                   pb-4 -mx-6 px-6 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="snap-center flex-shrink-0 w-[85vw] max-w-[340px]"
          >
            {/* Simplified card for mobile (no offset) */}
            <div className="group flex flex-col rounded-3xl bg-white border border-beige/50
                            shadow-warm overflow-hidden h-full">
              {/* Badge */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full
                                bg-espresso/90 text-cream text-[10px] font-bold
                                uppercase tracking-widest shadow-warm-sm">
                  {item.badge}
                </div>
                {/* Image area */}
                <div className="w-full h-52 bg-cream-light flex items-center
                                justify-center overflow-hidden">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-44
                                  rounded-full bg-beige/60 blur-sm" aria-hidden="true" />
                  <img
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    loading="lazy"
                    className="relative z-10 w-40 h-40 object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col p-5 gap-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-caramel">
                  {item.tagline}
                </span>
                <h3 className="font-playfair font-bold text-espresso text-xl leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-roast/75 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-beige/40">
                  <span className="px-3.5 py-1.5 rounded-full bg-caramel text-espresso
                                   font-playfair font-bold text-base shadow-warm-sm">
                    {item.formattedPrice}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-roast/80">
                    <Star className="w-3.5 h-3.5 fill-caramel text-caramel" />
                    {item.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Carousel position">
        {items.map((item, idx) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeIdx === idx}
            aria-label={`View ${item.name}`}
            onClick={() => scrollToIdx(idx)}
            className={`rounded-full transition-all duration-300 focus:outline-none
                        focus-visible:ring-2 focus-visible:ring-caramel
                        ${activeIdx === idx
                          ? 'w-6 h-2.5 bg-caramel'
                          : 'w-2.5 h-2.5 bg-roast/30 hover:bg-roast/50'
                        }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export const Featured = () => {
  return (
    <section id="featured" className="relative bg-cream text-espresso pt-20 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-20 lg:pb-24">

        {/* Section header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em]
                             text-caramel bg-caramel/10 px-4 py-1.5 rounded-full
                             border border-caramel/25 mb-4">
              {featuredData.badge}
            </span>
            <h2 className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl
                           text-espresso tracking-tight leading-tight">
              Your Coffee,{' '}
              <span className="italic font-semibold text-roast">Your Ritual.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-roast/80 leading-relaxed">
              {featuredData.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Desktop 4-column organic grid (hidden on mobile) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {featuredData.items.map((item, idx) => (
            <FeaturedCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* Mobile swipe carousel (visible on mobile only) */}
        <div className="sm:hidden">
          <MobileCarousel items={featuredData.items} />
        </div>

      </div>

      {/* Wave transition into dark About section */}
      <WaveDivider color="#241812" height="72px" flipX />
    </section>
  );
};

export default Featured;
