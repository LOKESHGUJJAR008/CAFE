import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getImage } from '../../data/images';
import { ANIMATION } from '../../config';
import ProgressiveImage from '../ProgressiveImage';

export const Sanctuary = ({ eyebrow, heading, images }) => {
  const { prefersReducedMotion } = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: ANIMATION.ease },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.4, ease: ANIMATION.ease },
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

        <div className="hidden lg:block">
          <motion.div
            className="flex gap-6 overflow-x-auto scroll-snap-x snap-mandatory pb-8 -mx-6 px-6 scrollbar-none"
            style={{ scrollBehavior: 'smooth' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {images.map((img) => (
              <motion.div
                key={img.id}
                variants={itemVariants}
                className="flex-shrink-0 w-[80%] md:w-[45%] lg:w-[35%] snap-start snap-center group"
                whileHover={prefersReducedMotion ? {} : 'hover'}
              >
                <div className="bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] transition-all duration-500 overflow-hidden shadow-[0_4px_24px_rgba(31,22,18,0.04)] hover:shadow-[0_16px_36px_rgba(201,160,18,0.18)]">
                  <div className="aspect-[4/3] overflow-hidden relative border-b border-[#1F1612]/10">
                    <ProgressiveImage
                      src={getImage(img.slot)}
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      placeholder={getImage(img.slot)}
                      sizes="(max-width: 1023px) 80vw, (max-width: 1279px) 45vw, 35vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#1F1612]/90 backdrop-blur-sm px-2.5 py-1 border border-[#C9A012]/40">
                      <span className="font-grotesk text-[8px] font-bold uppercase tracking-[0.25em] text-[#C9A012]">
                        Aesthetic Corner
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#FFFFFF]">
                    <p className="font-cormorant font-semibold text-lg text-[#1F1612] line-clamp-1">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {images.map((img) => (
              <motion.div
                key={img.id}
                variants={itemVariants}
                className="group bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] transition-all duration-500 overflow-hidden shadow-sm mb-6"
                whileHover={prefersReducedMotion ? {} : 'hover'}
              >
                <div className="aspect-[4/3] overflow-hidden relative border-b border-[#1F1612]/10">
                  <ProgressiveImage
                    src={getImage(img.slot)}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    placeholder={getImage(img.slot)}
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#1F1612]/90 backdrop-blur-sm px-2.5 py-1 border border-[#C9A012]/40">
                    <span className="font-grotesk text-[8px] font-bold uppercase tracking-[0.25em] text-[#C9A012]">
                      Aesthetic Corner
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-[#FFFFFF]">
                  <p className="font-cormorant font-semibold text-lg text-[#1F1612] line-clamp-1">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sanctuary;