import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable TATVA Logo component
 * Accurately replicates the user's brand identity:
 * - Fine-line Laurel Wreath Crest enclosing the regal serif "T"
 * - High-fashion editorial "TATVA" typography with aesthetic character flow
 *
 * Props:
 * - size:      "sm" | "md" (default) | "lg"
 * - theme:     "light" (ink text) | "dark" (foam/rose text)
 * - showSubtitle: boolean (default true)
 * - className: extra classes applied to the outer Link
 */
export const TatvaCrest = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
    aria-hidden="true"
  >
    {/* Left Laurel Branch */}
    <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M 50 82 C 34 80, 22 66, 22 48 C 22 36, 28 26, 36 20" />
      {/* Left leaves */}
      <path d="M 46 80 C 40 82, 34 78, 32 72 C 37 72, 42 75, 46 80 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 38 74 C 32 75, 27 70, 26 63 C 31 64, 35 68, 38 74 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 30 65 C 24 65, 20 59, 21 52 C 26 54, 29 59, 30 65 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 25 54 C 20 52, 18 45, 20 38 C 25 41, 26 47, 25 54 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 24 42 C 21 38, 21 31, 25 25 C 28 29, 28 36, 24 42 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 28 30 C 27 24, 30 18, 36 15 C 37 20, 34 26, 28 30 Z" fill="currentColor" fillOpacity="0.2" />
    </g>

    {/* Right Laurel Branch */}
    <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M 50 82 C 66 80, 78 66, 78 48 C 78 36, 72 26, 64 20" />
      {/* Right leaves */}
      <path d="M 54 80 C 60 82, 66 78, 68 72 C 63 72, 58 75, 54 80 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 62 74 C 68 75, 73 70, 74 63 C 69 64, 65 68, 62 74 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 70 65 C 76 65, 80 59, 79 52 C 74 54, 71 59, 70 65 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 75 54 C 80 52, 82 45, 80 38 C 75 41, 74 47, 75 54 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 76 42 C 79 38, 79 31, 75 25 C 72 29, 72 36, 76 42 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 72 30 C 73 24, 70 18, 64 15 C 63 20, 66 26, 72 30 Z" fill="currentColor" fillOpacity="0.2" />
    </g>

    {/* Base crossing stems */}
    <path d="M 46 81 L 54 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 54 81 L 46 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

    {/* Center Serif Letter "T" */}
    <text
      x="50"
      y="58"
      textAnchor="middle"
      fontSize="36"
      fontFamily="'Playfair Display', Georgia, serif"
      fontWeight="700"
      fill="currentColor"
    >
      T
    </text>
  </svg>
);

export const Logo = ({ size = 'md', theme = 'light', showSubtitle = true, className = '' }) => {
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  const crestSize = isLg ? 44 : isSm ? 26 : 34;
  const titleCls  = isLg 
    ? 'text-2xl sm:text-3xl tracking-[0.18em]' 
    : isSm 
    ? 'text-base sm:text-lg tracking-[0.16em]' 
    : 'text-xl sm:text-2xl tracking-[0.16em]';

  const subCls = isLg 
    ? 'text-[9px] tracking-[0.35em] mt-0.5' 
    : 'text-[7.5px] sm:text-[8px] tracking-[0.3em] mt-0.5';

  const crestColor = 'text-caramel'; // Radiant Tatva Pink
  const titleColor = theme === 'light' ? 'text-ink' : 'text-foam';
  const subColor   = theme === 'light' ? 'text-latte' : 'text-caramel/90';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded-md ${className}`}
      aria-label="TATVA Café — Home"
    >
      {/* Laurel Wreath Crest with "T" */}
      <TatvaCrest size={crestSize} className={crestColor} />

      {/* Stylized Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <span className={`font-playfair font-bold uppercase transition-colors ${titleColor} ${titleCls}`}>
          TATVA
        </span>
        {showSubtitle && (
          <span className={`font-inter font-semibold uppercase ${subColor} ${subCls}`}>
            ARTISAN CAFÉ
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
