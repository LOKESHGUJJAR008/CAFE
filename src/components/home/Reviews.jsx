import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GOOGLE_REVIEW_URL, DEMO_MODE, VERIFIED_STATS } from '../../config';

/* ── Inline review data ── */
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
    quote: 'Discovered TATVA during JEE prep and it became my sanctuary. Quiet corners, power sockets everywhere, and consistently brilliant coffee.',
  },
];

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-3.5 h-3.5 ${i < count ? 'text-[#A8612E]' : 'text-[#EADBC8]'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export const Reviews = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="reviews" className="bg-[#FBF7F1] py-20 sm:py-28 px-6 sm:px-10 lg:px-14 relative">
      <div className="max-w-7xl mx-auto">
        <div className="w-full h-[1px] bg-[#1F1612]/10 mb-16" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16"
        >
          <div>
            <span className="bd-eyebrow block mb-3">
              {DEMO_MODE ? 'Sample testimonials' : 'Testimonials'}
            </span>
            <h2 className="font-cormorant font-semibold text-[#1F1612] text-5xl sm:text-6xl leading-[1] tracking-[-0.02em]">
              What Our Guests Say
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start sm:self-auto">
            {!DEMO_MODE && VERIFIED_STATS?.rating && (
              <div className="inline-flex items-center gap-2 font-grotesk text-[10px] tracking-[0.15em] uppercase text-[#1F1612]/60 font-semibold">
                <Stars count={5} />
                <span>{VERIFIED_STATS.rating} · {VERIFIED_STATS.reviewCount} reviews</span>
              </div>
            )}
            {GOOGLE_REVIEW_URL && (
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bd-btn bd-btn-caramel !py-2 !px-4 !text-[10px]"
              >
                Rate us on Google ★
              </a>
            )}
          </div>
        </motion.div>

        {/* Cards — BD editorial: flat grid, no rounded corners, gap as separator */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#1F1612]/8">
          {REVIEWS.map((rev, i) => (
            <motion.article
              key={rev.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.08 }}
              className="bg-[#FFFFFF] p-7 sm:p-8 flex flex-col justify-between gap-6
                         border border-[#1F1612]/10 hover:border-[#C9A012] shadow-xs hover:shadow-[0_12px_28px_rgba(201,160,18,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <Stars count={rev.rating} />
                {/* Large italic Cormorant quote */}
                <p className="font-cormorant italic text-[#1F1612] text-xl sm:text-2xl leading-snug mt-5">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#1F1612]/10">
                <div className="w-8 h-8 bg-[#EADBC8] text-[#1F1612] font-bold text-[10px] flex items-center justify-center flex-shrink-0 font-grotesk">
                  {DEMO_MODE ? 'SG' : rev.initials}
                </div>
                <span className="font-grotesk text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1F1612]/60">
                  {DEMO_MODE ? 'Sample guest' : rev.name}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="w-full h-[1px] bg-[#1F1612]/10 mt-16" />
      </div>
    </section>
  );
};

export default Reviews;
