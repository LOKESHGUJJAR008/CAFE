import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getImage } from '../../data/images';
import { ANIMATION } from '../../config';
import ProgressiveImage from '../ProgressiveImage';

export const OurStory = ({ eyebrow, heading, paragraphs }) => {
  const { prefersReducedMotion } = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: ANIMATION.ease },
    },
  };

  const imageVariants = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 40, scale: 1.02 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 1, ease: ANIMATION.ease },
      };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 bg-foam text-ink">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-7"
            variants={imageVariants}
            style={{ willChange: 'transform' }}
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
              <ProgressiveImage
                src={getImage('storyFounder')}
                alt="Founder in quiet moment with coffee"
                className="w-full h-full object-cover"
                placeholder={getImage('storyFounder')}
                priority={false}
                sizes="(max-width: 1023px) 100vw, 55vw"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-4 block font-inter"
              variants={itemVariants}
            >
              {eyebrow}
            </motion.span>

            <motion.h2
              className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-ink leading-snug mb-6"
              variants={itemVariants}
            >
              {heading}
            </motion.h2>

            <motion.div
              className="space-y-5 text-ink/75 text-base sm:text-[17px] leading-relaxed"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {paragraphs.map((p, i) => (
                <motion.p key={i} variants={itemVariants}>
                  {p}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;