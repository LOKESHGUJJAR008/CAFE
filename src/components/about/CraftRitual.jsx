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
    <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-foam text-ink">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14 lg:mb-20"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: ANIMATION.ease }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-3 block font-inter">
            {eyebrow}
          </span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-ink leading-snug">
            {heading}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card) => (
            <motion.article
              key={card.number}
              variants={cardVariants}
              className="group rounded-2xl overflow-hidden bg-almond border border-transparent hover:border-caramel transition-colors duration-300"
              whileHover={prefersReducedMotion ? {} : 'hover'}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ProgressiveImage
                  src={getImage(card.image)}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  placeholder={getImage(card.image)}
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 lg:p-8">
                <span className="font-playfair text-3xl text-caramel/50 mb-3 block">
                  {card.number}
                </span>
                <h3 className="font-playfair font-bold text-xl lg:text-2xl text-ink mb-3">
                  {card.title}
                </h3>
                <p className="text-ink/70 text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CraftRitual;