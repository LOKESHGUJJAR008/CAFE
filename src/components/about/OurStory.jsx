import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import founderImg from '../../assets/images/gallery/slow-mornings/01-marble-latte-croissant.png';
import interiorImg from '../../assets/images/gallery/late-night/01-lamp-steam-book.png';

export const OurStory = ({ eyebrow = 'Our Beginning', heading, paragraphs }) => {
  const prefersReducedMotion = useReducedMotion();

  const defaultParagraphs = [
    'TATVA Café was born from a desire to create an aesthetic sanctuary that Kota\'s students, professionals and coffee lovers could genuinely call their own. We brought together modern minimalist coffee culture and heartfelt hospitality.',
    'Every batch of single-origin beans is roasted with precision and dialled in fresh daily by our passionate baristas. Whether you are studying for high-stakes exams, catching up with friends, or seeking a quiet corner — you will always find your cosy spot here.',
  ];

  const storyParagraphs = paragraphs && paragraphs.length > 0 ? paragraphs : defaultParagraphs;

  return (
    <section
      id="about-story"
      className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF7F2] text-[#14100E] border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2]"
    >
      <div className="w-full border-2 border-[#14100E] bg-[#FAF7F2] shadow-[0_16px_48px_rgba(20,16,14,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#14100E]">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT SPREAD: Dual-Layered Archival Photo Composition
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#FAF7F2] relative">
            <div className="relative">
              {/* Primary Large Archival Frame */}
              <div className="relative aspect-[4/3] border-2 border-[#14100E] overflow-hidden shadow-[5px_5px_0px_#14100E] group">
                <img
                  src={founderImg}
                  alt="Marble table with fresh brew at TATVA Café"
                  className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Stamp Tag */}
                <div className="absolute top-3 left-3 bg-[#FAF7F2] border-2 border-[#14100E] px-2.5 py-1 shadow-[2px_2px_0px_#14100E]">
                  <span className="font-grotesk text-[9px] font-black uppercase tracking-[0.2em] text-[#14100E]">
                    DOCUMENT — SPECIMEN 02
                  </span>
                </div>
              </div>

              {/* Secondary Floating Overlap Archival Plate */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden sm:block absolute -bottom-8 -right-4 w-48 sm:w-56 aspect-[4/3] border-2 border-[#14100E] bg-[#FAF7F2] p-2 shadow-[4px_4px_0px_#A8612E] z-10"
              >
                <div className="w-full h-full border border-[#14100E]/20 overflow-hidden relative">
                  <img
                    src={interiorImg}
                    alt="Study sanctuary and desk lamp atmosphere"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-[#14100E] text-[#FAF7F2] px-1 py-0.5 text-[8px] font-grotesk font-black uppercase">
                    Late Night Brew
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Monograph Caption */}
            <div className="mt-12 sm:mt-16 pt-4 border-t-2 border-[#14100E] flex items-center justify-between font-grotesk text-[10px] font-bold uppercase tracking-wider text-[#14100E]/70">
              <span>PHOTO REGISTER: 35MM MONOCHROME</span>
              <span className="text-[#A8612E]">TALWANDI • KOTA</span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT SPREAD: Editorial Typography & Manifesto Ledger
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#FAF7F2]">
            <div>
              {/* Eyebrow Stamp */}
              <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-6">
                <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                  {eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-grotesk font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter leading-[0.95] text-[#14100E] mb-8">
                {heading || 'Founded on a single aspiration — to brew belonging.'}
              </h2>

              {/* Narrative Text */}
              <div className="space-y-6 text-[#14100E]/80 font-grotesk text-sm sm:text-base leading-relaxed">
                {storyParagraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? 'first-letter:font-cormorant first-letter:text-5xl first-letter:font-bold first-letter:text-[#A8612E] first-letter:float-left first-letter:mr-3 first-letter:leading-none' : ''}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom 3-Metric Proof Ledger */}
            <div className="mt-10 pt-6 border-t-2 border-[#14100E] grid grid-cols-3 gap-4 font-grotesk">
              <div className="border-r-2 border-[#14100E]/20 pr-3">
                <span className="block font-black text-2xl sm:text-3xl text-[#14100E] leading-none mb-1">
                  100%
                </span>
                <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#14100E]/70">
                  Single-Origin Arabica
                </span>
              </div>

              <div className="border-r-2 border-[#14100E]/20 pr-3">
                <span className="block font-black text-2xl sm:text-3xl text-[#A8612E] leading-none mb-1">
                  42 dB
                </span>
                <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#14100E]/70">
                  Quiet Study Sanctuary
                </span>
              </div>

              <div>
                <span className="block font-black text-2xl sm:text-3xl text-[#14100E] leading-none mb-1">
                  15k+
                </span>
                <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#14100E]/70">
                  Cups Poured Daily
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;