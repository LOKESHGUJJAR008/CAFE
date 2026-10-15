import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const EssenceStatement = ({ lines }) => {
  const prefersReducedMotion = useReducedMotion();

  const primaryQuote = lines?.[0] || 'Luxury is not excess.';
  const secondaryQuote = lines?.[1] || 'It is the quiet perfection of every detail.';

  return (
    <section id="story-essence" className="relative bg-[#14100E] text-[#FAF7F2] py-14 sm:py-20 border-b-2 border-[#14100E] overflow-hidden selection:bg-[#FAF7F2] selection:text-[#14100E]">
      {/* Background Subtle Constructivist Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FAF7F208_1px,transparent_1px),linear-gradient(to_bottom,#FAF7F208_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Editorial Tag */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 bg-[#14100E] border border-[#FAF7F2]/30 px-3 py-1 mb-6"
          >
            <span className="w-1.5 h-1.5 bg-[#C9A012]" />
            <span className="font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF7F2]/90">
              PHILOSOPHICAL MANDATE // KOTA
            </span>
            <span className="w-1.5 h-1.5 bg-[#C9A012]" />
          </motion.div>

          {/* Primary Statement */}
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-grotesk font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#FAF7F2] leading-tight mb-4"
          >
            {primaryQuote}{' '}
            <span className="font-cormorant font-normal italic text-[#C9A012] lowercase block sm:inline">
              {secondaryQuote}
            </span>
          </motion.h2>

          {/* Bottom Telemetry Stamp */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-xs font-grotesk font-bold uppercase tracking-[0.25em] text-[#FAF7F2]/60"
          >
            <span>SINGLE-ORIGIN ONLY</span>
            <span>•</span>
            <span>NO COMPROMISE</span>
            <span>•</span>
            <span>CRAFTED IN TALWANDI</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EssenceStatement;