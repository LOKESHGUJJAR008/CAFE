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
          <span className="bd-eyebrow block mb-4">
            Atmosphere
          </span>

          <h2 className="font-cormorant font-semibold text-[#FBF7F1] text-5xl sm:text-6xl leading-[1] tracking-[-0.02em] mb-6">
            {atmosphereData.heading}
          </h2>

          <p className="text-[#FBF7F1]/70 text-sm sm:text-base leading-relaxed mb-10 font-grotesk">
            {atmosphereData.description}
          </p>

          <div>
            <Link
              to="/contact"
              className="bd-btn bd-btn-light"
            >
              Visit Our Café
            </Link>
          </div>
        </motion.div>

        {/* ── Photo Cards ── */}
        <div className="relative h-full min-h-[420px] flex items-center justify-center lg:justify-end">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="group relative w-48 sm:w-64 aspect-[3/4] bg-[#1F1612] border border-[#C9A012]/35 hover:border-[#C9A012] overflow-hidden shadow-2xl z-10 mr-12 sm:mr-32 transition-all duration-500"
          >
            <img
              src={getImage('seating')}
              alt="TATVA café aesthetic atmosphere details"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-[#1F1612]/90 backdrop-blur-sm px-2.5 py-1 border border-[#C9A012]/40">
              <span className="font-grotesk text-[8px] font-bold uppercase tracking-[0.25em] text-[#C9A012]">
                Aesthetic Lounge
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1612]/40 to-transparent pointer-events-none" />
          </motion.div>
          
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="group absolute right-0 sm:right-10 top-1/2 -translate-y-1/2 w-48 sm:w-64 aspect-[3/4] bg-[#1F1612] border border-[#C9A012]/35 hover:border-[#C9A012] overflow-hidden shadow-2xl transition-all duration-500"
          >
            <img
              src={getImage('interior')}
              alt="Guests enjoying coffee"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-[#1F1612]/90 backdrop-blur-sm px-2.5 py-1 border border-[#C9A012]/40">
              <span className="font-grotesk text-[8px] font-bold uppercase tracking-[0.25em] text-[#C9A012]">
                Quiet Sanctuary
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1612]/40 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Atmosphere;
