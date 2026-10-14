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
    <section className="py-20 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[#FBF7F1] text-[#1F1612] border-b border-[#1F1612]/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-6"
            variants={imageVariants}
            style={{ willChange: 'transform' }}
          >
            <div className="group relative aspect-[4/5] bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] transition-all duration-500 overflow-hidden shadow-[0_8px_32px_rgba(31,22,18,0.06)]">
              <ProgressiveImage
                src={getImage('storyFounder')}
                alt="Founder in quiet moment with coffee"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                placeholder={getImage('storyFounder')}
                priority={false}
                sizes="(max-width: 1023px) 100vw, 55vw"
              />
              <div className="absolute top-4 left-4 bg-[#1F1612]/90 backdrop-blur-sm px-3 py-1 border border-[#C9A012]/40">
                <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A012]">
                  The Origin
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              className="bd-eyebrow block mb-4"
              variants={itemVariants}
            >
              {eyebrow}
            </motion.span>

            <motion.h2
              className="font-cormorant font-semibold text-5xl sm:text-6xl text-[#1F1612] leading-[1] tracking-[-0.02em] mb-6"
              variants={itemVariants}
            >
              {heading}
            </motion.h2>

            <motion.div
              className="space-y-5 text-[#1F1612]/75 font-grotesk text-sm sm:text-base leading-relaxed"
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