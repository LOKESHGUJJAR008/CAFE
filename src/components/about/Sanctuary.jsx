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
                className="flex-shrink-0 w-[80%] md:w-[45%] lg:w-[35%] snap-start snap-center"
                whileHover={prefersReducedMotion ? {} : 'hover'}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  <ProgressiveImage
                    src={getImage(img.slot)}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    placeholder={getImage(img.slot)}
                    sizes="(max-width: 1023px) 80vw, (max-width: 1279px) 45vw, 35vw"
                  />
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
                className="aspect-[4/3] rounded-2xl overflow-hidden relative"
                whileHover={prefersReducedMotion ? {} : 'hover'}
              >
                <ProgressiveImage
                  src={getImage(img.slot)}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  placeholder={getImage(img.slot)}
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sanctuary;