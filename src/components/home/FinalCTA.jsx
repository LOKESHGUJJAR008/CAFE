import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, MessageCircle, Phone, ArrowUpRight, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ctaData } from '../../data/cta';

export const FinalCTA = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-foam py-20 sm:py-24 px-6 sm:px-10 lg:px-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-foam rounded-3xl sm:rounded-4xl p-8 sm:p-14 lg:p-16 text-center text-ink relative overflow-hidden shadow-warm-lg border border-ink/40"
        >
          {/* ── Fine Caramel Arch Outlines (Decorative) ── */}
          <div
            className="absolute -top-12 -left-12 w-64 h-80 rounded-t-full border border-caramel/25 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -right-16 w-80 h-96 rounded-t-full border border-caramel/25 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-caramel/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Heading from brief */}
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight mb-4 max-w-2xl mx-auto leading-tight">
              {ctaData.heading}
            </h2>

            {/* Text from brief */}
            <p className="text-ink/85 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-inter">
              {ctaData.text}
            </p>

            {/* Buttons: full-width stacked on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
              {/* Get Directions: caramel fill, espresso text */}
              <a
                href={ctaData.directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-caramel hover:bg-caramel/80 text-ink font-bold text-xs sm:text-sm tracking-wide transition-all shadow-warm flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foam"
              >
                <MapPin className="w-4 h-4 text-ink" />
                <span>Get Directions</span>
                <ArrowUpRight className="w-4 h-4 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Order on WhatsApp: outlined cream */}
              <a
                href={ctaData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-foam/50 hover:bg-foam hover:text-ink text-ink font-semibold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>

              {/* Book a Table */}
              <Link
                to="/reserve"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-latte/50 hover:border-caramel text-ink font-semibold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book a Table</span>
              </Link>
            </div>

            {/* Below: Address and Phone in small cream/80 text */}
            <div className="mt-8 pt-6 border-t border-foam/15 text-xs text-ink/80 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 font-inter">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-caramel flex-shrink-0" />
                <span>{ctaData.address}</span>
              </span>
              <span className="hidden sm:inline text-ink/40" aria-hidden="true">
                •
              </span>
              <a
                href={`tel:${ctaData.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-1.5 hover:text-ink transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-caramel flex-shrink-0" />
                <span>{ctaData.phone}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
