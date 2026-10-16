import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Coffee } from 'lucide-react';
import { menuTeaserData } from '../../data/menuTeaser';

// High-end food & beverage images
import heroLatteImg from '../../assets/images/gallery/hero/hero-latte-croissant.png';
import latteDetailImg from '../../assets/images/about-latte-detail.jpg';

const MENU_CATEGORIES = [
  {
    id: 'coffee',
    name: 'Espresso & Filter Coffee',
    desc: 'Classico, Flat White, Cortado & Single-Origin Pour-overs',
    price: 'FROM ₹119',
    badge: 'Arabica 100%',
  },
  {
    id: 'cold-coffee',
    name: 'Cold Brews & Nitro Cans',
    desc: '18-Hour Slow Steeped, Salted Caramel & Chic Latte Cache',
    price: 'FROM ₹180',
    badge: 'Nitro Infused',
  },
  {
    id: 'tea',
    name: 'Artisan Teas & Infusions',
    desc: 'Kashmiri Saffron Kahwa, Japanese Ceremonial Matcha',
    price: 'FROM ₹149',
    badge: 'Whole Leaf',
  },
  {
    id: 'desserts',
    name: 'Handcrafted Patisserie',
    desc: 'Almond Croissant, Dark Chocolate Truffle, Basque Cheesecake',
    price: 'FROM ₹169',
    badge: 'Baked Daily',
  },
  {
    id: 'snacks',
    name: 'Artisan Savouries & Breads',
    desc: 'Sourdough Toasties, Truffle Fries, Avocado Tartine',
    price: 'FROM ₹159',
    badge: 'Pure Vegetarian',
  },
];

export const MenuTeaser = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="menu-teaser"
      className="w-full bg-[#FAF7F2] text-[#14100E] border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2] overflow-hidden"
      aria-label="Our Menu"
    >
      {/* ── Top Running Archival Ticker ── */}
      <div className="border-b-2 border-[#14100E] py-2.5 px-6 overflow-hidden bg-[#FAF7F2] select-none">
        <div className="flex items-center justify-between gap-6 whitespace-nowrap text-xs text-[#14100E]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#14100E]/40" />
              <span className="font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#A8612E]">
                CULINARY ROSTER · ISSUE 04
              </span>
              <span className="w-8 h-[1px] bg-[#14100E]/40" />
              <span className="font-cormorant italic text-base font-medium text-[#14100E]">
                Single-Origin Brews & <span className="font-semibold not-italic">Daily Patisserie</span>
              </span>
              <span className="w-8 h-[1px] bg-[#14100E]/40" />
              <span className="font-grotesk text-[11px] font-semibold uppercase tracking-wider text-[#14100E]/80">
                100% Pure Vegetarian Kitchen
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2-Column Full Width Edge-to-Edge Grid (Zero Wasted Space) ── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-[#14100E]">
        
        {/* Left Column: Menu Categories (~58%) */}
        <div className="lg:col-span-7 p-8 sm:p-12 xl:p-16 flex flex-col justify-between bg-[#FAF7F2]">
          <div>
            <div className="inline-block bg-[#14100E] text-[#FAF7F2] px-3 py-1 font-grotesk font-black text-[9px] uppercase tracking-[0.25em] mb-4 shadow-sm">
              DAILY HARVEST & EXTRACTION
            </div>
            <h2 className="font-grotesk font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#14100E] mb-4">
              Our Menu.
            </h2>
            <p className="font-grotesk text-xs sm:text-sm text-[#14100E]/70 max-w-md leading-relaxed mb-8">
              We craft nourishing, single-origin brews, housemade bakes, and artisan snacks — all served with warmth and intention in Talwandi.
            </p>

            {/* Interactive Category List */}
            <div className="flex flex-col divide-y-2 divide-[#14100E] border-y-2 border-[#14100E]">
              {MENU_CATEGORIES.map((cat, i) => (
                <Link
                  key={cat.id}
                  to={`/menu?category=${cat.id}`}
                  onMouseEnter={() => setActiveIdx(i)}
                  className="py-4 sm:py-5 px-3 sm:px-4 flex items-center justify-between gap-4 transition-all duration-300 hover:bg-[#14100E] hover:text-[#FAF7F2] group cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-grotesk text-xs font-bold text-[#A8612E] group-hover:text-[#C9A27E] transition-colors">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="font-grotesk font-bold text-sm sm:text-base uppercase tracking-wider text-[#14100E] group-hover:text-[#FAF7F2] transition-colors">
                        {cat.name}
                      </h4>
                      <p className="font-grotesk text-[11px] text-[#14100E]/60 group-hover:text-[#FAF7F2]/70 transition-colors hidden sm:block">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-grotesk text-[11px] font-bold tracking-wider text-[#14100E] group-hover:text-[#C9A27E] transition-colors whitespace-nowrap">
                      {cat.price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#14100E] group-hover:text-[#FAF7F2] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#14100E] text-xs font-grotesk font-bold uppercase tracking-[0.2em] text-[#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] transition-all duration-300 shadow-sm"
            >
              <span>EXPLORE COMPLETE MENU</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Stage with Real Atmosphere Photograph (~42%) */}
        <div className="lg:col-span-5 relative bg-[#14100E] overflow-hidden group flex items-center justify-center min-h-[460px] lg:min-h-full">
          <img
            src={heroLatteImg}
            alt="Artisanal Pour-Over and Fresh Croissant"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />

          {/* Luxury Archival Plate Overlay */}
          <div className="absolute top-6 left-6 bg-[#FAF7F2] text-[#14100E] p-4 border border-[#14100E] shadow-2xl z-10 select-none">
            <span className="block text-[8px] font-grotesk font-black tracking-[0.25em] uppercase text-[#14100E]/70">
              FRESH MORNING ROAST
            </span>
            <span className="block text-sm font-grotesk font-black tracking-tight leading-none uppercase text-[#14100E] mt-1">
              LATTE & CROISSANT PAIRING
            </span>
            <span className="block font-cormorant italic text-xs text-[#A8612E] mt-1">
              Dialed at 92°C with steamed oat milk
            </span>
          </div>

          {/* Bottom Banner */}
          <div className="absolute bottom-6 inset-x-6 bg-[#14100E]/85 backdrop-blur-md text-[#FAF7F2] p-4 border border-[#FAF7F2]/20 flex items-center justify-between">
            <div>
              <span className="font-grotesk font-bold text-xs uppercase tracking-wider block">
                Seasonal Specials Available
              </span>
              <span className="font-grotesk text-[10px] text-[#FAF7F2]/60 block mt-0.5">
                Check our blackboard or order online
              </span>
            </div>
            <Link
              to="/menu"
              className="px-4 py-2 bg-[#FAF7F2] text-[#14100E] hover:bg-[#C9A27E] text-[10px] font-grotesk font-bold uppercase tracking-wider transition-colors"
            >
              ORDER NOW
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MenuTeaser;
