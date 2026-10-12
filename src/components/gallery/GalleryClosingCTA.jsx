import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

export const GalleryClosingCTA = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-[#EADBC8] text-[#1F1612] py-20 sm:py-28 px-6 sm:px-10 lg:px-12 border-t border-[#C9A27E]/30 overflow-hidden">
      {/* Background ambient radial glow using brand tokens */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(251, 247, 241, 0.7) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Small Brand Line */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#A8612E] mb-4 font-inter"
        >
          Tatva Cafe
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="font-playfair font-bold text-3xl sm:text-5xl lg:text-6xl text-[#1F1612] leading-[1.14] tracking-tight mb-5"
        >
          Your Next Favourite Moment Awaits.
        </motion.h2>

        {/* Text */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          className="font-inter text-base sm:text-xl text-[#1F1612]/75 max-w-lg mx-auto mb-10 leading-relaxed font-normal"
        >
          Come for the coffee. Stay for the feeling.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <Link
            to="/reserve"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#A8612E] hover:bg-[#A8612E]/90 text-[#FBF7F1] font-inter font-semibold text-sm sm:text-base tracking-wide shadow-[0_8px_24px_rgba(168,97,46,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EADBC8]"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Your Table</span>
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FBF7F1] hover:bg-[#FBF7F1]/80 text-[#1F1612] border border-[#C9A27E]/50 font-inter font-semibold text-sm sm:text-base tracking-wide transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EADBC8]"
          >
            <MapPin className="w-4 h-4 text-[#A8612E]" />
            <span>Visit Our Café</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryClosingCTA;
