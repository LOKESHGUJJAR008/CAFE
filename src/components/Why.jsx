import React from 'react';
import { whyData } from '../data/why';
import Reveal from './Reveal';

export const Why = () => {
  return (
    <section id="why" className="py-20 px-6 bg-cream border-b border-latte/50">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-semibold text-caramel">
              {whyData.badge}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-playfair font-bold text-espresso">
              {whyData.title}
            </h2>
            <p className="mt-2 text-espresso/70 text-sm max-w-xl mx-auto">
              {whyData.subtitle}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyData.pillars.map((pillar) => (
              <div key={pillar.id} className="p-5 rounded-xl bg-latte/20 border border-latte/50">
                <h3 className="font-playfair font-bold text-espresso text-base">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs text-espresso/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <span className="text-xs text-espresso/50 font-mono">
              [Placeholder: Why Royal Bean Section - Ready]
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Why;
