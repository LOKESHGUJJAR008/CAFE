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
    <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-[#FBF7F1] text-[#1F1612] border-b border-[#1F1612]/10">
      <div className="max-w-2xl mx-auto">
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

        <div className="relative" ref={lineRef}>
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#1F1612]/10" />
          <div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-[#C9A012]"
            style={{
              height: prefersReducedMotion ? '100%' : `${lineHeight}%`,
              transformOrigin: 'top center',
            }}
          />

          <motion.div
            className="space-y-10"
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
                <div className="relative z-10 w-3.5 h-3.5 bg-[#C9A012] border-2 border-[#FFFFFF] shadow-sm flex-shrink-0" />
                <div className="mt-4 w-full max-w-md bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] p-6 text-center shadow-[0_4px_20px_rgba(31,22,18,0.04)] hover:shadow-[0_12px_28px_rgba(201,160,18,0.15)] transition-all duration-300">
                  <span className="font-cormorant font-bold text-3xl text-[#C9A012] italic block mb-2">
                    {item.year}
                  </span>
                  <p className="font-grotesk text-xs sm:text-sm text-[#1F1612]/75 leading-relaxed">
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