import React, { useState } from 'react';
import { menuData } from '../data/menu';
import Reveal from './Reveal';
import WaveDivider from './WaveDivider';

export const Menu = () => {
  const [activeTab, setActiveTab] = useState(menuData.categories[0]?.id || 'coffee');

  return (
    <section id="menu" className="relative bg-cream text-espresso pt-16 pb-0">
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-semibold text-caramel">
              {menuData.badge}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-espresso">
              {menuData.title}
            </h2>
            <p className="mt-3 text-roast/80 text-sm sm:text-base max-w-xl mx-auto">
              {menuData.subtitle}
            </p>
          </div>

          {/* Horizontally scrollable category tabs for thumb-friendly mobile navigation */}
          <div className="mt-10 overflow-x-auto pb-2 scrollbar-none flex sm:justify-center items-center gap-2.5">
            {menuData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === cat.id
                    ? 'bg-espresso text-cream shadow-warm'
                    : 'bg-beige/30 text-espresso hover:bg-beige/60'
                }`}
              >
                {cat.name} ({cat.items.length})
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="text-xs text-roast/50 font-mono">
              [Placeholder: Tabbed Menu Section - Scrollable Mobile Tabs &amp; 5 Categories]
            </span>
          </div>
        </Reveal>
      </div>

      {/* Wave transition into dark espresso Atmosphere section */}
      <WaveDivider color="#241812" height="56px" />
    </section>
  );
};

export default Menu;
