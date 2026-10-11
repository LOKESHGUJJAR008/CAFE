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
    <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-foam text-ink">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14 lg:mb-16"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {members.map((member) => (
            <motion.article
              key={member.name}
              variants={cardVariants}
              className="text-center group"
              whileHover={prefersReducedMotion ? {} : 'hover'}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative mb-5">
                <ProgressiveImage
                  src={getImage(member.image)}
                  alt={`${member.name} portrait`}
                  className="w-full h-full object-cover"
                  placeholder={getImage(member.image)}
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                />
              </div>
              <h3 className="font-playfair font-bold text-lg text-ink mb-1">
                {member.name}
              </h3>
              <p className="text-caramel text-sm font-medium mb-2">
                {member.role}
              </p>
              <p className="text-ink/60 text-sm leading-relaxed">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Connoisseurs;