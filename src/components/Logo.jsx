import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Logo component
 * Renders the Royal Bean Café brand mark with a proper filled coffee-bean SVG icon.
 *
 * Props:
 * - size:      "md" (default) | "lg"
 * - theme:     "light" (ink text, default) | "dark" (foam text, for ink-bg sections)
 * - className: extra classes applied to the outer Link
 */
export const Logo = ({ size = 'md', theme = 'light', className = '' }) => {
  const isLg = size === 'lg';

  const iconW    = isLg ? 38 : 28;
  const iconH    = isLg ? 38 : 28;
  const titleCls = isLg ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl';
  const cafeCls  = isLg
    ? 'text-[10px] tracking-[0.3em] mt-0.5'
    : 'text-[8px] sm:text-[9px] tracking-[0.3em] mt-0.5';

  const textCol  = theme === 'light' ? 'text-[#1F1612]'  : 'text-[#FBF7F1]';
  const cafeCol  = theme === 'light' ? 'text-[#1F1612]/70' : 'text-[#EADBC8]/80';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-[#A8612E] rounded-md ${className}`}
      aria-label="Royal Bean Café — home"
    >
      {/*
        ── Coffee-Bean SVG ───────────────────────────────────────────────────────
        A genuine bean shape: filled ellipse rotated 35°, with a crease line
        running through the middle, plus a subtle glow circle behind it.
      */}
      <svg
        width={iconW}
        height={iconH}
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
      >
        {/* soft glow halo */}
        <circle cx="18" cy="18" r="14" fill="#A8612E" fillOpacity="0.12" />

        {/* bean body — filled, rotated ellipse */}
        <ellipse
          cx="18" cy="18"
          rx="10" ry="14"
          fill="#A8612E"
          transform="rotate(35 18 18)"
        />

        {/* crease / centre line */}
        <path
          d="M11 10 Q18 18 25 26"
          stroke="#FBF7F1"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>

      {/* Brand text */}
      <div className="flex flex-col leading-none">
        <span className={`font-playfair font-bold ${textCol} ${titleCls}`}>
          Royal <span className="text-[#A8612E] italic font-normal">Bean</span>
        </span>
        <span className={`font-inter font-semibold uppercase ${cafeCol} ${cafeCls}`}>
          CAFÉ
        </span>
      </div>
    </Link>
  );
};

export default Logo;
