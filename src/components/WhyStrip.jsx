import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const features = [
  { icon: '☕', title: 'Single-Origin Coffee', desc: 'Ethically sourced, freshly roasted' },
  { icon: '🥐', title: 'Fresh Bakes Daily', desc: 'Artisan pastries made in-house' },
  { icon: '🪑', title: 'Cozy Atmosphere', desc: 'Perfect for work or catching up' },
  { icon: '🌱', title: 'Veg-Friendly', desc: 'Plenty of vegetarian options' },
];

export const WhyStrip = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-foam py-16 md:py-24 px-6 sm:px-10" aria-label="Why choose us">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="text-center p-6"
            >
              <div className="text-4xl md:text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-playfair font-bold text-lg md:text-xl text-ink mb-2">{feature.title}</h3>
              <p className="text-ink/70 text-sm font-inter">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStrip;