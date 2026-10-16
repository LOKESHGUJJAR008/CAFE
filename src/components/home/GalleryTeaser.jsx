import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ZoomIn } from 'lucide-react';
import Lightbox from '../Lightbox';

// High-end photographic assets
import sanctuaryImg from '../../assets/images/about-sanctuary.jpg';
import latteDetailImg from '../../assets/images/about-latte-detail.jpg';
import heroCanImg from '../../assets/images/products/hero-can.jpg';
import slowMornings01 from '../../assets/images/gallery/slow-mornings/01-marble-latte-croissant.png';
import coffeeConversations01 from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';
import lateNight02 from '../../assets/images/gallery/late-night/02-candle-string-lights.png';

const GALLERY_IMAGES = [
  {
    id: 1,
    frame: '01A',
    label: 'The Talwandi Sanctuary',
    spec: 'NATURAL LIGHT · F/2.0 · 35MM',
    url: sanctuaryImg,
    span: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
  },
  {
    id: 2,
    frame: '02A',
    label: 'Artisan Microfoam Tulip',
    spec: 'MACRO 85MM · F/2.8',
    url: latteDetailImg,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    frame: '03A',
    label: 'Urban Can & Daylight Shadows',
    spec: 'ARCHITECTURAL · F/4.0',
    url: heroCanImg,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    frame: '04A',
    label: 'Marble Counter Ritual',
    spec: 'MORNING AMBIENCE · 50MM',
    url: slowMornings01,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 5,
    frame: '05A',
    label: 'Barista Espresso Extraction',
    spec: 'HIGH SPEED · 1/500S',
    url: coffeeConversations01,
    span: 'col-span-1 row-span-1',
  },
];

export const GalleryTeaser = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="gallery"
      className="w-full bg-[#14100E] text-[#FAF7F2] border-b-2 border-[#14100E] selection:bg-[#FAF7F2] selection:text-[#14100E] overflow-hidden"
      aria-label="Visual Diary"
    >
      {/* ── Top Film Sprocket Row ── */}
      <div className="border-b border-[#FAF7F2]/20 py-2 px-6 flex items-center justify-between select-none text-[9px] font-mono tracking-widest text-[#FAF7F2]/40 bg-[#0B0908]">
        <div className="flex items-center gap-4 overflow-hidden">
          <span>■ ■ ■</span>
          <span>KODAK TRI-X 400</span>
          <span>■ ■ ■</span>
          <span>TATVA DOCUMENTARY ARCHIVE</span>
          <span>■ ■ ■</span>
          <span>PROOF SHEET 02</span>
          <span>■ ■ ■</span>
        </div>
        <span className="hidden sm:inline">ALL CAMERA NEGATIVES UNTOUCHED</span>
      </div>

      {/* ── Full Width Section Header ── */}
      <div className="w-full px-6 sm:px-10 lg:px-16 py-8 border-b-2 border-[#FAF7F2]/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="inline-block bg-[#FAF7F2] text-[#14100E] px-3 py-1 font-grotesk font-black text-[9px] uppercase tracking-[0.25em] mb-2 shadow-sm">
            VISUAL DOCUMENTARY
          </span>
          <h2 className="font-grotesk font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#FAF7F2]">
            Moments at TATVA
          </h2>
        </div>
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#FAF7F2] text-xs font-grotesk font-bold uppercase tracking-[0.2em] text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#14100E] transition-all duration-300 shadow-md group self-start sm:self-auto"
        >
          <span>VIEW FULL ARCHIVE</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ── Full Width Darkroom Contact Sheet Grid (Single Frame Row) ── */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x border-b border-[#FAF7F2]/20 divide-[#FAF7F2]/20">
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={img.id}
            onClick={() => openLightbox(i)}
            className="group relative bg-[#14100E] p-3 sm:p-4 cursor-pointer hover:bg-[#1F1713] transition-colors flex flex-col justify-between"
          >
            {/* Film Edge Metadata */}
            <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-[#FAF7F2]/50 mb-2 px-1">
              <span>▲ {img.frame}</span>
              <span>{img.spec}</span>
            </div>

            {/* Photo Box */}
            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-black border border-[#FAF7F2]/10 group-hover:border-[#FAF7F2]/40 transition-colors">
              <img
                src={img.url}
                alt={img.label}
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out opacity-90 group-hover:opacity-100"
                loading="lazy"
              />

              {/* Red grease pencil proof stamp */}
              <div className="absolute top-2 right-2 text-red-500 font-mono text-[9px] font-bold border border-red-500 px-1 py-0.5 rotate-3 bg-black/60 pointer-events-none select-none">
                ✓ SELECT
              </div>

              {/* Hover Inspect Pill */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-[#FAF7F2] text-[#14100E] px-3.5 py-1.5 flex items-center gap-1.5 text-[10px] font-grotesk font-black uppercase tracking-wider shadow-xl">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>INSPECT</span>
                </div>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="mt-3 px-1">
              <span className="block font-grotesk font-bold text-xs uppercase tracking-wider text-[#FAF7F2] truncate group-hover:text-[#C9A27E] transition-colors">
                {img.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        images={GALLERY_IMAGES}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)}
      />
    </section>
  );
};

export default GalleryTeaser;
