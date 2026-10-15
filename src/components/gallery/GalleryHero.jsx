import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Calendar, Compass, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroLatteCroissant from '../../assets/images/gallery/hero/hero-latte-croissant.png';
import coffeeConversations01 from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';
import sweetCravings01 from '../../assets/images/gallery/sweet-cravings/01-dessert-espresso-terracotta.png';
import GalleryLightbox from './GalleryLightbox';

export const GalleryHero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const heroPhotos = [
    { src: coffeeConversations01, alt: 'Artisan Barista extraction ritual at Tatva Prime' },
    { src: heroLatteCroissant, alt: 'Signature pour-over and morning sunlight' },
    { src: sweetCravings01, alt: 'Espresso crema extraction' },
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
    <header className="relative bg-[#FAF7F2] text-[#14100E] pt-32 sm:pt-36 lg:pt-40 pb-8 sm:pb-12 border-b-2 border-[#14100E] overflow-hidden selection:bg-[#14100E] selection:text-[#FAF7F2]">
      
      {/* ── Top Running Archival Ticker (Full Width Edge-to-Edge) ── */}
      <div className="w-full border-y-2 border-[#14100E] bg-[#FAF7F2] py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 mb-8 overflow-x-auto scrollbar-none">
        <div className="w-full flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.28em] text-[#14100E]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#14100E]" />
            <span>TATVA PRIME VISUAL ARCHIVE // EDITION NO. 04</span>
          </div>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>LAT: 25.18° N · ELEVATION: 271M</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>CHIKMAGALUR SINGLE-ORIGIN PEABERRY</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>35MM MONOCHROME & LEICA Q3</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>SANCTUARY OPEN · 08:00 — 23:00</span>
          </div>
        </div>
      </div>

      {/* ── Main Full-Width Constructivist Hero Spread ── */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="border-2 border-[#14100E] bg-[#FAF7F2] shadow-[0_20px_60px_rgba(20,16,14,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#14100E]">
            
            {/* ══════════════════════════════════════════════════════════════
                BLOCK 1 (Left 4 Cols): Monograph Tower + Portrait with Square Stamp
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-[#FAF7F2]">
              {/* Top Text Header */}
              <div className="p-6 sm:p-8 border-b-2 border-[#14100E] bg-[#FAF7F2]">
                <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-4">
                  <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                    DOCUMENTARY — VOL. IV
                  </span>
                </div>
                <h1 className="font-grotesk font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter leading-[0.92] text-[#14100E] mb-3">
                  The Visual<br />Chronicle.
                </h1>
                <p className="font-grotesk text-xs uppercase tracking-wider text-[#14100E]/70 leading-relaxed">
                  A high-contrast visual archive documenting single-origin extraction rituals and brutalist space in Kota.
                </p>
              </div>

              {/* High Contrast Portrait with Overlapping Square Brand Stamp */}
              <div
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
                className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-[#14100E]"
              >
                <img
                  src={coffeeConversations01}
                  alt="Barista at work"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out opacity-90"
                />

                {/* Overlapping Solid White Square Brand Stamp */}
                <div className="absolute top-8 left-8 bg-[#FFFFFF] text-[#14100E] p-4 shadow-xl border-2 border-[#14100E] z-10 transition-transform duration-300 group-hover:scale-105">
                  <span className="block text-[8px] font-grotesk font-black tracking-[0.28em] uppercase text-[#14100E]/70">
                    TATVA
                  </span>
                  <span className="block text-lg font-grotesk font-black tracking-tight leading-none uppercase text-[#14100E]">
                    PRIME
                  </span>
                </div>

                {/* Stepped Bottom Label */}
                <div className="absolute bottom-4 left-4 bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 text-[10px] font-grotesk font-black uppercase tracking-wider text-[#14100E]">
                  SPECIMEN 01 / EXTRACTION
                </div>

                <div className="absolute bottom-4 right-4 bg-black/80 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Spec Footer */}
              <div className="p-4 border-t-2 border-[#14100E] bg-[#FAF7F2] flex items-center justify-between text-[10px] font-grotesk font-bold uppercase tracking-wider text-[#14100E]/70">
                <span>CURATION: TATVA LAB</span>
                <span className="text-[#C9A012]">● NORDIC PROFILE</span>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                BLOCK 2 (Center 5 Cols): Hero Panoramic Visual + Giant Display 9P
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#FAF7F2]">
              <div
                onClick={() => { setLightboxIndex(1); setLightboxOpen(true); }}
                className="relative h-full min-h-[380px] sm:min-h-[460px] overflow-hidden group cursor-pointer bg-[#14100E] border-b-2 border-[#14100E]"
              >
                <img
                  src={heroLatteCroissant}
                  alt="Overhead café landscape"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out opacity-90"
                />

                {/* Overlapping Stepped White Label Plate */}
                <div className="absolute top-6 left-6 sm:left-8 bg-[#FAF7F2] p-4 sm:p-5 shadow-xl border-2 border-[#14100E] z-10 max-w-[220px]">
                  <span className="block font-grotesk text-[9px] font-bold tracking-[0.3em] uppercase text-[#14100E]/60 mb-1">
                    TONIGHT
                  </span>
                  <h3 className="font-grotesk font-black text-2xl sm:text-3xl tracking-tight uppercase text-[#14100E] leading-none">
                    COFFEE<br />TALKS
                  </h3>
                  <div className="w-7 h-[2px] bg-[#14100E] mt-2.5" />
                </div>

                {/* Giant Iconic Display Numeral 9P (CNBC Prime Reference Signature) */}
                <div className="absolute right-6 sm:right-8 bottom-6 sm:bottom-8 font-grotesk font-black text-8xl sm:text-9xl lg:text-[140px] text-[#FAF7F2] tracking-tighter leading-none select-none z-10 drop-shadow-lg">
                  9<span className="text-4xl sm:text-6xl font-black align-top ml-0.5">P</span>
                </div>

                {/* Hover Cue */}
                <div className="absolute inset-0 bg-[#14100E]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-[#FAF7F2] text-[#14100E] border-2 border-[#14100E] px-4 py-2 font-grotesk font-black text-xs uppercase tracking-widest shadow-md flex items-center gap-2">
                    <ZoomIn className="w-4 h-4" />
                    <span>VIEW PANORAMA</span>
                  </div>
                </div>
              </div>

              {/* Sub-strip beneath Block 2 */}
              <div className="grid grid-cols-2 divide-x-2 divide-[#14100E]">
                <div className="p-4 sm:p-5 bg-[#FAF7F2]">
                  <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.25em] text-[#14100E]/60 block mb-1">
                    AIRFLOW ROAST
                  </span>
                  <span className="font-grotesk font-black text-sm sm:text-base text-[#14100E] uppercase tracking-tight">
                    ALTITUDE 1,450M
                  </span>
                </div>
                <div className="p-4 sm:p-5 bg-[#FAF7F2]">
                  <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.25em] text-[#14100E]/60 block mb-1">
                    NIGHT TIMETABLE
                  </span>
                  <span className="font-grotesk font-black text-sm sm:text-base text-[#14100E] uppercase tracking-tight">
                    SESSION: 9:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                BLOCK 3 (Right 3 Cols): Inverted Swiss Poster Specimen & Actions
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between bg-[#14100E] text-[#FAF7F2]">
              <div>
                {/* Stepped White Tag */}
                <div className="inline-block bg-[#FAF7F2] text-[#14100E] border-2 border-[#14100E] px-3 py-1 font-grotesk font-black text-[9px] uppercase tracking-[0.25em] mb-6 shadow-sm">
                  CURATOR SPECIMEN — 03
                </div>

                {/* Display 8P */}
                <div className="mb-6 pb-6 border-b border-[#FAF7F2]/20">
                  <div className="flex items-baseline justify-between">
                    <span className="font-grotesk font-black text-6xl sm:text-7xl text-[#FAF7F2] leading-none tracking-tighter">
                      8<span className="text-3xl font-black align-top">P</span>
                    </span>
                    <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A27E]">
                      ARTISAN ROAST
                    </span>
                  </div>
                  <div className="w-8 h-[2px] bg-[#FAF7F2] mt-3" />
                </div>

                {/* Technical Specs List */}
                <div className="space-y-3.5 mb-8 text-[11px] font-grotesk uppercase">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#FAF7F2]/10">
                    <span className="text-[#FAF7F2]/60">BEAN ORIGIN</span>
                    <span className="font-black text-[#FAF7F2]">CHIKMAGALUR</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#FAF7F2]/10">
                    <span className="text-[#FAF7F2]/60">VARIETAL</span>
                    <span className="font-black text-[#FAF7F2]">PEABERRY SLN 9</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#FAF7F2]/10">
                    <span className="text-[#FAF7F2]/60">PRESSURE</span>
                    <span className="font-black text-[#FAF7F2]">9.0 BAR EXTRACTION</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#FAF7F2]/60">ATMOSPHERE</span>
                    <span className="font-black text-[#FAF7F2]">BRUTALIST STONE</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6 border-t border-[#FAF7F2]/20">
                <a
                  href="#editorial-grid"
                  onClick={handleScrollToGrid}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-[#FAF7F2] text-[#14100E] hover:bg-[#C9A27E] font-grotesk font-black text-xs uppercase tracking-[0.2em] border-2 border-[#FAF7F2] transition-colors group"
                >
                  <span>01 / EXPLORE FULL GRID</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </a>

                <Link
                  to="/reserve"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-transparent text-[#FAF7F2] hover:bg-[#FAF7F2]/10 font-grotesk font-black text-xs uppercase tracking-[0.2em] border border-[#FAF7F2]/30 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C9A27E]" />
                  <span>02 / RESERVE TABLE</span>
                </Link>
              </div>

              {/* Lower Brand Footnote */}
              <div className="pt-6 mt-6 border-t border-[#FAF7F2]/10 flex items-center justify-between text-[9px] font-grotesk uppercase tracking-widest text-[#FAF7F2]/50">
                <span>TATVA PRIME</span>
                <span>KOTA ARCHIVE</span>
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
