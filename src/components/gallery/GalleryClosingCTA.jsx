import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Compass } from 'lucide-react';
import lateNight01 from '../../assets/images/gallery/late-night/01-lamp-steam-book.png';

export const GalleryClosingCTA = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[#14100E] text-[#FAF7F2] py-16 sm:py-24 border-t-2 border-[#14100E] selection:bg-[#FAF7F2] selection:text-[#14100E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Swiss Poster Box */}
        <div className="border-2 border-[#FAF7F2]/40 bg-[#14100E] shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#FAF7F2]/30">
            
            {/* ── Left Side: High Contrast Atmosphere & Stepped Plate (5 cols) ── */}
            <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[300px] overflow-hidden group bg-[#0B0908]">
              <img
                src={lateNight01}
                alt="Late night sanctuary atmosphere"
                className="w-full h-full object-cover grayscale contrast-125 opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-out"
              />

              {/* Stepped White Label: GIDDYUP. — */}
              <div className="absolute top-6 left-6 bg-[#FAF7F2] text-[#14100E] border-2 border-[#14100E] p-4 sm:p-5 shadow-xl z-10">
                <span className="block font-grotesk text-[8px] font-bold uppercase tracking-[0.25em] text-[#14100E]/60 mb-1">
                  CALL TO SANCTUARY
                </span>
                <span className="block font-grotesk font-black text-2xl uppercase tracking-tight text-[#14100E] leading-none">
                  GIDDYUP.
                </span>
                <div className="w-6 h-[2px] bg-[#14100E] mt-2" />
              </div>

              {/* Inverted display 10P in corner */}
              <div className="absolute right-4 bottom-4 font-grotesk font-black text-6xl sm:text-7xl text-[#FAF7F2]/60 select-none pointer-events-none">
                10<span className="text-3xl font-black align-top">P</span>
              </div>
            </div>

            {/* ── Right Side: Headline & Brutalist CTAs (7 cols) ── */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between bg-[#14100E]">
              <div>
                {/* Section Stamp */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2.5 h-2.5 bg-[#FAF7F2]" />
                  <span className="font-grotesk font-black text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#FAF7F2]/70">
                    SANCTUARY INVITATION · EST. KOTA
                  </span>
                </div>

                {/* Giant Headline */}
                <h2 className="font-grotesk font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tighter leading-[0.94] text-[#FAF7F2] mb-6">
                  Experience The<br />
                  Space In Person.
                </h2>

                <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#FAF7F2]/70 max-w-lg leading-relaxed mb-8">
                  From slow morning pour-overs to midnight espresso sessions. Step into our brutalist stone sanctuary and taste coffee the way it was engineered to be experienced.
                </p>
              </div>

              {/* Brutalist Button Actions */}
              <div className="pt-8 border-t-2 border-[#FAF7F2]/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/reserve"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#FAF7F2] text-[#14100E] font-grotesk font-black text-xs uppercase tracking-[0.22em] border-2 border-[#FAF7F2] hover:bg-transparent hover:text-[#FAF7F2] transition-colors group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>01 / RESERVE YOUR TABLE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-transparent text-[#FAF7F2] font-grotesk font-black text-xs uppercase tracking-[0.22em] border-2 border-[#FAF7F2]/40 hover:border-[#FAF7F2] hover:bg-[#FAF7F2]/10 transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>02 / EXPLORE MENU</span>
                </Link>
              </div>

              {/* Lower Ticker Stamp */}
              <div className="mt-8 pt-4 border-t border-[#FAF7F2]/10 flex items-center justify-between text-[9px] font-grotesk uppercase tracking-widest text-[#FAF7F2]/40">
                <span>TATVA PRIME · GUMANPURA, KOTA</span>
                <span>OPEN DAILY 08:00 — 23:00</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default GalleryClosingCTA;
