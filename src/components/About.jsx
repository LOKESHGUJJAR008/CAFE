import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { aboutData } from '../data/about';

/**
 * Story Section (replaces Home About)
 * Desktop: three-panel band, equal height (~520px)
 *   Left (38%): espresso panel with eyebrow, heading, 2 paragraphs, pill button
 *   Center (40%): image slot getHomeImage('story') with designed fallback
 *   Right (22%): cream panel with Est. 2021, vertical rule, Talwandi, Kota, and tagline
 * Mobile: purpose-built order: image (4/3) -> espresso panel -> slim cream strip
 */
export const Story = () => {
  const prefersReducedMotion = useReducedMotion();

  const renderVisualStage = (className = "") => (
    <div className={`relative overflow-hidden w-full h-full flex items-center justify-center ${className}`}>
      <img
        src="/images/gallery/cafe-1.webp"
        alt="TATVA Café atmosphere and story"
        width={600}
        height={520}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <section
      id="story"
      className="relative w-full bg-foam text-ink overflow-hidden"
    >
      {/* ── DESKTOP (>=1024px): Three-panel band, equal height ~520px ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:flex w-full h-[520px]"
      >
        {/* Left Panel: ~38% foam */}
        <div className="w-[38%] bg-[#FBF7F1] p-10 xl:p-12 flex flex-col justify-center border-r border-[#1F1612]/10">
          <span className="bd-eyebrow block mb-4">
            {aboutData.eyebrow}
          </span>

          <h2 className="font-cormorant font-semibold text-[#1F1612] text-4xl xl:text-5xl leading-[1] tracking-[-0.02em] mb-6">
            {aboutData.heading}
          </h2>

          <div className="space-y-3.5 text-[#1F1612]/70 text-sm leading-relaxed mb-8 font-grotesk">
            {aboutData.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <Link
            to="/about"
            className="bd-btn self-start"
          >
            Our Story
          </Link>
        </div>

        {/* Center Panel: ~40% image slot or fallback */}
        <div className="w-[40%] h-full">
          {renderVisualStage("h-full")}
        </div>

        {/* Right Panel: ~22% narrow cream panel */}
        <div className="w-[22%] bg-foam p-8 flex flex-col items-center justify-center text-center border-l border-latte/40/20">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-ink font-inter">
            {aboutData.est}
          </span>

          <div className="w-px h-10 bg-foam/25 my-4" />

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink font-inter">
            {aboutData.location}
          </span>

          <div className="w-px h-10 bg-foam/25 my-4" />

          <p className="font-playfair italic text-lg xl:text-xl text-caramel leading-snug max-w-[200px]">
            “{aboutData.tagline}”
          </p>
        </div>
      </motion.div>

      {/* ── MOBILE / TABLET (<1024px): Purpose-built vertical flow ── */}
      <div className="lg:hidden flex flex-col w-full">
        {/* 1. Image first (aspect 4/3) */}
        <div className="w-full aspect-[4/3] relative">
          {renderVisualStage()}
        </div>

        {/* 2. Full-width Espresso Panel */}
        <div className="w-full bg-foam px-6 py-12 sm:px-10 sm:py-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-2 block font-inter">
            {aboutData.eyebrow}
          </span>

          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-ink tracking-tight leading-[1.2] mb-5">
            {aboutData.heading}
          </h2>

          <div className="space-y-3.5 text-ink/85 text-sm sm:text-base leading-relaxed mb-7">
            {aboutData.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-foam/40 text-ink hover:bg-foam hover:text-ink text-xs sm:text-sm font-semibold tracking-wide transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
          >
            <span>Our Story</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3. Slim Cream Strip with Est. 2021, divider, Talwandi, Kota, and Tagline */}
        <div className="w-full bg-foam px-6 py-6 border-t border-latte/40/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink font-inter">
              {aboutData.est}
            </span>
            <div className="w-px h-4 bg-foam/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink font-inter">
              {aboutData.location}
            </span>
          </div>

          <p className="font-playfair italic text-base sm:text-lg text-caramel">
            “{aboutData.tagline}”
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story;
