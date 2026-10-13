import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Quote, Sparkles } from 'lucide-react';
import { INSTAGRAM } from '../../config';
import { siteData } from '../../data/site';

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

import slowMornings01 from '../../assets/images/gallery/slow-mornings/01-marble-latte-croissant.png';
import slowMornings02 from '../../assets/images/gallery/slow-mornings/02-sunlit-wooden-table.png';
import sweetCravings01 from '../../assets/images/gallery/sweet-cravings/01-dessert-espresso-terracotta.png';
import sweetCravings02 from '../../assets/images/gallery/sweet-cravings/02-topview-dessert-latte.png';
import lateNight01 from '../../assets/images/gallery/late-night/01-lamp-steam-book.png';
import coffeeConversations01 from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';

const EASE = [0.22, 1, 0.36, 1];

/**
 * 6 authentic café photos reused from existing gallery assets.
 */
const SHARED_PHOTOS = [
  {
    src: slowMornings01,
    alt: 'Tulip latte art and freshly baked butter croissant on marble table',
    caption: 'Morning brew & pastry ritual',
  },
  {
    src: sweetCravings01,
    alt: 'Panna cotta dessert with crisp almond wafer and espresso shot',
    caption: 'Terracotta sweet pairing',
  },
  {
    src: lateNight01,
    alt: 'Steaming ceramic mug beside an amber cordless table lamp and open book',
    caption: 'Evening focus corner',
  },
  {
    src: coffeeConversations01,
    alt: 'Barista pouring textured microfoam for latte art at the espresso bar',
    caption: 'Crafted behind the bar',
  },
  {
    src: slowMornings02,
    alt: 'Sunlit wooden table with black coffee and dusted mini cake',
    caption: 'Sunlit window seating',
  },
  {
    src: sweetCravings02,
    alt: 'Top-down view of piped hazelnut dessert paired with heart latte',
    caption: 'Artisan patisserie afternoon',
  },
];

/**
 * Authentic testimonials drawn from existing reviews data (reviews.js and Reviews.jsx).
 * No invented names or quotes.
 */
const MOOD_TESTIMONIALS = {
  'slow-mornings': {
    quote: 'A warm and inviting space with incredible attention to detail. Every sip of their latte feels truly special.',
    name: 'Riya Sharma',
    tag: 'Morning Ritual',
  },
  'coffee-conversations': {
    quote: 'Delicious brews, friendly staff, and peaceful seating. TATVA is definitely my go-to café in Kota.',
    name: 'Kunal Jain',
    tag: 'Shared Table',
  },
  'sweet-cravings': {
    quote: 'The Hazelnut Latte is on another level. Highly recommend the dessert platter too!',
    name: 'Priya Joshi',
    tag: 'Sweet Moments',
  },
  'late-night': {
    quote: 'Discovered TATVA during JEE prep and it became my sanctuary. Quiet corners, power sockets everywhere, and consistently brilliant coffee.',
    name: 'Karan Mehta',
    tag: 'Late Night Study',
  },
};

export const SharedMoments = ({ selectedMood = 'slow-mornings' }) => {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef(null);

  // Mouse drag state for smooth desktop drag-scrolling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const instagramUrl = INSTAGRAM || siteData?.socials?.instagram || '';
  const instagramHandle = siteData?.socials?.instagramHandle || '@tatvacafe';

  const testimonial = MOOD_TESTIMONIALS[selectedMood] || MOOD_TESTIMONIALS['slow-mornings'];

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      className="relative py-16 sm:py-24 px-6 sm:px-10 lg:px-12 border-t bg-transparent text-[var(--gallery-text)] transition-colors duration-700 overflow-hidden"
      style={{ borderColor: 'var(--gallery-border)' }}
      aria-label="Moments shared with us"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Row: Title, Tagline, Instagram Link & Handle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] mb-2.5 font-inter transition-colors duration-500"
              style={{ color: 'var(--gallery-accent)' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Community & Memories</span>
            </div>

            <h2
              className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight transition-colors duration-500"
              style={{ color: 'var(--gallery-text)' }}
            >
              Moments shared with us
            </h2>

            <p
              className="font-inter text-xs sm:text-sm mt-2 max-w-xl leading-relaxed transition-colors duration-500"
              style={{ color: 'var(--gallery-subtext)' }}
            >
              Capture your quiet sips, coffee dates, and study rituals.{' '}
              <span className="font-semibold" style={{ color: 'var(--gallery-accent)' }}>
                Tag us {instagramHandle}
              </span>
            </p>
          </div>

          {/* Instagram Action Button */}
          {instagramUrl ? (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow TATVA Café on Instagram ${instagramHandle}`}
              className="inline-flex items-center gap-2.5 self-start md:self-auto px-5 py-2.5 rounded-full border text-xs sm:text-sm font-inter font-semibold transition-all duration-300 shadow-xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] group"
              style={{
                backgroundColor: 'var(--gallery-panel)',
                borderColor: 'var(--gallery-border)',
                color: 'var(--gallery-text)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--gallery-accent)';
                e.currentTarget.style.color = '#FBF7F1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--gallery-panel)';
                e.currentTarget.style.color = 'var(--gallery-text)';
              }}
            >
              <InstagramIcon className="w-4 h-4 text-[#A8612E] group-hover:text-[#FBF7F1] transition-colors" />
              <span>Follow on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-inter font-medium"
              style={{ color: 'var(--gallery-subtext)' }}
            >
              <InstagramIcon className="w-4 h-4 text-[#A8612E]" />
              <span>Tag us {instagramHandle}</span>
            </span>
          )}
        </div>

        {/* Drag + Snap Horizontally Scrolling Strip of 6 Small Square Photos */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          tabIndex={0}
          aria-label="Drag and scroll through guest moments photos"
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0 pb-4 sm:pb-2 cursor-grab active:cursor-grabbing select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A8612E] rounded-2xl"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SHARED_PHOTOS.map((photo, index) => (
            <div
              key={index}
              data-cursor="view"
              className="snap-start shrink-0 w-44 h-44 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-2xl overflow-hidden border relative group shadow-sm transition-transform duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--gallery-panel)',
                borderColor: 'var(--gallery-border)',
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Ambient overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-40"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(31, 22, 18, 0.75) 100%)',
                }}
              />

              {/* Caption on hover */}
              <div className="absolute bottom-3 left-3 right-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-inter text-[11px] font-semibold text-[#FBF7F1] drop-shadow-sm line-clamp-1">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mood-Specific Testimonial Line */}
        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMood}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="max-w-3xl mx-auto text-center px-6 py-5 rounded-2xl border transition-colors duration-500 shadow-xs"
              style={{
                backgroundColor: 'var(--gallery-panel)',
                borderColor: 'var(--gallery-border)',
              }}
            >
              <div className="inline-flex items-center justify-center gap-1.5 mb-2">
                <Quote className="w-3.5 h-3.5 opacity-60" style={{ color: 'var(--gallery-accent)' }} />
                <span
                  className="font-inter text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: 'var(--gallery-accent)' }}
                >
                  {testimonial.tag}
                </span>
              </div>

              <p
                className="font-playfair text-base sm:text-lg lg:text-xl italic font-medium leading-relaxed"
                style={{ color: 'var(--gallery-text)' }}
              >
                “{testimonial.quote}”
              </p>

              <div className="mt-2.5">
                <span
                  className="font-inter text-xs sm:text-sm font-semibold tracking-wide"
                  style={{ color: 'var(--gallery-subtext)' }}
                >
                  — {testimonial.name}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SharedMoments;
