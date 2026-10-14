import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ZoomIn, Sparkles } from 'lucide-react';
import GalleryLightbox from './GalleryLightbox';

// Static image imports
import heroLatteCroissant from '../../assets/images/gallery/hero/hero-latte-croissant.png';
import slowMornings01 from '../../assets/images/gallery/slow-mornings/01-marble-latte-croissant.png';
import slowMornings02 from '../../assets/images/gallery/slow-mornings/02-sunlit-wooden-table.png';
import slowMornings03 from '../../assets/images/gallery/slow-mornings/03-latte-heart-croissant.png';
import sweetCravings01 from '../../assets/images/gallery/sweet-cravings/01-dessert-espresso-terracotta.png';
import sweetCravings02 from '../../assets/images/gallery/sweet-cravings/02-topview-dessert-latte.png';
import lateNight01 from '../../assets/images/gallery/late-night/01-lamp-steam-book.png';
import lateNight02 from '../../assets/images/gallery/late-night/02-candle-string-lights.png';
import coffeeConversations01 from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';

const ALL_LIGHTBOX_ITEMS = [
  { src: coffeeConversations01, alt: 'Artisan barista craft pouring espresso' },
  { src: heroLatteCroissant, alt: 'Signature pour-over and morning sunlight' },
  { src: sweetCravings01, alt: 'Espresso extraction and golden crema' },
  { src: slowMornings01, alt: 'Marble counter with fresh croissant and latte' },
  { src: lateNight02, alt: 'Night ambience and glowing candlelit lounge' },
  { src: slowMornings02, alt: 'Sunlit architectural wood and serene corners' },
  { src: sweetCravings02, alt: 'Dessert pairings and single-origin coffee' },
  { src: lateNight01, alt: 'Late night quiet reading block with warm steam' },
];

