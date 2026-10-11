/**
 * DietBadge — Indian standard food-type marker.
 *
 * Props:
 *   diet: "veg" | "egg" | "nonveg"
 *   size: "sm" (default, 14px box) | "xs" (11px box)
 *
 * Colors used:
 *   veg     → green dot  #2E7D32  (standard Indian veg)
 *   egg     → yellow dot #D97706  (orange-yellow for egg indicator)
 *   nonveg  → red dot    #B3261E  (standard Indian non-veg)
 */
import React from 'react';

const DIET_CONFIG = {
  veg: {
    border: '#2E7D32',
    dot: '#2E7D32',
    label: 'Vegetarian',
  },
  egg: {
    border: '#D97706',
    dot: '#D97706',
    label: 'Contains egg',
  },
  nonveg: {
    border: '#B3261E',
    dot: '#B3261E',
    label: 'Non-vegetarian',
  },
  unconfirmed: {
    border: '#C9A27E', // latte
    dot: 'transparent',
    label: 'Ingredients being confirmed. Please ask our team.',
  },
};

export default function DietBadge({ diet = 'veg', size = 'sm' }) {
  const cfg = DIET_CONFIG[diet] ?? DIET_CONFIG.veg;
  const boxSize  = size === 'xs' ? 11 : 14;
  const dotSize  = size === 'xs' ? 5  : 7;

  return (
    <span
      title={cfg.label}
      aria-label={cfg.label}
      role="img"
      className="inline-flex items-center justify-center flex-shrink-0"
      style={{
        width: boxSize,
        height: boxSize,
        border: `1.5px solid ${cfg.border}`,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <span
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: cfg.dot,
          display: 'block',
        }}
      />
    </span>
  );
}
