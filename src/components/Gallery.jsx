import React from 'react';
import { galleryData } from '../data/gallery';
import Reveal from './Reveal';
import WaveDivider from './WaveDivider';

export const Gallery = () => {
  return (
    <section id="gallery" className="relative bg-cream text-espresso pt-16 pb-0">
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-semibold text-caramel">
              {galleryData.badge}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-espresso">
              {galleryData.title}
            </h2>
            <p className="mt-3 text-roast/80 text-sm sm:text-base max-w-xl mx-auto">
              {galleryData.subtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
            {galleryData.items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-cream-light rounded-3xl border border-beige/60 shadow-warm flex flex-col justify-between"
              >
                <div className="aspect-square bg-roast/10 rounded-2xl flex items-center justify-center p-2 overflow-hidden">
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="mt-3 px-2 pb-1 text-xs font-semibold text-espresso truncate">
                  {item.title}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="text-xs text-roast/50 font-mono">
              [Placeholder: Gallery Section - Placed Before Reviews, Cream Rhythm]
            </span>
          </div>
        </Reveal>
      </div>

      {/* Wave transition into dark espresso Reviews section */}
      <WaveDivider color="#241812" height="56px" />
    </section>
  );
};

export default Gallery;
