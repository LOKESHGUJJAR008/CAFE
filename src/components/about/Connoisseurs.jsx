import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getImage } from '../../data/images';
import { ANIMATION } from '../../config';
import ProgressiveImage from '../ProgressiveImage';

export const Connoisseurs = ({ eyebrow, heading, members }) => {
  const { prefersReducedMotion } = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: ANIMATION.ease },
    },
    hover: {
      boxShadow: '0 0 0 2px #A8612E',
      transition: { duration: 0.3, ease: ANIMATION.ease },
    },
  };

  return (
    <section className="py-20 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[#FBF7F1] text-[#1F1612] border-b border-[#1F1612]/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14 lg:mb-18"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: ANIMATION.ease }}
        >
          <span className="bd-eyebrow block mb-3">
            {eyebrow}
          </span>
          <h2 className="font-cormorant font-semibold text-5xl sm:text-6xl text-[#1F1612] leading-[1] tracking-[-0.02em]">
            {heading}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {members.map((member) => (
            <motion.article
              key={member.name}
              variants={cardVariants}
              className="group bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012]
                         transition-all duration-500 overflow-hidden shadow-[0_4px_24px_rgba(31,22,18,0.04)]
                         hover:shadow-[0_16px_36px_rgba(201,160,18,0.18)] hover:-translate-y-1.5 flex flex-col text-left"
              whileHover={prefersReducedMotion ? {} : 'hover'}
            >
              <div className="aspect-[3/4] overflow-hidden relative border-b border-[#1F1612]/10">
                <ProgressiveImage
                  src={getImage(member.image)}
                  alt={`${member.name} portrait`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  placeholder={getImage(member.image)}
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                />
                <div className="absolute top-3 left-3 bg-[#1F1612]/90 backdrop-blur-sm px-2.5 py-1 border border-[#C9A012]/40">
                  <span className="font-grotesk text-[8px] font-bold uppercase tracking-[0.25em] text-[#C9A012]">
                    Tatva Artisan
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 bg-[#FFFFFF]">
                <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A012] mb-1 block">
                  {member.role}
                </span>
                <h3 className="font-cormorant font-semibold text-2xl text-[#1F1612] group-hover:text-[#A8612E] transition-colors leading-tight mb-2">
                  {member.name}
                </h3>
                <p className="font-grotesk text-xs text-[#1F1612]/70 leading-relaxed flex-1">
                  {member.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Connoisseurs;