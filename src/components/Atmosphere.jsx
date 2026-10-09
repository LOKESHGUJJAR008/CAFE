import React from 'react';
import { atmosphereData } from '../data/atmosphere';
import Reveal from './Reveal';
import WaveDivider from './WaveDivider';

export const Atmosphere = () => {
  return (
    <section id="atmosphere" className="relative bg-espresso text-cream pt-16 pb-0">
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-semibold text-caramel">
              {atmosphereData.badge}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-cream">
              {atmosphereData.title}
            </h2>
            <p className="mt-3 text-beige/80 text-sm sm:text-base max-w-xl mx-auto">
              {atmosphereData.subtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {atmosphereData.features.map((feat) => (
              <div
                key={feat.id}
                className="p-6 rounded-3xl bg-roast/30 border border-roast/50 shadow-warm"
              >
                <h3 className="font-playfair font-semibold text-cream text-lg">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs text-beige/80 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="text-xs text-beige/50 font-mono">
              [Placeholder: Café Atmosphere Section - Dark Espresso Rhythm]
            </span>
          </div>
        </Reveal>
      </div>

      {/* Wave transition into cream Gallery section */}
      <WaveDivider color="#F5EBDD" height="56px" />
    </section>
  );
};

export default Atmosphere;
