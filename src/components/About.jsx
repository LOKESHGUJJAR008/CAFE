import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, MapPin, Coffee } from 'lucide-react';
import { aboutData } from '../data/about';

// High-end architectural and detail photography
import sanctuaryImg from '../assets/images/about-sanctuary.jpg';
import latteDetailImg from '../assets/images/about-latte-detail.jpg';

export const Story = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="story"
      className="relative w-full bg-[#FAF7F2] text-[#14100E] border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2] overflow-hidden"
      aria-label="The TATVA Story"
    >
      {/* ── Top Archival Running Ribbon (Full Width) ── */}
      <div className="border-b-2 border-[#14100E] py-2.5 px-6 overflow-hidden bg-[#FAF7F2] select-none">
        <div className="flex items-center justify-between gap-6 whitespace-nowrap text-xs text-[#14100E]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#14100E]/40" />
              <span className="font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#A8612E]">
                PROVENANCE & ARCHIVE · 01
              </span>
              <span className="w-8 h-[1px] bg-[#14100E]/40" />
              <span className="font-cormorant italic text-base font-medium text-[#14100E]">
                The Sanctuary in <span className="font-semibold not-italic">Talwandi</span>
              </span>
              <span className="w-8 h-[1px] bg-[#14100E]/40" />
              <span className="font-grotesk text-[11px] font-semibold uppercase tracking-wider text-[#14100E]/80">
                Where Time Slows Down
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3-Panel Swiss Editorial Grid (Full Width Edge-to-Edge) ── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-[#14100E] bg-[#FAF7F2]">
        
        {/* ══════════════════════════════════════════════════════════════
            PANEL 1: Narrative & Manifesto (Left ~38% / 5 cols)
            Interactive opposite color inversion on hover
            ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 p-8 sm:p-12 xl:p-14 flex flex-col justify-between bg-[#FAF7F2] hover:bg-[#14100E] transition-all duration-500 group cursor-default select-none">
          <div>
            {/* Eyebrow Stamp */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-[#14100E] text-[#FAF7F2] group-hover:bg-[#FAF7F2] group-hover:text-[#14100E] px-3 py-1 font-grotesk font-black text-[9px] uppercase tracking-[0.25em] transition-colors duration-300">
                OUR GENESIS · TALWANDI
              </span>
              <span className="font-grotesk text-[10px] uppercase tracking-widest text-[#A8612E] group-hover:text-[#C9A27E] font-bold transition-colors">
                EST. 2021
              </span>
            </div>

            {/* Massive Editorial Headline */}
            <h2 className="font-grotesk font-black text-4xl sm:text-5xl xl:text-6xl text-[#14100E] group-hover:text-[#FAF7F2] uppercase tracking-tight leading-[0.95] mb-6 transition-colors duration-300">
              More Than<br />
              <span className="font-cormorant italic font-normal text-[#A8612E] group-hover:text-[#C9A27E] transition-colors">
                Just Coffee.
              </span>
            </h2>

            {/* Prose */}
            <div className="space-y-4 text-xs sm:text-[13px] leading-relaxed text-[#14100E]/75 group-hover:text-[#FAF7F2]/80 font-grotesk transition-colors duration-300">
              <p>
                Nestled in the bustling student sanctuary of Talwandi, Kota, TATVA was founded with a singular aspiration: to create a warm, architectural refuge where time slows down. We unite modern minimalist coffee culture with heartfelt Indian hospitality.
              </p>
              <p>
                Every batch of single-origin Arabica is roasted with precision and dialed in daily by our passionate baristas. Whether you are studying for high-stakes exams, catching up with close friends, or seeking a quiet corner with a sketchbook, you'll always find your sanctuary here.
              </p>
            </div>

            {/* 3 Pillar Micro-Badges */}
            <div className="mt-8 pt-6 border-t border-[#14100E]/15 group-hover:border-[#FAF7F2]/20 flex flex-col gap-2.5 transition-colors">
              {[
                { num: '01', title: 'Single-Origin Arabica', sub: 'Dialed in daily at 9 bar pressure' },
                { num: '02', title: 'Acoustic Sanctuary', sub: 'High-speed optical fiber & quiet corners' },
                { num: '03', title: 'Artisanal Patisserie', sub: 'Fresh bakes handcrafted every morning' },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3 text-xs font-grotesk">
                  <span className="font-bold text-[#A8612E] group-hover:text-[#C9A27E] tracking-wider transition-colors">
                    {item.num}
                  </span>
                  <div>
                    <span className="font-semibold text-[#14100E] group-hover:text-[#FAF7F2] uppercase tracking-wider block transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#14100E]/50 group-hover:text-[#FAF7F2]/50 transition-colors">
                      {item.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-10 pt-4">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-[#14100E] group-hover:border-[#FAF7F2] px-8 py-3 text-xs font-grotesk font-bold uppercase tracking-[0.2em] text-[#14100E] group-hover:text-[#FAF7F2] group-hover:hover:!bg-[#FAF7F2] group-hover:hover:!text-[#14100E] transition-all duration-300 shadow-sm"
            >
              <span>EXPLORE FULL CHRONICLE</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 2: Cinematic Architectural Sanctuary Image (Center ~42% / 5 cols)
            ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-4 relative bg-[#14100E] overflow-hidden group min-h-[440px] lg:min-h-[620px] flex items-center justify-center">
          <img
            src={sanctuaryImg}
            alt="TATVA Café Sanctuary Interior with Golden Light and Oak Counter"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100"
          />

          {/* Top-Left Darkroom Archive Stamp */}
          <div className="absolute top-5 left-5 bg-[#FAF7F2] text-[#14100E] px-3.5 py-2 border border-[#14100E] shadow-xl z-10 select-none">
            <span className="block text-[8px] font-grotesk font-black tracking-[0.25em] uppercase text-[#14100E]/70">
              ARCHIVE NEGATIVE 04-A
            </span>
            <span className="block text-xs font-grotesk font-black tracking-tight leading-none uppercase text-[#14100E] mt-0.5">
              THE TALWANDI SANCTUARY
            </span>
          </div>

          {/* Bottom Coordinates Strip */}
          <div className="absolute bottom-5 inset-x-5 flex items-center justify-between bg-[#14100E]/80 backdrop-blur-md text-[#FAF7F2] px-4 py-2 border border-[#FAF7F2]/20 text-[10px] font-grotesk tracking-wider">
            <span className="flex items-center gap-1.5 uppercase font-bold text-[#C9A27E]">
              <MapPin className="w-3 h-3 text-[#A8612E]" />
              Talwandi, Kota · Rajasthan
            </span>
            <span className="font-mono text-[#FAF7F2]/60 hidden sm:inline">
              25.1384° N, 75.8456° E
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 3: Macro Craft Detail & Provenance Stats (Right ~25% / 3 cols)
            ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-3 flex flex-col divide-y-2 divide-[#14100E] bg-[#FAF7F2]">
          
          {/* Top Half: Macro Craft Photo (Microfoam Tulip & Limestone Table) */}
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden group bg-[#14100E]">
            <img
              src={latteDetailImg}
              alt="Artisanal Latte Microfoam Tulip Detail on Limestone Counter"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Minimal Inset Badge */}
            <div className="absolute top-4 right-4 bg-[#FAF7F2] text-[#14100E] px-2.5 py-1 text-[8px] font-grotesk font-black uppercase tracking-[0.2em] border border-[#14100E]">
              CRAFT RITUAL
            </div>
            <div className="absolute bottom-3 left-3 bg-[#14100E]/75 backdrop-blur-sm text-[#FAF7F2] px-2.5 py-1 text-[9px] font-grotesk tracking-wider uppercase">
              100% Arabica Micro-Lot
            </div>
          </div>

          {/* Bottom Half: Provenance & Manifesto Stats Box */}
          <div className="p-8 xl:p-10 flex flex-col justify-between flex-1 bg-[#FAF7F2] hover:bg-[#14100E] transition-all duration-500 group cursor-default select-none">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-grotesk font-black text-3xl sm:text-4xl text-[#14100E] group-hover:text-[#FAF7F2] tracking-tighter transition-colors">
                  2021
                </span>
                <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.25em] text-[#A8612E] group-hover:text-[#C9A27E] transition-colors">
                  FOUNDED
                </span>
              </div>

              <div className="w-8 h-[2px] bg-[#14100E] group-hover:bg-[#C9A27E] mb-6 transition-colors" />

              <p className="font-cormorant italic text-xl xl:text-2xl text-[#14100E] group-hover:text-[#FAF7F2] leading-snug mb-6 transition-colors">
                “Where every sip feels like home.”
              </p>
            </div>

            <div className="pt-4 border-t border-[#14100E]/15 group-hover:border-[#FAF7F2]/20 transition-colors">
              <span className="block font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-[#14100E]/60 group-hover:text-[#FAF7F2]/60">
                COMMUNITY RATING
              </span>
              <div className="flex items-center gap-1.5 mt-1 font-grotesk text-xs font-bold text-[#14100E] group-hover:text-[#FAF7F2]">
                <span className="text-[#A8612E] group-hover:text-[#C9A27E]">★★★★★</span>
                <span>4.9 / 5.0 (650+ Reviews)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Story;
