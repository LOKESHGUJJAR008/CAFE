import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ZoomIn } from 'lucide-react';
import heroLatteCroissant from '../../assets/images/gallery/hero/hero-latte-croissant.png';
import coffeeConversations01 from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';
import GalleryLightbox from './GalleryLightbox';

const EASE = [0.22, 1, 0.36, 1];

export const GalleryHero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const heroPhotos = [
    { src: coffeeConversations01, alt: 'Artisan Barista extraction ritual at Tatva Prime' },
    { src: heroLatteCroissant, alt: 'Signature pour-over and morning sunlight' },
  ];

  const handleScrollToGrid = (e) => {
    e.preventDefault();
    const target = document.getElementById('editorial-grid');
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <header className="relative bg-[#FAF7F2] text-[#14100E] pt-24 sm:pt-28 pb-8 sm:pb-12 border-b-2 border-[#14100E] overflow-hidden selection:bg-[#14100E] selection:text-[#FAF7F2]">
      {/* ── Top Archival Ticker Bar ── */}
      <div className="border-y-2 border-[#14100E] bg-[#FAF7F2] py-2 px-4 sm:px-8 mb-8 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.25em]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#14100E]" />
            <span>EDITION NO. 04 · TATVA ARCHIVE</span>
          </div>
          <span className="text-[#14100E]/40 font-normal">/</span>
          <span>LAT: 25.18° N · ELEVATION: 271M</span>
          <span className="text-[#14100E]/40 font-normal">/</span>
          <span>CHIKMAGALUR SINGLE-ORIGIN</span>
          <span className="text-[#14100E]/40 font-normal">/</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>SANCTUARY OPEN · 08:00 — 23:00</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main Swiss Constructivist Masthead Block ── */}
        <div className="border-2 border-[#14100E] bg-[#FAF7F2] shadow-[0_16px_40px_rgba(20,16,14,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#14100E]">
            
            {/* ── Left Column: Editorial Manifesto & Typography (7 Cols) ── */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#FAF7F2]">
              <div>
                {/* Stepped White Tag */}
                <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3.5 py-1.5 shadow-[3px_3px_0px_#14100E] mb-6">
                  <span className="font-grotesk text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#14100E]">
                    VISUAL DOCUMENTARY — 04
                  </span>
                </div>

                {/* Giant Constructivist Headline */}
                <h1 className="font-grotesk font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#14100E] uppercase tracking-tighter leading-[0.92] mb-6">
                  The Visual<br />
                  Chronicle.
                </h1>

                {/* Sub-headline & Description */}
                <p className="font-grotesk text-xs sm:text-sm lg:text-base uppercase tracking-wider text-[#14100E]/80 max-w-xl leading-relaxed mb-8">
                  High-contrast photographic record of single-origin extraction rituals, brutalist concrete spaces, and the quiet rhythm of Kota’s coffee sanctuary.
                </p>
              </div>

              {/* Lower Metadata Row with Brand Stamp & Action */}
              <div className="pt-8 border-t-2 border-[#14100E] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="flex items-center gap-4">
                  {/* Solid Black Square Stamp */}
                  <div className="bg-[#14100E] text-[#FAF7F2] p-3 sm:p-4 border-2 border-[#14100E] shadow-[4px_4px_0px_rgba(20,16,14,0.2)]">
                    <span className="block text-[8px] font-grotesk font-bold uppercase tracking-[0.28em] text-[#FAF7F2]/70">
                      TATVA
                    </span>
                    <span className="block text-lg sm:text-xl font-grotesk font-black uppercase tracking-tight leading-none text-[#FAF7F2]">
                      PRIME
                    </span>
                  </div>

                  <div className="text-[10px] sm:text-xs font-grotesk uppercase tracking-wider text-[#14100E]/70 space-y-1">
                    <div><strong className="text-[#14100E]">MEDIUM:</strong> 35MM GELATIN & LEICA Q3</div>
                    <div><strong className="text-[#14100E]">CURATION:</strong> TATVA CREATIVE LAB</div>
                    <div><strong className="text-[#14100E]">INDEX:</strong> 15 ARCHIVAL PLATES</div>
                  </div>
                </div>

                <a
                  href="#editorial-grid"
                  onClick={handleScrollToGrid}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#14100E] text-[#FAF7F2] font-grotesk font-black text-xs uppercase tracking-[0.2em] border-2 border-[#14100E] hover:bg-[#FAF7F2] hover:text-[#14100E] transition-colors group"
                >
                  <span>EXPLORE GRID</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* ── Right Column: High-Contrast Visual Split & Display 9P (5 Cols) ── */}
            <div className="lg:col-span-5 relative flex flex-col justify-between bg-[#14100E] group overflow-hidden">
              <div
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
                className="relative h-full min-h-[380px] sm:min-h-[460px] overflow-hidden cursor-pointer"
              >
                <img
                  src={coffeeConversations01}
                  alt="Barista brewing espresso"
                  className="w-full h-full object-cover grayscale contrast-125 opacity-85 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                />

                {/* Overlapping Stepped White Tag: TONIGHT COFFEE TALKS — */}
                <div className="absolute top-6 left-6 bg-[#FAF7F2] border-2 border-[#14100E] p-4 sm:p-5 shadow-lg z-10 max-w-[200px]">
                  <span className="block font-grotesk text-[9px] font-bold uppercase tracking-[0.25em] text-[#14100E]/60 mb-1">
                    TONIGHT
                  </span>
                  <span className="block font-grotesk font-black text-xl sm:text-2xl uppercase tracking-tight text-[#14100E] leading-none">
                    COFFEE<br />TALKS
                  </span>
                  <div className="w-6 h-[2px] bg-[#14100E] mt-2.5" />
                </div>

                {/* Giant Display Numeral 9P */}
                <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 font-grotesk font-black text-8xl sm:text-9xl text-[#FAF7F2] tracking-tighter leading-none select-none z-10 drop-shadow-md">
                  9<span className="text-4xl sm:text-5xl font-black align-top ml-0.5">P</span>
                </div>

                {/* Hover zoom cue */}
                <div className="absolute inset-0 bg-[#14100E]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-[#FAF7F2] text-[#14100E] border-2 border-[#14100E] px-3.5 py-1.5 flex items-center gap-2 font-grotesk font-black text-xs uppercase tracking-widest shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>VIEW SPECIMEN</span>
                  </div>
                </div>
              </div>

              {/* Sub-strip caption */}
              <div className="p-4 bg-[#FAF7F2] border-t-2 border-[#14100E] flex items-center justify-between text-[10px] font-grotesk font-bold uppercase tracking-[0.2em] text-[#14100E]">
                <span>PLATE 01 / EXTRACTION AT BAR</span>
                <span className="text-[#C9A012]">● NORDIC PROFILE</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        items={heroPhotos}
      />
    </header>
  );
};

export default GalleryHero;
