import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const QuietMilestones = ({
  eyebrow = 'Quiet Milestones',
  heading = 'The Archival Chronology',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const MILESTONES = [
    {
      year: '2019',
      status: 'COMMENCEMENT',
      title: 'The First Extraction in Talwandi',
      detail: 'TATVA opened its modest first espresso counter in Talwandi, Kota with a single Italian lever machine and a singular dream to introduce single-origin coffee to Rajasthan students.',
      coordinates: 'STAGE 01 // FOUNDATION',
    },
    {
      year: '2021',
      status: 'ROAST PROTOCOL',
      title: 'Our Signature Single-Origin Roast Born',
      detail: 'Formulated our direct-trade partnership with heritage estates in Chikmagalur, dialing in the signature cinnamon-medium roast curve that defines TATVA.',
      coordinates: 'STAGE 02 // DIRECT TERROIR',
    },
    {
      year: '2023',
      status: 'RECOGNITION',
      title: 'Celebrated as Kota\'s Acoustic Sanctuary',
      detail: 'Recognized across Rajasthan as the premier aesthetic study haven and specialty coffee house, hosting students, thinkers, and quiet conversations.',
      coordinates: 'STAGE 03 // COMMUNITY',
    },
    {
      year: '2024',
      status: 'PRESENT ERA',
      title: 'Architectural Expansion & Editorial Gallery',
      detail: 'Unveiled the expanded modern brutalist sanctuary space with dedicated study lofts, botanical courtyard, and precision analog cupping bars.',
      coordinates: 'STAGE 04 // PRIME SANCTUARY',
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
            TIMELINE OF MEASURED GROWTH IN KOTA
          </div>
        </div>

        {/* Archival Ledger Grid */}
        <div className="border-2 border-[#14100E] bg-[#FAF7F2] shadow-[0_16px_40px_rgba(20,16,14,0.06)] divide-y-2 divide-[#14100E]">
          {MILESTONES.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 hover:bg-[#14100E]/5 transition-colors group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                {/* Year + Status */}
                <div className="lg:col-span-3 flex sm:flex-col justify-between sm:justify-start gap-2">
                  <span className="font-grotesk font-black text-4xl sm:text-5xl lg:text-6xl text-[#14100E] leading-none tracking-tighter group-hover:text-[#A8612E] transition-colors">
                    {item.year}
                  </span>
                  <span className="font-mono text-[9px] font-bold text-[#A8612E] tracking-widest">
                    {item.coordinates}
                  </span>
                </div>

                {/* Milestone Details */}
                <div className="lg:col-span-7">
                  <div className="inline-block border border-[#14100E] bg-[#FAF7F2] px-2 py-0.5 text-[8px] sm:text-[9px] font-grotesk font-black uppercase tracking-wider mb-2">
                    {item.status}
                  </div>
                  <h3 className="font-grotesk font-black text-xl sm:text-2xl uppercase tracking-tight text-[#14100E] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-grotesk text-xs sm:text-sm text-[#14100E]/75 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                {/* Stage Indicator */}
                <div className="lg:col-span-2 text-right hidden lg:block">
                  <span className="w-3 h-3 inline-block bg-[#14100E] group-hover:bg-[#A8612E] transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuietMilestones;