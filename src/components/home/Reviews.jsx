import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GOOGLE_REVIEW_URL, DEMO_MODE, VERIFIED_STATS } from '../../config';

/* ── Inline review data (easy to expand) ── */
const REVIEWS = [
  {
    id: 1,
    name: 'Anika Sharma',
    initials: 'AS',
    rating: 5,
    quote: 'The Royal Cappuccino is absolutely divine — the layers are perfect every single time. The ambiance feels like a warm hug after long coaching hours.',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    initials: 'RV',
    rating: 5,
    quote: 'Best cold brew in Kota, no debate. The caramel cold foam is next level. My go-to study spot every weekend.',
  },
  {
    id: 3,
    name: 'Priya Joshi',
    initials: 'PJ',
    rating: 5,
    quote: 'Beautiful interiors, great Wi-Fi, friendly staff. The Hazelnut Latte is on another level. Highly recommend the dessert platter too!',
  },
  {
    id: 4,
    name: 'Karan Mehta',
    initials: 'KM',
    rating: 5,
    quote: 'Discovered Royal Bean during JEE prep and it became my sanctuary. Quiet corners, power sockets everywhere, and consistently brilliant coffee.',
  },
];

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < count ? 'text-[#A8612E]' : 'text-[#EADBC8]'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export const Reviews = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    if (offsetWidth > 0) {
      const cardWidth = offsetWidth * 0.82;
      const index = Math.round(scrollLeft / (cardWidth + 16));
      setActiveIndex(Math.min(Math.max(index, 0), REVIEWS.length - 1));
    }
  };

  const scrollToCard = (idx) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[idx];
    if (card) {
      card.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
      setActiveIndex(idx);
    }
  };

  return (
    <section id="reviews" className="bg-almond py-20 sm:py-24 px-6 sm:px-10 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-14"
        >
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-2 font-inter">
              {DEMO_MODE ? 'Sample testimonials' : 'Testimonials'}
            </span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
              What Our Guests Say
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 self-start sm:self-auto">
            {!DEMO_MODE && VERIFIED_STATS?.rating && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel/15 border border-caramel/30 text-ink text-xs font-bold font-inter tracking-wide">
                <Stars count={5} />
                <span>{VERIFIED_STATS.rating} · {VERIFIED_STATS.reviewCount} reviews</span>
              </div>
            )}
            {GOOGLE_REVIEW_URL && (
              <a 
                href={GOOGLE_REVIEW_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border-2 border-caramel text-caramel hover:bg-caramel hover:text-foam text-xs font-bold font-inter tracking-wide transition-colors"
              >
                Rate us on Google ★
              </a>
            )}
          </div>
        </motion.div>

        {/* Cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 gap-5 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 lg:grid-cols-4"
        >
          {REVIEWS.map((rev, i) => (
            <motion.article
              key={rev.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.08 }}
              className="w-[82vw] sm:w-[48vw] md:w-auto flex-shrink-0 md:flex-shrink snap-center
                         bg-foam border border-almond/60 rounded-2xl p-7 sm:p-8
                         flex flex-col justify-between gap-6
                         shadow-warm-sm hover:shadow-warm transition-all duration-300
                         hover:-translate-y-1"
            >
              <div>
                <Stars count={rev.rating} />
                {/* Quote */}
                <p className="font-playfair italic text-ink text-base leading-relaxed mt-4">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author row */}
              <div className="flex items-center gap-3 pt-4 border-t border-ink/10">
                <div className="w-9 h-9 rounded-full bg-almond text-ink font-bold text-xs flex items-center justify-center font-inter flex-shrink-0 shadow-warm-sm">
                  {DEMO_MODE ? 'SG' : rev.initials}
                </div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-ink font-inter">
                  {DEMO_MODE ? 'Sample guest' : rev.name}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-6">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-caramel' : 'w-2 bg-ink/25 hover:bg-ink/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
