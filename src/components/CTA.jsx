import React from 'react';
import { ctaData } from '../data/cta';
import Reveal from './Reveal';
import WaveDivider from './WaveDivider';

export const CTA = () => {
  return (
    <section id="cta" className="relative bg-cream text-espresso pt-16 pb-0">
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <Reveal>
          <div className="p-8 sm:p-14 rounded-4xl bg-gradient-to-br from-espresso to-roast text-cream shadow-warm-lg border border-roast/60 text-center relative overflow-hidden">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-caramel bg-caramel/15 px-4 py-1.5 rounded-full border border-caramel/30">
              {ctaData.badge}
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-cream">
              {ctaData.title}
            </h2>
            <p className="mt-4 text-beige/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {ctaData.subtitle}
            </p>

            {/* Mobile-first thumb-friendly CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {ctaData.actions.map((act) => (
                <a
                  key={act.id}
                  href={act.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-warm text-center ${
                    act.primary
                      ? 'bg-caramel hover:bg-caramel-light text-espresso font-bold shadow-glow-caramel'
                      : 'bg-cream/10 hover:bg-cream/20 text-cream border border-cream/25'
                  }`}
                >
                  {act.label}
                </a>
              ))}
            </div>

            <div className="mt-8">
              <span className="text-xs text-beige/50 font-mono">
                [Placeholder: Final CTA Section - Thumb-Friendly Mobile Actions]
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Wave transition into dark espresso-dark Footer */}
      <WaveDivider color="#18100C" height="56px" />
    </section>
  );
};

export default CTA;
