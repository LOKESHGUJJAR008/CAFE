import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// BD-style editorial intro — large serif left title + small uppercase prose right
export const WhyStrip = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="bg-[#FAF7F2] py-12 md:py-16 px-6 sm:px-10 lg:px-14 border-b-2 border-[#14100E]"
      aria-label="Why TATVA"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top thin rule */}
        <div className="w-full h-[1px] bg-[#14100E]/10 mb-10" />

        {/* Editorial split: Left = big serif, Right = small caps prose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — Massive editorial serif headline */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <h2 className="font-cormorant font-semibold text-[#1F1612] text-5xl sm:text-6xl md:text-7xl leading-[1] tracking-[-0.02em]">
              Sip<br />
              Something<br />
              <em className="not-italic text-[#A8612E]">Special.</em>
            </h2>
          </motion.div>

          {/* Right — small uppercase prose + 4 features */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
            className="pt-2 md:pt-4"
          >
            <p className="font-grotesk text-[#1F1612]/70 text-sm leading-relaxed tracking-wide mb-12 max-w-sm">
              TATVA IS A SANCTUARY FOR THOSE WHO APPRECIATE THE ART OF A PERFECTLY CRAFTED BREW,
              ARTISAN BAKES, AND A COZY SPACE TO THINK — ALL IN THE HEART OF TALWANDI, KOTA.
            </p>

            {/* 4 feature rows — editorial divider style */}
            <div className="flex flex-col divide-y divide-[#1F1612]/10">
              {[
                { label: 'Single-Origin Arabica',  detail: 'Ethically sourced, freshly roasted daily' },
                { label: 'Fresh Artisan Bakes',    detail: 'Made in-house every morning' },
                { label: 'Cozy Study Hub',         detail: 'Free WiFi, power sockets, quiet corners' },
                { label: 'Vegetarian Friendly',    detail: 'Thoughtfully curated plant-forward menu' },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 + i * 0.08 }}
                  className="flex items-start justify-between gap-4 py-4"
                >
                  <span className="font-grotesk text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1F1612]">
                    {f.label}
                  </span>
                  <span className="font-grotesk text-[11px] text-[#1F1612]/50 tracking-wide text-right max-w-[160px]">
                    {f.detail}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom thin rule */}
        <div className="w-full h-[1px] bg-[#1F1612]/10 mt-16" />
      </div>
    </section>
  );
};

export default WhyStrip;