import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, MessageCircle, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ctaData } from '../../data/cta';

export const FinalCTA = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[#1F1612] py-24 sm:py-32 px-6 sm:px-10 lg:px-14 relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(168,97,46,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,162,126,0.2) 0%, transparent 50%)'
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Eyebrow */}
          <span className="font-grotesk text-[10px] font-semibold tracking-[0.3em] uppercase text-[#A8612E] block mb-8">
            Come Visit Us
          </span>

          {/* Large Cormorant heading */}
          <h2 className="font-cormorant font-semibold text-[#FBF7F1] text-5xl sm:text-6xl lg:text-7xl leading-[1] tracking-[-0.02em] mb-6 max-w-3xl mx-auto">
            {ctaData.heading}
          </h2>

          <p className="font-grotesk text-[#FBF7F1]/50 text-xs sm:text-sm tracking-wide leading-relaxed max-w-md mx-auto mb-12 uppercase">
            {ctaData.text}
          </p>

          {/* Three rectangular outlined CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={ctaData.directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bd-btn bd-btn-light w-full sm:w-auto justify-center gap-2"
            >
              <MapPin className="w-3.5 h-3.5" />
              Get Directions
            </a>

            <a
              href={ctaData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bd-btn bd-btn-light w-full sm:w-auto justify-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Order on WhatsApp
            </a>

            <Link
              to="/reserve"
              className="bd-btn bd-btn-light w-full sm:w-auto justify-center gap-2"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              Book a Table
            </Link>
          </div>

          {/* Address line */}
          <p className="mt-12 font-grotesk text-[10px] tracking-[0.25em] uppercase text-[#FBF7F1]/30">
            {ctaData.address}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
