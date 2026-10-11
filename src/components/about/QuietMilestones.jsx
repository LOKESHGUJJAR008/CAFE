import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ANIMATION } from '../../config';

export const QuietMilestones = ({ eyebrow, heading, items }) => {
  const { prefersReducedMotion } = useReducedMotion();
  const lineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !lineRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const progress = Math.min(1, Math.max(0, 1 - rect.top / viewportHeight));
            setLineHeight(progress * 100);
          }
        });
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    observer.observe(lineRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: ANIMATION.ease },
    },
  };

  return (
    <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-foam text-ink">
      <div className="max-w-xl mx-auto">
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

        <div className="relative" ref={lineRef}>
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-caramel to-transparent" />
          <div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-caramel"
            style={{
              height: prefersReducedMotion ? '100%' : `${lineHeight}%`,
              transformOrigin: 'top center',
            }}
          />

          <motion.div
            className="space-y-12 lg:space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {items.map((item) => (
              <motion.div
                key={item.year}
                variants={itemVariants}
                className="relative flex flex-col items-center"
              >
                <div className="relative z-10 w-4 h-4 rounded-full bg-foam border-2 border-caramel flex-shrink-0" />
                <div className="text-center mt-4 w-full max-w-xs">
                  <span className="font-playfair font-bold text-xl text-caramel block mb-1">
                    {item.year}
                  </span>
                  <p className="text-ink/75 text-sm sm:text-base leading-relaxed">
                    {item.text}
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

export default QuietMilestones;