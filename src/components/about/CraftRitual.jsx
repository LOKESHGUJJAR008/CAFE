import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import pourImg from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';
import cupImg from '../../assets/images/gallery/sweet-cravings/02-topview-dessert-latte.png';
import beanImg from '../../assets/images/gallery/sweet-cravings/01-dessert-espresso-terracotta.png';

export const CraftRitual = ({
  eyebrow = 'Craft & Ritual',
  heading = 'The Tri-Pillar Extraction Standard',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const CRAFT_SPECIMENS = [
    {
      number: '01',
      title: 'The Terroir & Bean',
      badge: 'CURATION',
      image: beanImg,
      subtitle: 'Single-Origin Estate Arabica',
      description: 'Single-origin beans sourced directly from high-elevation estates in Chikmagalur. Roasted in small, deliberate batches to preserve bright notes of stone fruit and raw dark cocoa.',
      telemetry: [
        { label: 'Origin', value: 'Chikmagalur, 1,350m' },
        { label: 'Roast Curve', value: 'Light-Medium • 14 Min' },
        { label: 'Tasting Notes', value: 'Almond • Cacao Nib' },
      ],
    },
    {
      number: '02',
      title: 'The Extraction Ritual',
      badge: 'PRECISION',
      image: pourImg,
      subtitle: 'Gram-Scale Dial-in',
      description: 'Water temperature strictly maintained at 93.5°C with a calibrated 120 PPM mineral balance. Every shot extracted at 9.0 bars of pressure to capture velvety golden crema.',
      telemetry: [
        { label: 'Pressure', value: '9.0 Bar Precision' },
        { label: 'Brew Temp', value: '93.5°C Monitored' },
        { label: 'Ratio', value: '1:2.1 Gram Scale' },
      ],
    },
    {
      number: '03',
      title: 'The Sensory Pause',
      badge: 'SANCTUARY',
      image: cupImg,
      subtitle: 'Handmade Stoneware Ceramic',
      description: 'Served in custom hand-thrown stoneware ceramics designed to retain heat without burning the lip. Accompanied by quiet acoustics and warm natural light.',
      telemetry: [
        { label: 'Vessel', value: 'Handmade Ceramic' },
        { label: 'Acoustic Vibe', value: '42 dB Ambient Calm' },
        { label: 'Pace', value: 'Unhurried & Mindful' },
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF7F2] text-[#14100E] border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2]">
      <div className="w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b-2 border-[#14100E]">
          <div>
            <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-3">
              <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                {eyebrow}
              </span>
            </div>
            <h2 className="font-grotesk font-black text-3xl sm:text-5xl uppercase tracking-tighter text-[#14100E]">
              {heading}
            </h2>
          </div>
          <div className="font-grotesk text-xs uppercase tracking-widest text-[#14100E]/70 max-w-xs sm:text-right">
            THREE MEASURED PHASES OF ARTISANAL DEDICATION
          </div>
        </div>

        {/* 3-Column Constructivist Specimen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CRAFT_SPECIMENS.map((specimen, idx) => (
            <motion.article
              key={specimen.number}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group bg-[#FAF7F2] border-2 border-[#14100E] shadow-[4px_4px_0px_#14100E] hover:shadow-[7px_7px_0px_#A8612E] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Top Stamp Bar */}
                <div className="p-4 border-b-2 border-[#14100E] flex items-center justify-between bg-[#FAF7F2]">
                  <span className="font-mono text-xs font-black text-[#A8612E] tracking-widest">
                    SPECIMEN // {specimen.number}
                  </span>
                  <span className="font-grotesk text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 border border-[#14100E] bg-[#14100E] text-[#FAF7F2]">
                    {specimen.badge}
                  </span>
                </div>

                {/* Photo Plate */}
                <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-[#14100E] bg-[#14100E]">
                  <img
                    src={specimen.image}
                    alt={specimen.title}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#FAF7F2] border border-[#14100E] px-2 py-0.5">
                    <span className="font-grotesk text-[8px] font-black uppercase tracking-wider text-[#14100E]">
                      {specimen.subtitle}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-grotesk font-black text-2xl uppercase tracking-tight text-[#14100E] mb-3">
                    {specimen.title}
                  </h3>
                  <p className="font-grotesk text-xs sm:text-[13px] leading-relaxed text-[#14100E]/75 mb-6">
                    {specimen.description}
                  </p>
                </div>
              </div>

              {/* Bottom Telemetry Spec Grid */}
              <div className="p-4 bg-[#FAF7F2] border-t-2 border-[#14100E] divide-y divide-[#14100E]/15 font-grotesk">
                {specimen.telemetry.map((t, i) => (
                  <div key={i} className="py-1.5 flex items-center justify-between text-[10px]">
                    <span className="font-bold uppercase tracking-wider text-[#14100E]/60">
                      {t.label}
                    </span>
                    <span className="font-black uppercase tracking-wide text-[#14100E]">
                      {t.value}
                    </span>
                  </div>
                ))}
              </div>

            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftRitual;