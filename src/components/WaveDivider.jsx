import React from 'react';

/**
 * Reusable WaveDivider component for organic transitions between sections.
 * 
 * @param {string} color - Fill color (e.g. '#241812', '#F5EBDD', '#5A3825')
 * @param {boolean} flipX - Mirrors the wave horizontally
 * @param {boolean} flipY - Flips the wave upside-down (e.g., for top of section vs bottom)
 * @param {string} className - Additional CSS classes
 * @param {number|string} height - Height of the wave divider (default: '48px' to '72px')
 */
export const WaveDivider = ({
  color = '#F5EBDD',
  flipX = false,
  flipY = false,
  className = '',
  height = '64px'
}) => {
  const transform = [
    flipX ? 'scaleX(-1)' : '',
    flipY ? 'scaleY(-1)' : ''
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{ transform, transformOrigin: 'center' }}
      >
        <path
          d="M0,32 C240,95 480,10 720,54 C960,98 1200,20 1440,64 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
