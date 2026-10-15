import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import headImg from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';
import roasterImg from '../../assets/images/gallery/sweet-cravings/01-dessert-espresso-terracotta.png';
import baristaImg from '../../assets/images/gallery/slow-mornings/01-marble-latte-croissant.png';
import managerImg from '../../assets/images/gallery/hero/hero-latte-croissant.png';

export const Connoisseurs = ({
  eyebrow = 'The Connoisseurs',
  heading = 'The Artisan Guild Behind The Cup',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const GUILD_MEMBERS = [
    {
      id: 'aarav',
      specimen: 'SPECIMEN // 01',
      name: 'Aarav Mehta',
      role: 'Head of Coffee',
      tag: 'SCA CERTIFIED',
      bio: '12 years navigating specialty green coffee sourcing across Coorg and Chikmagalur estates. Oversees extraction standards.',
      specialty: '9.0 Bar Dial-in & Water Mineral Balance',
      image: headImg,
    },
    {
      id: 'priya',
      specimen: 'SPECIMEN // 02',
      name: 'Priya Sharma',
      role: 'Lead Roaster',
      tag: 'BATCH MASTER',
      bio: 'Roasts each single-origin micro-lot in handcrafted 4kg drum batches, profiling delicate sweetness curves.',
      specialty: 'Drum Thermal Curves & Terroir Preservation',
      image: roasterImg,
    },
    {
      id: 'rohan',
      specimen: 'SPECIMEN // 03',
      name: 'Rohan Desai',
      role: 'Senior Barista',
      tag: 'POUR SPECIALIST',
      bio: 'Regional latte art champion and pour-over purist. Dedicated to microscopic grind distribution and texture balance.',
      specialty: 'V60 Slow Drip & Silk Microfoam',
      image: baristaImg,
    },
    {
      id: 'neha',
      specimen: 'SPECIMEN // 04',
      name: 'Neha Kapoor',
      role: 'Sanctuary Curator',
      tag: 'ATMOSPHERE & VIBE',
      bio: 'Architectural graduate overseeing the tactile guest experience, acoustic playlist curation, and sanctuary comfort.',
      specialty: 'Acoustics, Ambiance & Spatial Harmony',
      image: managerImg,
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
            DEDICATED COFFEE SPECIALISTS PRESERVING THE ARTISANAL PROTOCOL
          </div>
        </div>

        {/* 4-Card Constructivist Guild Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUILD_MEMBERS.map((member, idx) => (
            <motion.article
              key={member.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-[#FAF7F2] border-2 border-[#14100E] shadow-[4px_4px_0px_#14100E] hover:shadow-[6px_6px_0px_#A8612E] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Top Stamp */}
                <div className="p-3 border-b-2 border-[#14100E] flex items-center justify-between bg-[#FAF7F2]">
                  <span className="font-mono text-[10px] font-bold text-[#A8612E]">
                    {member.specimen}
                  </span>
                  <span className="font-grotesk text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 border border-[#14100E] bg-[#14100E] text-[#FAF7F2]">
                    {member.tag}
                  </span>
                </div>

                {/* Photo Portrait Frame */}
                <div className="relative aspect-square overflow-hidden border-b-2 border-[#14100E] bg-[#14100E]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[#FAF7F2]">
                    <span className="font-grotesk text-[9px] font-black uppercase tracking-wider bg-[#14100E] px-2 py-0.5 border border-[#FAF7F2]/30">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Member Details */}
                <div className="p-5">
                  <h3 className="font-grotesk font-black text-xl uppercase tracking-tight text-[#14100E] mb-1">
                    {member.name}
                  </h3>
                  <p className="font-grotesk text-xs text-[#14100E]/75 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Specialty Tag */}
              <div className="p-3.5 bg-[#FAF7F2] border-t-2 border-[#14100E] font-grotesk">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#14100E]/60 block mb-0.5">
                  Artisan Specialty
                </span>
                <span className="text-[11px] font-black uppercase text-[#A8612E] block truncate">
                  {member.specialty}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Connoisseurs;