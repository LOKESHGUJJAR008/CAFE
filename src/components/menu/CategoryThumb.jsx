import React from 'react';
import { motion } from 'framer-motion';

/**
 * CategoryThumb component
 * Accessible thumbnail button for category selection in tablist.
 */
export const CategoryThumb = ({
  category,
  isActive,
  onClick,
  onKeyDown,
  buttonRef
}) => {
  return (
    <button
      ref={buttonRef}
      role="tab"
      id={`tab-${category.id}`}
      aria-selected={isActive}
      aria-controls={`panel-${category.id}`}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="group relative flex flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded-full p-1 transition-all"
    >
      {/* Circle Image Wrapper */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden transition-all duration-300 ${
          isActive
            ? 'ring-4 ring-caramel ring-offset-2 ring-offset-transparent shadow-warm scale-105'
            : 'opacity-70 hover:opacity-100 ring-2 ring-foam/20'
        }`}
      >
        <img
          src={category.image}
          alt={category.name}
          width={64}
          height={64}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Active Overlay Tint */}
        {isActive && (
          <div className="absolute inset-0 bg-caramel/10 pointer-events-none" />
        )}
      </motion.div>

      {/* Label under thumbnail */}
      <span
        className={`text-[11px] sm:text-xs font-medium tracking-wide whitespace-nowrap transition-colors ${
          isActive
            ? 'font-bold text-caramel'
            : 'text-current opacity-70 group-hover:opacity-100'
        }`}
      >
        {category.name}
      </span>
    </button>
  );
};

export default CategoryThumb;
