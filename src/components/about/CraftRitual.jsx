import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getImage } from '../../data/images';
import { ANIMATION } from '../../config';
import ProgressiveImage from '../ProgressiveImage';

export const CraftRitual = ({ eyebrow, heading, cards }) => {
  const { prefersReducedMotion } = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
      y: -8,
      borderColor: '#A8612E',
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card) => (
            <motion.article
              key={card.number}
              variants={cardVariants}
              className="group bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012]
                         transition-all duration-500 overflow-hidden shadow-[0_4px_24px_rgba(31,22,18,0.04)]
                         hover:shadow-[0_16px_36px_rgba(201,160,18,0.18)] hover:-translate-y-1.5 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative border-b border-[#1F1612]/10">
                <ProgressiveImage
                  src={getImage(card.image)}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  placeholder={getImage(card.image)}
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-[#1F1612]/90 backdrop-blur-sm px-3 py-1 border border-[#C9A012]/40">
                  <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A012]">
                    Ritual {card.number}
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1 bg-[#FFFFFF]">
                <span className="font-cormorant text-4xl text-[#C9A012] font-semibold italic mb-2 block">
                  {card.number}
                </span>
                <h3 className="font-cormorant font-semibold text-2xl text-[#1F1612] group-hover:text-[#A8612E] transition-colors leading-tight mb-3">
                  {card.title}
                </h3>
                <p className="font-grotesk text-xs sm:text-sm text-[#1F1612]/70 leading-relaxed flex-1">
                  {card.description}
                </p>
                <div className="mt-6 pt-4 border-t border-[#1F1612]/10 flex items-center justify-between">
                  <span className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-[#C9A27E] font-semibold">
                    Tatva Standards
                  </span>
                  <span className="text-[#C9A012] font-grotesk text-xs group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CraftRitual;