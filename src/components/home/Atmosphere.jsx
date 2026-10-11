import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { atmosphereData } from '../../data/atmosphere';
import { getImage } from '../../data/images';

export const Atmosphere = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="atmosphere"
      className="relative w-full min-h-[70svh] flex items-center bg-ink text-foam"
    >
      {/* ── Background: Dark Ink gradient ── */}
      <div className="absolute inset-0 bg-ink overflow-hidden pointer-events-none">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-caramel/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-20 pb-28 sm:pt-24 sm:pb-36 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-caramel mb-3 block font-inter">
            Atmosphere
          </span>

          <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-foam tracking-tight leading-[1.15] mb-5">
            {atmosphereData.heading}
          </h2>

          <p className="text-foam/85 text-sm sm:text-base leading-relaxed mb-8">
            {atmosphereData.description}
          </p>

          <div>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-foam/40 text-foam hover:bg-foam hover:text-ink text-xs sm:text-sm font-semibold tracking-wide transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2"
            >
              <span>Visit Our Café</span>
              <ArrowRight className="w-4 h-4 text-foam group-hover:text-ink group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </motion.div>

        {/* ── Photo Cards ── */}
        <div className="relative h-full min-h-[400px] flex items-center justify-center lg:justify-end">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="relative w-48 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-10 mr-12 sm:mr-32"
          >
            <img src={getImage('seating')} alt="TATVA café aesthetic atmosphere details" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent pointer-events-none" />
          </motion.div>
          
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="absolute right-0 sm:right-10 top-1/2 -translate-y-1/2 w-48 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img src={getImage('interior')} alt="Guests enjoying coffee" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Atmosphere;
