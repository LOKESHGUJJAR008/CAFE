import React from 'react';
import { reviewsData } from '../data/reviews';
import Reveal from './Reveal';
import WaveDivider from './WaveDivider';

export const Reviews = () => {
  return (
    <section id="reviews" className="relative bg-espresso text-cream pt-16 pb-0">
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-semibold text-caramel">
              {reviewsData.badge}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-cream">
              {reviewsData.title}
            </h2>
            <p className="mt-3 text-beige/80 text-sm sm:text-base max-w-xl mx-auto">
              {reviewsData.subtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewsData.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-roast/30 border border-roast/50 shadow-warm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-playfair font-bold text-cream text-lg">
                        {rev.name}
                      </h4>
                      <span className="text-xs text-caramel">{rev.role}</span>
                    </div>
                    <span className="text-xs text-caramel font-semibold">{'★'.repeat(rev.rating)}</span>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-beige/80 italic leading-relaxed">
                    "{rev.review}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="text-xs text-beige/50 font-mono">
              [Placeholder: Reviews Section - Dark Espresso Rhythm]
            </span>
          </div>
        </Reveal>
      </div>

      {/* Wave transition into cream Final CTA section */}
      <WaveDivider color="#F5EBDD" height="56px" />
    </section>
  );
};

export default Reviews;