export const EditorialGallery = () => {
  const prefersReducedMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const triggerRefs = useRef([]);

  const openItem = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#14100E] border-y border-[#14100E]/15 selection:bg-[#14100E] selection:text-[#FAF7F2]">
      {/* ── Section Title & Manifesto Header ── */}
      <div className="max-w-7xl mx-auto mb-10 sm:mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#14100E] pb-6">
          <div>
            <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.3em] text-[#A8612E] block mb-2">
              Modular Editorial Archive · Est. Kota
            </span>
            <h2 className="font-cormorant font-bold text-5xl sm:text-6xl lg:text-7xl text-[#14100E] leading-[0.95] tracking-[-0.03em] uppercase">
              The Prime Grid
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#14100E]/70 leading-relaxed">
              High-contrast visual documentary of coffee rituals, single-origin roasts, and unhurried architecture.
            </p>
          </div>
        </div>
      </div>

      {/* ── CNBC Prime Inspired Modular Grid Container ── */}
      <div className="max-w-7xl mx-auto border-2 border-[#14100E] bg-[#FAF7F2] shadow-[0_24px_60px_rgba(20,16,14,0.12)] overflow-hidden">
        
        {/* ══════════════════════════════════════════════════════════════
            ROW 1: Top 3-Column Asymmetric Cluster
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-[#14100E]">
          
          {/* [1-A] Col 1-4: "HEY HOTSHOT." Header + Vertical Portrait with Inverted Square Stamp */}
          <div className="md:col-span-4 border-b-2 md:border-b-0 md:border-r-2 border-[#14100E] flex flex-col justify-between bg-[#FAF7F2]">
            {/* Top Text Plate */}
            <div className="p-6 sm:p-8 border-b-2 border-[#14100E] bg-[#FAF7F2] flex flex-col items-end text-right">
              <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.25em] text-[#14100E]/50 mb-1">
                Tonight
              </span>
              <h3 className="font-grotesk font-black text-3xl sm:text-4xl text-[#14100E] tracking-tight leading-[0.95] uppercase">
                Hey<br />Hotshot.
              </h3>
              <div className="w-8 h-[2px] bg-[#14100E] mt-3" />
            </div>

            {/* Photo with Inverted Square Brand Stamp */}
            <div
              onClick={() => openItem(0)}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-[#14100E]"
            >
              <img
                src={coffeeConversations01}
                alt="Barista at work"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out opacity-90"
              />
              {/* Solid White Brand Square */}
              <div className="absolute top-1/2 left-6 -translate-y-1/2 bg-[#FFFFFF] text-[#14100E] p-3.5 shadow-lg border-2 border-[#14100E] z-10 transition-transform duration-300 group-hover:scale-105">
                <span className="block text-[8px] font-grotesk font-black tracking-[0.25em] uppercase text-[#14100E]/70">
                  TATVA
                </span>
                <span className="block text-base font-grotesk font-black tracking-tight leading-none uppercase text-[#14100E]">
                  PRIME
                </span>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white p-1 text-xs">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* [1-B & 1-C] Col 5-12: "MONEY TALKS / 9P" Wide Atmospheric Center & Right */}
          <div className="md:col-span-8 flex flex-col justify-between bg-[#FAF7F2]">
            <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden border-b-2 border-[#14100E] group cursor-pointer"
                 onClick={() => openItem(1)}>
              <img
                src={heroLatteCroissant}
                alt="Overhead café landscape"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              {/* Overlapping White Label Plate */}
              <div className="absolute top-4 sm:top-6 left-6 sm:left-10 bg-[#FAF7F2] p-4 sm:p-6 shadow-md border-2 border-[#14100E] z-10">
                <span className="block font-grotesk text-[9px] font-bold tracking-[0.3em] uppercase text-[#14100E]/60 mb-1">
                  Tonight
                </span>
                <h3 className="font-grotesk font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight uppercase text-[#14100E] leading-none">
                  Coffee<br />Talks
                </h3>
                <div className="w-8 h-[2px] bg-[#14100E] mt-2.5" />
              </div>

              {/* Giant Display Numeral 9P */}
              <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 font-grotesk font-black text-7xl sm:text-8xl lg:text-9xl text-[#14100E] tracking-tighter leading-none select-none z-10 drop-shadow-sm">
                9<span className="text-4xl sm:text-5xl font-black align-top ml-0.5">P</span>
              </div>
            </div>

            {/* Split sub-strip beneath 1-B */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#14100E]">
              <div className="p-5 sm:p-6 bg-[#FAF7F2] flex items-center justify-between">
                <div>
                  <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.25em] text-[#14100E]/60 block mb-1">
                    Airflow Roast
                  </span>
                  <span className="font-grotesk font-black text-lg text-[#14100E] uppercase tracking-tight">
                    Altitude 1,450M
                  </span>
                </div>
                <span className="font-grotesk font-black text-2xl text-[#C9A012]">✦</span>
              </div>
              <div className="p-5 sm:p-6 bg-[#FAF7F2] flex items-center justify-between">
                <div>
                  <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.25em] text-[#14100E]/60 block mb-1">
                    Schedule
                  </span>
                  <span className="font-grotesk font-black text-lg text-[#14100E] uppercase tracking-tight">
                    Night Session: 9:00 PM
                  </span>
                </div>
                <div className="w-3 h-3 bg-[#14100E]" />
              </div>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            ROW 2: Action Steam "9 / WEDNESDAY —" & Manifesto Block
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-[#14100E]">
          
          {/* [2-A] Col 1-7: Wide Photo with Giant Watermark '9' & Overlapping "WEDNESDAY —" Plate */}
          <div
            onClick={() => openItem(2)}
            className="md:col-span-7 border-b-2 md:border-b-0 md:border-r-2 border-[#14100E] relative aspect-[16/10] overflow-hidden group cursor-pointer bg-[#14100E]"
          >
            <img
              src={sweetCravings01}
              alt="Espresso machine extraction"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out opacity-85"
            />
            {/* Giant Faded White Watermark 9 */}
            <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 font-grotesk font-black text-[120px] sm:text-[180px] lg:text-[220px] text-[#FAF7F2]/40 tracking-tighter leading-none select-none pointer-events-none">
              9
            </div>

            {/* Stepped White Tag Overlapping Right Edge */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#FAF7F2] p-5 sm:p-7 shadow-md border-l-2 border-y-2 border-[#14100E] z-10 text-left">
              <span className="block font-grotesk font-black text-xl sm:text-2xl tracking-tight uppercase text-[#14100E] leading-tight">
                Wednes-<br />Day
              </span>
              <div className="w-6 h-[2px] bg-[#14100E] mt-2.5" />
            </div>
          </div>

          {/* [2-B] Col 8-12: The Iconic Manifesto Text Block with Stepped Photo Fragment */}
          <div className="md:col-span-5 bg-[#FAF7F2] flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.3em] text-[#A8612E] block mb-3">
                Statement No. 03
              </span>
              <h3 className="font-grotesk font-black text-2xl sm:text-3xl lg:text-4xl text-[#14100E] tracking-tight leading-[1] uppercase">
                Point is ladies<br />
                and gentlemen<br />
                that coffee_
              </h3>
            </div>

            {/* Stepped 3x3 Photo Mosaic Fragment */}
            <div className="mt-8 border-2 border-[#14100E] bg-[#14100E] p-1 shadow-sm">
              <div className="grid grid-cols-3 gap-1 aspect-[3/2] overflow-hidden">
                <img src={slowMornings03} alt="Fragment 1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                <img src={lateNight01} alt="Fragment 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                <img src={sweetCravings02} alt="Fragment 3" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="bg-[#FAF7F2] p-2 flex justify-between items-center text-[8px] font-grotesk font-bold uppercase tracking-widest text-[#14100E]">
                <span>Contact Sheet · 35mm</span>
                <span>Frame 09</span>
              </div>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            ROW 3: Macro Engraving "8P", Night Bokeh, & Architectural Slices
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-[#14100E]">
          
          {/* [3-A] Col 1-4: Abstract Layered Geometric Slices */}
          <div className="md:col-span-4 border-b-2 md:border-b-0 md:border-r-2 border-[#14100E] flex flex-col bg-[#14100E] overflow-hidden">
            <div className="p-4 bg-[#FAF7F2] border-b-2 border-[#14100E] flex justify-between items-center">
              <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.25em] text-[#14100E]">
                Perspective
              </span>
              <span className="font-grotesk text-[9px] text-[#14100E]/50">324005 KOTA</span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer" onClick={() => openItem(3)}>
              <img
                src={slowMornings01}
                alt="Architectural lines"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/40 to-transparent">
                <span className="font-grotesk text-[9px] font-bold text-white tracking-[0.2em] uppercase">
                  Marble &amp; Shadows
                </span>
              </div>
            </div>
          </div>

          {/* [3-B] Col 5-8: Macro Texture with Bold "8P / AMERICAN GREED" Plate */}
          <div
            onClick={() => openItem(4)}
            className="md:col-span-4 border-b-2 md:border-b-0 md:border-r-2 border-[#14100E] relative aspect-[4/3] overflow-hidden group cursor-pointer bg-[#14100E]"
          >
            <img
              src={slowMornings02}
              alt="Texture detail"
              className="w-full h-full object-cover grayscale contrast-130 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            {/* Bold 8P & Artisan Roast Label Plate */}
            <div className="absolute left-6 bottom-4 flex items-baseline gap-3 z-10 bg-[#FAF7F2]/95 backdrop-blur-xs p-3 border-2 border-[#14100E] shadow-md">
              <span className="font-grotesk font-black text-4xl sm:text-5xl text-[#14100E] tracking-tighter leading-none">
                8<span className="text-2xl font-black align-top ml-0.5">P</span>
              </span>
              <div>
                <span className="block font-grotesk text-[9px] font-bold tracking-[0.25em] uppercase text-[#14100E]">
                  Artisan Roast
                </span>
                <div className="w-6 h-[2px] bg-[#14100E] mt-1" />
              </div>
            </div>
          </div>

          {/* [3-C] Col 9-12: Dark Bokeh Night with Solid White Square Brand Badge */}
          <div
            onClick={() => openItem(4)}
            className="md:col-span-4 relative aspect-[4/3] bg-[#14100E] overflow-hidden flex items-center justify-center group cursor-pointer"
          >
            <img
              src={lateNight02}
              alt="Night café bokeh"
              className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            {/* Centered White Square Badge */}
            <div className="bg-[#FFFFFF] text-[#14100E] p-5 shadow-2xl border-2 border-[#14100E] z-10 text-center transition-transform duration-300 group-hover:scale-105">
              <span className="block text-[9px] font-grotesk font-bold tracking-[0.3em] uppercase text-[#14100E]/70 mb-0.5">
                TATVA
              </span>
              <span className="block text-xl font-grotesk font-black tracking-tight leading-none uppercase text-[#14100E]">
                PRIME
              </span>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            ROW 4: Car Chasers 9P, Flipping Wars White Block, & Lounge 8P
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-[#14100E]">
          
          {/* [4-A] Col 1-4: Close-Up with "9P / CRAFT CHASERS" and Bleeding "PRIME" */}
          <div
            onClick={() => openItem(5)}
            className="md:col-span-4 border-b-2 md:border-b-0 md:border-r-2 border-[#14100E] relative aspect-square overflow-hidden bg-[#14100E] group cursor-pointer"
          >
            <img
              src={coffeeConversations01}
              alt="Craft extraction"
              className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            {/* Top Numeral Tag */}
            <div className="absolute top-5 left-5 z-10">
              <span className="font-grotesk font-black text-5xl text-[#FFFFFF] tracking-tighter leading-none block">
                9<span className="text-2xl font-black align-top ml-0.5">P</span>
              </span>
              <span className="block font-grotesk text-[8px] font-bold tracking-[0.25em] text-[#FFFFFF]/80 uppercase mt-1">
                Craft Chasers —
              </span>
            </div>

            {/* Giant Bleeding "PRIME" at bottom */}
            <div className="absolute -bottom-5 -left-2 font-grotesk font-black text-7xl sm:text-8xl text-[#FFFFFF]/90 tracking-tighter uppercase pointer-events-none select-none">
              PRIME
            </div>
          </div>

          {/* [4-B] Col 5-8: Pure Off-White Geometric Center Tile "FLIPPING WARS" */}
          <div className="md:col-span-4 border-b-2 md:border-b-0 md:border-r-2 border-[#14100E] bg-[#FAF7F2] p-8 sm:p-12 flex flex-col justify-center items-center text-center">
            <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.3em] text-[#14100E]/50 mb-3">
              Monday
            </span>
            <h3 className="font-grotesk font-black text-3xl sm:text-4xl uppercase tracking-tight text-[#14100E] leading-[1]">
              Flipping<br />Wars: Kota
            </h3>
            <div className="w-8 h-[2px] bg-[#14100E] mt-3.5 mb-2" />
            <span className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-[#A8612E] font-semibold">
              The Artisan Grind
            </span>
          </div>

          {/* [4-C] Col 9-12: Modern Architectural Lounge with Giant "8P" */}
          <div
            onClick={() => openItem(6)}
            className="md:col-span-4 relative aspect-square overflow-hidden bg-[#FAF7F2] group cursor-pointer"
          >
            <img
              src={slowMornings02}
              alt="Modern lounge architecture"
              className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Stepped White Cutout Edge with Giant 8P */}
            <div className="absolute bottom-5 right-5 bg-[#FAF7F2] p-4 sm:p-6 border-2 border-[#14100E] shadow-lg z-10 text-right">
              <span className="font-grotesk font-black text-6xl sm:text-7xl text-[#14100E] tracking-tighter leading-none block">
                8<span className="text-3xl font-black align-top ml-0.5">P</span>
              </span>
              <span className="block font-grotesk text-[8px] font-bold tracking-[0.25em] text-[#14100E]/70 uppercase mt-1">
                Lounge Prime
              </span>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            ROW 5: "GIDDYUP. —", Inverted Black Stamp, and Final "9P"
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* [5-A] Col 1-4: "GIDDYUP. —" Horizontal Landscape Plate */}
          <div
            onClick={() => openItem(7)}
            className="md:col-span-4 border-b-2 md:border-b-0 md:border-r-2 border-[#14100E] relative aspect-[16/9] overflow-hidden bg-[#FAF7F2] group cursor-pointer"
          >
            {/* Top Label Tag */}
            <div className="absolute top-0 left-6 bg-[#FAF7F2] px-4 py-2 border-b-2 border-x-2 border-[#14100E] z-10">
              <span className="font-grotesk text-[9px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                Giddyup. —
              </span>
            </div>
            <img
              src={lateNight01}
              alt="Late evening coffee"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          </div>

          {/* [5-B] Col 5-8: Craft Texture with Inverted Black Square Brand Stamp */}
          <div className="md:col-span-4 border-b-2 md:border-b-0 md:border-r-2 border-[#14100E] relative aspect-[16/9] bg-[#14100E] overflow-hidden flex items-center justify-center group cursor-pointer"
               onClick={() => openItem(0)}>
            <img
              src={sweetCravings01}
              alt="Burlap texture"
              className="w-full h-full object-cover grayscale contrast-150 opacity-40 group-hover:opacity-60 transition-all duration-700"
            />
            {/* Inverted Black Box with Gold Text */}
            <div className="bg-[#14100E] text-[#FFFFFF] p-5 shadow-2xl border-2 border-[#FAF7F2] z-10 text-center transition-transform duration-300 group-hover:scale-105">
              <span className="block text-[8px] font-grotesk font-black tracking-[0.3em] uppercase text-[#C9A012] mb-0.5">
                TATVA
              </span>
              <span className="block text-xl font-grotesk font-black tracking-tight leading-none uppercase text-[#FFFFFF]">
                PRIME
              </span>
            </div>
          </div>

          {/* [5-C] Col 9-12: High Action Detail with Bold "9P" */}
          <div
            onClick={() => openItem(1)}
            className="md:col-span-4 relative aspect-[16/9] overflow-hidden bg-[#FAF7F2] group cursor-pointer"
          >
            <img
              src={heroLatteCroissant}
              alt="Action pour"
              className="w-full h-full object-cover grayscale contrast-120 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute right-6 bottom-4 font-grotesk font-black text-6xl sm:text-7xl text-[#14100E] tracking-tighter leading-none z-10 select-none">
              9<span className="text-3xl font-black align-top ml-0.5">P</span>
            </div>
          </div>

        </div>

      </div>

      {/* ── Accessible Full-Screen Lightbox ── */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        images={ALL_LIGHTBOX_ITEMS}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex(
            (prev) => (prev - 1 + ALL_LIGHTBOX_ITEMS.length) % ALL_LIGHTBOX_ITEMS.length
          )
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev + 1) % ALL_LIGHTBOX_ITEMS.length)
        }
        triggerElementRef={triggerRefs}
        activeTriggerIndex={lightboxIndex}
      />
    </section>
  );
};

export default EditorialGallery;
