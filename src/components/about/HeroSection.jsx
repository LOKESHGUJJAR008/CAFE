import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Coffee, ArrowDown } from 'lucide-react';
import baristaPour from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';
import latteHero from '../../assets/images/gallery/hero/hero-latte-croissant.png';

export const HeroSection = ({
  headline = 'Where time slows.',
  eyebrow = 'OUR STORY • EST. 2024',
  subtitle = 'An artisan sanctuary in Talwandi, Kota — crafted for slow sips, rich single-origin brews, and unhurried conversations.',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollDown = (e) => {
    e.preventDefault();
    const target = document.getElementById('about-story');
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <header className="relative bg-[#FAF7F2] text-[#14100E] pt-4 sm:pt-6 pb-12 sm:pb-16 border-b-2 border-[#14100E] overflow-hidden selection:bg-[#14100E] selection:text-[#FAF7F2]">
      {/* ── Top Running Archival Ticker (Flush with Navbar, Zero Dead Space) ── */}
      <div className="w-full border-y-2 border-[#14100E] bg-[#FAF7F2] py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 mb-8 overflow-x-auto scrollbar-none">
        <div className="w-full flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.28em] text-[#14100E]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#14100E]" />
            <span>TATVA ARCHIVE // DOSSIER NO. 01</span>
          </div>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>LOCATION: TALWANDI, KOTA (LAT 25.18° N)</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>ESTABLISHED: 2024</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>CRAFT: 100% SINGLE-ORIGIN ARABICA</span>
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
                BLOCK 1 (Left 5 Cols): Monograph Tower + Manifesto
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 bg-[#FAF7F2]">
              <div>
                <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-6">
                  <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                    {eyebrow}
                  </span>
                </div>

                <h1 className="font-grotesk font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter leading-[0.9] text-[#14100E] mb-6">
                  Where Time<br />
                  <span className="font-cormorant italic font-semibold text-[#A8612E] lowercase text-5xl sm:text-6xl lg:text-7xl block tracking-tight">
                    slows down.
                  </span>
                </h1>

                <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#14100E]/75 leading-relaxed mb-8 max-w-md">
                  {subtitle}
                </p>
              </div>

              {/* Bottom Archival Telemetry Box */}
              <div className="pt-6 border-t-2 border-[#14100E]/20 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] font-grotesk font-bold uppercase tracking-wider text-[#14100E]">
                  <span className="flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-[#A8612E]" /> Extraction Method
                  </span>
                  <span className="text-[#A8612E]">9.0 Bar Dial-in</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-grotesk font-bold uppercase tracking-wider text-[#14100E]">
                  <span className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#A8612E]" /> Acoustics Profile
                  </span>
                  <span>42 dB Minimalist Ambient</span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href="#about-story"
                    onClick={handleScrollDown}
                    className="inline-flex items-center gap-2 bg-[#14100E] text-[#FAF7F2] px-5 py-2.5 text-xs font-grotesk font-black uppercase tracking-[0.2em] shadow-[3px_3px_0px_#A8612E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#A8612E] transition-all"
                  >
                    <span>Read The Story</span>
                    <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  </a>
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-2 border-2 border-[#14100E] text-[#14100E] px-4 py-2 text-xs font-grotesk font-black uppercase tracking-[0.2em] hover:bg-[#14100E] hover:text-[#FAF7F2] transition-colors"
                  >
                    View Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                BLOCK 2 (Center 4 Cols): Archival Photographic Plate
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-4 relative group min-h-[380px] lg:min-h-full overflow-hidden bg-[#14100E]">
              <img
                src={baristaPour}
                alt="Artisan Barista pouring pour-over coffee at TATVA Café"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Corner Stamp */}
              <div className="absolute top-4 left-4 bg-[#FAF7F2] border-2 border-[#14100E] px-2.5 py-1 shadow-[2px_2px_0px_#14100E]">
                <span className="font-grotesk text-[9px] font-black uppercase tracking-[0.2em] text-[#14100E]">
                  SPECIMEN PLATE // 01
                </span>
              </div>

              {/* Bottom Photo Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-sm border-2 border-[#14100E] p-3 shadow-[3px_3px_0px_#14100E]">
                <p className="font-grotesk text-[10px] font-black uppercase tracking-wider text-[#14100E] flex items-center justify-between">
                  <span>Pour-over Ritual in Morning Light</span>
                  <span className="text-[#A8612E]">Talwandi, Kota</span>
                </p>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                BLOCK 3 (Right 3 Cols): Telemetry Ledger & Specimen Index
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-3 flex flex-col justify-between p-6 sm:p-8 bg-[#FAF7F2]">
              <div>
                <div className="flex items-center justify-between border-b-2 border-[#14100E] pb-3 mb-6">
                  <span className="font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                    CURATOR SPECIMEN
                  </span>
                  <span className="font-mono text-xs font-bold text-[#A8612E]">#TAT-01</span>
                </div>

                <div className="space-y-4 font-grotesk">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#14100E]/60 block mb-0.5">
                      Bean Terroir
                    </span>
                    <span className="text-sm font-black uppercase text-[#14100E]">
                      Chikmagalur Single-Origin
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#14100E]/60 block mb-0.5">
                      Varietal Strain
                    </span>
                    <span className="text-sm font-black uppercase text-[#14100E]">
                      Peaberry SLN 9
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#14100E]/60 block mb-0.5">
                      Elevation & Soil
                    </span>
                    <span className="text-sm font-black uppercase text-[#14100E]">
                      1,350M · Red Laterite
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#14100E]/60 block mb-0.5">
                      Roast Profile
                    </span>
                    <span className="text-sm font-black uppercase text-[#14100E]">
                      Cinnamon to Medium Roast
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#14100E]/60 block mb-0.5">
                      Water Purity
                    </span>
                    <span className="text-sm font-black uppercase text-[#14100E]">
                      120 PPM Re-Mineralized
                    </span>
                  </div>
                </div>
              </div>

              {/* Inset Secondary Thumbnail Plate */}
              <div className="mt-6 pt-4 border-t-2 border-[#14100E] relative">
                <div className="relative aspect-[16/9] border-2 border-[#14100E] overflow-hidden group">
                  <img
                    src={latteHero}
                    alt="Latte art in ceramic cup"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-1 right-1 bg-[#14100E] text-[#FAF7F2] px-1.5 py-0.5 text-[8px] font-grotesk font-bold uppercase tracking-wider">
                    Ceramic Pour
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;