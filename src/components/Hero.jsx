import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, MapPin } from 'lucide-react';
import heroCinematicImg from '../assets/images/hero-cinematic.jpg';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative w-full h-[72vh] min-h-[520px] max-h-[680px] bg-[#14100E] text-[#FAF7F2] overflow-hidden flex flex-col justify-between border-b-2 border-[#14100E] select-none"
      aria-label="Hero"
    >
      {/* ── Background Image with Smooth Scale & Cinematic Vignette ── */}
      <motion.div
        initial={prefersReducedMotion ? {} : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroCinematicImg}
          alt="Cinematic luxury espresso sanctuary counter at TATVA Café"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        {/* Layered luxury gradient for flawless text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,16,14,0.72) 0%, rgba(20,16,14,0.42) 40%, rgba(20,16,14,0.85) 100%)',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Top Running Telemetry Ticker (Flush with Navbar) ── */}
      <div className="relative z-20 w-full border-b border-[#FAF7F2]/20 bg-[#14100E]/75 backdrop-blur-md py-2 px-4 sm:px-8 lg:px-12 overflow-x-auto scrollbar-none">
        <div className="w-full flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.28em] text-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#C9A012]" />
            <span>TATVA ARTISAN SANCTUARY // TALWANDI, KOTA</span>
          </div>
          <span className="text-[#FAF7F2]/30 font-normal">/</span>
          <span>ESTABLISHED: 2021</span>
          <span className="text-[#FAF7F2]/30 font-normal">/</span>
          <span>100% SINGLE-ORIGIN ROASTS</span>
          <span className="text-[#FAF7F2]/30 font-normal">/</span>
          <span>ACOUSTIC QUIET: 42 dB</span>
          <span className="text-[#FAF7F2]/30 font-normal">/</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>OPEN TODAY · 08:00 — 23:00</span>
          </div>
        </div>
      </div>

      {/* ── Center Content: Compact, Punchy, Editorial ── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 text-center my-auto py-4">
        
        {/* Minimalist Top Badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 border border-[#FAF7F2]/30 bg-[#14100E]/60 backdrop-blur-sm px-4 py-1.5 text-center shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A27E]" />
            <span className="font-grotesk text-[10px] font-bold tracking-[0.25em] uppercase text-[#FAF7F2]">
              TATVA CAFÉ · TALWANDI, KOTA
            </span>
          </div>
        </motion.div>

        {/* Big Editorial Headline */}
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.2 }}
          className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-[#FAF7F2] uppercase leading-[0.92] tracking-tight max-w-4xl mx-auto mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          Artisan Coffee<br />
          <span className="font-cormorant italic font-normal text-[#EADBC8] tracking-normal drop-shadow-sm">
            Sanctuary.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
          className="font-grotesk text-[#FAF7F2]/80 text-xs sm:text-sm tracking-[0.18em] uppercase max-w-md mx-auto mb-6 sm:mb-8 font-medium"
        >
          A bold reimagining of the neighbourhood café · Single-origin brews & quiet corners.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          <Link
            to="/reserve"
            className="w-full sm:w-auto min-w-[180px] px-7 py-3 rounded-full bg-[#FAF7F2] text-[#14100E] hover:bg-[#C9A27E] font-grotesk text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
          >
            <span>Reserve a Table</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto min-w-[180px] px-7 py-3 rounded-full border border-[#FAF7F2]/40 bg-[#14100E]/40 backdrop-blur-md text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#14100E] font-grotesk text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg flex items-center justify-center"
          >
            Explore Menu
          </Link>
        </motion.div>
      </div>

      {/* ── Bottom Micro-Telemetry Bar ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-3 border-t border-[#FAF7F2]/15 flex items-center justify-between text-[9px] sm:text-[10px] font-grotesk text-[#FAF7F2]/60 select-none">
        <span className="hidden sm:inline tracking-[0.25em] uppercase">
          COORDINATES: 25.1384° N · 75.8456° E
        </span>
        <div className="flex items-center gap-2 mx-auto sm:mx-0 tracking-[0.25em] uppercase text-[#FAF7F2]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A012] animate-ping" />
          <span>SCROLL TO DISCOVER SANCTUARY</span>
        </div>
        <span className="hidden sm:inline tracking-[0.25em] uppercase">
          RAJASTHAN · KOTA
        </span>
      </div>
    </section>
  );
};

export default Hero;
