import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgressBar = ({
  className = '',
  color = '#A8612E',
  height = 3,
  position = 'top',
  zIndex = 50,
}) => {
  const progress = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        zIndex,
        pointerEvents: 'none',
      }}
      className={className}
      aria-hidden="true"
    >
      <motion.div
        style={{
          width: `${progress * 100}%`,
          height: '100%',
          backgroundColor: color,
          transformOrigin: 'left center',
        }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </motion.div>
  );
};

export const CircularScrollProgress = ({
  className = '',
  color = '#A8612E',
  size = 48,
  strokeWidth = 4,
  showPercentage = false,
}) => {
  const progress = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2
        ${className}
      `}
      aria-hidden="true"
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EADBC8"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.1, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 2px 4px rgba(168,97,46,0.3))' }}
        />
      </svg>
      {showPercentage && (
        <span className="text-[10px] font-bold text-ink/60">
          {Math.round(progress * 100)}%
        </span>
      )}
    </div>
  );
};

export const SectionProgress = ({
  sections,
  activeSection,
  onSectionClick,
  className = '',
  orientation = 'horizontal',
}) => {
  return (
    <nav
      className={`
        fixed ${orientation === 'vertical' ? 'right-6 top-1/2 -translate-y-1/2' : 'bottom-6 left-1/2 -translate-x-1/2'}
        z-40 flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} gap-3 md:gap-4
        ${className}
      `}
      aria-label="Section navigation"
    >
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;
        const isCompleted = sections.findIndex((s) => s.id === activeSection) > index;

        return (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`
              relative flex items-center gap-2 px-3 py-2 rounded-full
              bg-foam/90 backdrop-blur border border-latte/30
              transition-all duration-300
              ${isActive ? 'bg-caramel text-foam shadow-warm' : 'text-ink/70 hover:text-ink'}
              ${orientation === 'vertical' ? 'min-w-[140px] justify-start' : ''}
            `}
            aria-current={isActive ? 'true' : 'false'}
            aria-label={section.name}
          >
            <motion.span
              initial={false}
              animate={{
                scale: isActive ? 1 : isCompleted ? 1 : 0,
                opacity: isActive || isCompleted ? 1 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
              className={`
                w-2 h-2 rounded-full flex-shrink-0
                ${isActive ? 'bg-foam' : isCompleted ? 'bg-caramel' : 'bg-latte/50'}
              `}
            />
            {!orientation && (
              <span className="hidden sm:block text-sm font-bold whitespace-nowrap">
                {section.name}
              </span>
            )}
            {orientation && (
              <span className="text-[10px] font-bold uppercase tracking-wide">
                {section.name}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default ScrollProgressBar;