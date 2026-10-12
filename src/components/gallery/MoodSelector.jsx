import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { moods } from '../../data/moods';

const EASE = [0.22, 1, 0.36, 1];

const MoodCard = ({
  mood,
  isSelected,
  onSelect,
  prefersReducedMotion,
  onKeyDown,
  cardRefCallback,
}) => {
  const cardNodeRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Derive hover support without triggering effect re-renders
  const [canHover] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !canHover || !cardNodeRef.current) return;
    const rect = cardNodeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt ~6 degrees
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion && canHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const setCombinedRef = (node) => {
    cardNodeRef.current = node;
    if (cardRefCallback) {
      cardRefCallback(node);
    }
  };

  // Determine card text styling based on background tint
  const isDarkCard = mood.visualTreatment.bgTint === '#1F1612';
  const textColor = isDarkCard ? '#FBF7F1' : '#1F1612';
  const subtextColor = isDarkCard ? 'rgba(251, 247, 241, 0.75)' : 'rgba(31, 22, 18, 0.72)';
  const captionColor = isDarkCard ? '#C9A27E' : '#A8612E';

  // Transform configuration
  const transformStyle = !prefersReducedMotion && canHover
    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
        isSelected ? 'scale(1.02)' : isHovered ? 'scale(1.01)' : 'scale(1)'
      }`
    : isSelected
    ? 'scale(1.02)'
    : 'scale(1)';

  return (
    <button
      ref={setCombinedRef}
      type="button"
      role="radio"
      aria-checked={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onSelect(mood.id)}
      onKeyDown={onKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative text-left rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 outline-none
        w-full shrink-0 select-none cursor-pointer
        focus-visible:ring-2 focus-visible:ring-[#A8612E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF7F1]
        ${isSelected ? 'opacity-100 z-10' : 'opacity-80 hover:opacity-100 z-0'}
      `}
      style={{
        backgroundColor: mood.visualTreatment.bgTint,
        border: isSelected
          ? '2.5px solid #A8612E'
          : `1.5px solid ${mood.visualTreatment.cardBorder}`,
        boxShadow: isSelected
          ? '0 16px 40px rgba(168, 97, 46, 0.22), 0 4px 12px rgba(31, 22, 18, 0.08)'
          : '0 8px 24px rgba(31, 22, 18, 0.06)',
        transform: transformStyle,
        transition:
          tilt.x === 0 && tilt.y === 0
            ? 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
            : 'transform 0.08s ease-out, opacity 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare spotlight overlay on desktop hover */}
      {!prefersReducedMotion && canHover && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(251, 247, 241, 0.35) 0%, transparent 60%)`,
            opacity: glare.opacity,
          }}
          aria-hidden="true"
        />
      )}

      {/* Top: Fixed Aspect Ratio Image */}
      <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden mb-4 bg-[#EADBC8] shrink-0">
        <img
          src={mood.featuredImage.src}
          alt={mood.featuredImage.alt}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            !prefersReducedMotion && isHovered ? 'scale-105' : 'scale-100'
          }`}
          loading="lazy"
        />

        {/* Subtle photo vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 50%, rgba(31, 22, 18, 0.38) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Selected badge (Non-color reliant visual indicator) */}
        {isSelected && (
          <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8612E] text-[#FBF7F1] text-[11px] font-bold tracking-wider shadow-md uppercase">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Selected</span>
          </div>
        )}
      </div>

      {/* Bottom Content: Title, Caption, Short Description */}
      <div className="flex flex-col flex-1">
        <span
          className="font-inter text-[11px] font-bold tracking-wider uppercase mb-1.5 line-clamp-1"
          style={{ color: captionColor }}
        >
          {mood.caption}
        </span>

        <h3
          className="font-playfair font-bold text-xl sm:text-2xl mb-2 line-clamp-1"
          style={{ color: textColor }}
        >
          {mood.title}
        </h3>

        <p
          className="font-inter text-xs sm:text-sm leading-relaxed line-clamp-2 mt-auto"
          style={{ color: subtextColor }}
        >
          {mood.description}
        </p>
      </div>
    </button>
  );
};

export const MoodSelector = ({
  selectedMood = 'slow-mornings',
  onSelectMood,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const cardElementsRef = useRef({});

  const currentMoodObj = moods.find((m) => m.id === selectedMood) || moods[0];

  // WAI-ARIA keyboard navigation for radiogroup
  const handleKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % moods.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + moods.length) % moods.length;
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onSelectMood(moods[index].id);
      return;
    }

    if (nextIndex !== null) {
      onSelectMood(moods[nextIndex].id);
      cardElementsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <section id="moods" className="bg-[#FBF7F1] text-[#1F1612] py-16 sm:py-20 lg:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Heading */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <span className="font-inter text-xs font-bold uppercase tracking-[0.22em] text-[#A8612E] block mb-2.5">
            CHOOSE YOUR ATMOSPHERE
          </span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1F1612] tracking-tight mb-4">
            Find Your Coffee Mood
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#1F1612]/75 leading-relaxed">
            Select an atmosphere to discover handcrafted moments, curated roasts, and signature café rituals.
          </p>
        </motion.div>

        {/* Cards Container: Compact horizontal snap-scroll on mobile, 4-col grid on lg */}
        <div
          role="radiogroup"
          aria-label="Select coffee mood"
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x sm:snap-none -mx-6 px-6 sm:mx-0 sm:px-0 pb-4 sm:pb-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {moods.map((mood, idx) => (
            <div
              key={mood.id}
              className="w-[82vw] max-w-[300px] sm:w-auto shrink-0 snap-center sm:snap-align-none"
            >
              <MoodCard
                mood={mood}
                isSelected={selectedMood === mood.id}
                onSelect={onSelectMood}
                prefersReducedMotion={prefersReducedMotion}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                cardRefCallback={(el) => {
                  cardElementsRef.current[idx] = el;
                }}
              />
            </div>
          ))}
        </div>

        {/* Small test indicator under the cards as requested */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#EADBC8]/50 border border-[#C9A27E]/30 text-xs sm:text-sm font-inter text-[#1F1612]/80 font-medium">
            <span className="text-[#A8612E] font-bold">Selected:</span>
            <span className="font-semibold text-[#1F1612]">{currentMoodObj.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodSelector;
