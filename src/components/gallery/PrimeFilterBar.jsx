import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'ALL ARCHIVE', code: '01', count: '15 SPECIMENS', time: 'PRIME' },
  { id: 'roast', label: 'ROAST & CRAFT', code: '02', count: '05 PLATES', time: '8P' },
  { id: 'space', label: 'BRUTALIST SPACE', code: '03', count: '06 PLATES', time: '9P' },
  { id: 'night', label: 'NIGHT SANCTUARY', code: '04', count: '04 PLATES', time: '10P' },
];

export const PrimeFilterBar = ({ activeFilter = 'all', onSelectFilter }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[#FAF7F2] py-8 border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Label Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-3 border-b border-[#14100E]/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#14100E]" />
            <span className="font-grotesk font-black text-xs uppercase tracking-[0.25em] text-[#14100E]">
              SECTION INDEX / CLASSIFICATION
            </span>
          </div>
          <span className="font-grotesk text-[10px] sm:text-xs uppercase tracking-widest text-[#14100E]/60">
            FILTER BY TEMPORAL RECORD & DISCIPLINE
          </span>
        </div>

        {/* Modular Grid Filter Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectFilter(cat.id)}
                className={`relative text-left p-4 sm:p-5 border-2 transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[96px] sm:min-h-[110px] ${
                  isActive
                    ? 'bg-[#14100E] text-[#FAF7F2] border-[#14100E] shadow-[4px_4px_0px_#A8612E]'
                    : 'bg-[#FAF7F2] text-[#14100E] border-[#14100E] hover:bg-[#FAF7F2]/80 hover:shadow-[3px_3px_0px_#14100E]'
                }`}
              >
                {/* Top Row: Index code + Time badge */}
                <div className="flex items-center justify-between w-full mb-3">
                  <span
                    className={`font-grotesk text-[10px] font-black uppercase tracking-[0.25em] ${
                      isActive ? 'text-[#FAF7F2]/60' : 'text-[#14100E]/50'
                    }`}
                  >
                    [ {cat.code} ]
                  </span>
                  <span
                    className={`font-grotesk text-xs sm:text-sm font-black uppercase tracking-tight px-1.5 py-0.5 border ${
                      isActive
                        ? 'border-[#FAF7F2] text-[#FAF7F2] bg-[#14100E]'
                        : 'border-[#14100E] text-[#14100E] bg-[#FAF7F2]'
                    }`}
                  >
                    {cat.time}
                  </span>
                </div>

                {/* Bottom Row: Category Title + Count */}
                <div>
                  <h4 className="font-grotesk font-black text-sm sm:text-base uppercase tracking-tight leading-tight">
                    {cat.label}
                  </h4>
                  <span
                    className={`block font-grotesk text-[9px] font-bold uppercase tracking-[0.2em] mt-1 ${
                      isActive ? 'text-[#FAF7F2]/70' : 'text-[#14100E]/60'
                    }`}
                  >
                    {cat.count}
                  </span>
                </div>

                {/* Active Indicator Accent Line */}
                {isActive && (
                  <div className="absolute -bottom-[2px] left-0 right-0 h-[3px] bg-[#A8612E]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrimeFilterBar;
