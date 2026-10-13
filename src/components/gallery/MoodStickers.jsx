import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Palette tokens:
 * foam #FBF7F1, ink #1F1612, latte #C9A27E, caramel #A8612E, almond #EADBC8
 */

// 1. Coffee Bean Sticker
const CoffeeBeanIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5 drop-shadow-sm select-none"
    aria-hidden="true"
  >
    <rect
      x="2"
      y="4"
      width="18"
      height="14"
      rx="7"
      transform="rotate(25 11 11)"
      fill="#A8612E"
      stroke="#FBF7F1"
      strokeWidth="1.5"
    />
    <path
      d="M7 6C11 10 13 14 17 18"
      stroke="#EADBC8"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// 2. Croissant Sticker
const CroissantIcon = () => (
  <svg
    viewBox="0 0 26 22"
    fill="none"
    className="w-5 h-5 drop-shadow-sm select-none"
    aria-hidden="true"
  >
    <path
      d="M3 16C5 10 11 4 20 5C23 10 21 16 16 19C11 17 6 18 3 16Z"
      fill="#C9A27E"
      stroke="#FBF7F1"
      strokeWidth="1.5"
    />
    <path
      d="M9 7C12 11 13 14 14 18"
      stroke="#A8612E"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15 6C17 9 18 13 18 16"
      stroke="#A8612E"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// 3. Star Sparkle Sticker
const StarSparkleIcon = () => (
  <svg
    viewBox="0 0 22 22"
    fill="none"
    className="w-5 h-5 drop-shadow-sm select-none"
    aria-hidden="true"
  >
    <path
      d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5L11 2Z"
      fill="#A8612E"
      stroke="#FBF7F1"
      strokeWidth="1.2"
    />
    <circle cx="11" cy="11" r="1.5" fill="#FBF7F1" />
  </svg>
);

// 4. Heart Sticker
const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5 drop-shadow-sm select-none"
    aria-hidden="true"
  >
    <path
      d="M12 20L10.5 18.6C5.5 14 2 10.9 2 7C2 3.8 4.4 1.5 7.5 1.5C9.3 1.5 11 2.3 12 3.7C13 2.3 14.7 1.5 16.5 1.5C19.6 1.5 22 3.8 22 7C22 10.9 18.5 14 13.5 18.6L12 20Z"
      fill="#C9A27E"
      stroke="#FBF7F1"
      strokeWidth="1.5"
    />
  </svg>
);

// 5. Steam Cup Sticker
const SteamCupIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5 drop-shadow-sm select-none"
    aria-hidden="true"
  >
    <path
      d="M4 9H17V15C17 17.2 15.2 19 13 19H8C5.8 19 4 17.2 4 15V9Z"
      fill="#C9A27E"
      stroke="#FBF7F1"
      strokeWidth="1.5"
    />
    <path
      d="M17 11H19C20.1 11 21 11.9 21 13C21 14.1 20.1 15 19 15H17"
      stroke="#FBF7F1"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8 4C7.5 5 8.5 6 8 7"
      stroke="#A8612E"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 3C11.5 4.5 12.5 5.5 12 7"
      stroke="#A8612E"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// 6. Crescent Moon Sticker
const CrescentMoonIcon = () => (
  <svg
    viewBox="0 0 22 22"
    fill="none"
    className="w-5 h-5 drop-shadow-sm select-none"
    aria-hidden="true"
  >
    <path
      d="M18 13C16.5 13.8 14.8 14.2 13 14.2C7.5 14.2 3 9.7 3 4.2C3 2.8 3.3 1.5 3.8 0.3C1.6 2 0.2 4.6 0.2 7.6C0.2 13.6 5.1 18.5 11.1 18.5C14.3 18.5 17.1 17 18.9 14.7C18.6 14.1 18.3 13.5 18 13Z"
      transform="translate(1, 1)"
      fill="#C9A27E"
      stroke="#FBF7F1"
      strokeWidth="1.5"
    />
    <circle cx="17" cy="4" r="1.5" fill="#EADBC8" />
  </svg>
);

// 7. Cake Slice Sticker
const CakeSliceIcon = () => (
  <svg
    viewBox="0 0 24 22"
    fill="none"
    className="w-5 h-5 drop-shadow-sm select-none"
    aria-hidden="true"
  >
    <path
      d="M3 17L19 17L21 8L3 17Z"
      fill="#EADBC8"
      stroke="#FBF7F1"
      strokeWidth="1.5"
    />
    <path
      d="M3 17H19V19C19 20 18 21 17 21H5C4 21 3 20 3 19V17Z"
      fill="#A8612E"
    />
    <circle cx="12" cy="7" r="2.5" fill="#A8612E" stroke="#FBF7F1" strokeWidth="1" />
  </svg>
);

const MOOD_STICKER_SETS = {
  'slow-mornings': [
    { id: 'croissant', Component: CroissantIcon, x: -44, y: -26, rotate: -14 },
    { id: 'bean', Component: CoffeeBeanIcon, x: 38, y: -24, rotate: 16 },
    { id: 'sparkle', Component: StarSparkleIcon, x: -30, y: 22, rotate: 8 },
    { id: 'cup', Component: SteamCupIcon, x: 44, y: 18, rotate: -12 },
  ],
  'coffee-conversations': [
    { id: 'heart', Component: HeartIcon, x: -42, y: -24, rotate: -12 },
    { id: 'cup', Component: SteamCupIcon, x: 38, y: -26, rotate: 14 },
    { id: 'bean', Component: CoffeeBeanIcon, x: -32, y: 22, rotate: 10 },
    { id: 'sparkle', Component: StarSparkleIcon, x: 44, y: 20, rotate: -8 },
  ],
  'sweet-cravings': [
    { id: 'cake', Component: CakeSliceIcon, x: -44, y: -26, rotate: -15 },
    { id: 'croissant', Component: CroissantIcon, x: 38, y: -22, rotate: 12 },
    { id: 'heart', Component: HeartIcon, x: -28, y: 24, rotate: 12 },
    { id: 'sparkle', Component: StarSparkleIcon, x: 44, y: 18, rotate: -10 },
  ],
  'late-night': [
    { id: 'moon', Component: CrescentMoonIcon, x: -42, y: -26, rotate: -12 },
    { id: 'sparkle', Component: StarSparkleIcon, x: 38, y: -24, rotate: 15 },
    { id: 'cup', Component: SteamCupIcon, x: -30, y: 22, rotate: 8 },
    { id: 'heart', Component: HeartIcon, x: 42, y: 20, rotate: -12 },
  ],
};

/**
 * MoodStickers — Pops 3-4 playful, restrained sticker SVGs near the mood title
 * with spring animation when a mood is selected.
 */
export const MoodStickers = ({ selectedMood = 'slow-mornings' }) => {
  const prefersReducedMotion = useReducedMotion();
  const stickers = MOOD_STICKER_SETS[selectedMood] || MOOD_STICKER_SETS['slow-mornings'];

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-20"
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMood}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full h-full"
        >
          {stickers.map((item, idx) => {
            const { Component } = item;
            return (
              <motion.div
                key={`${selectedMood}-${item.id}`}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        scale: 0,
                        opacity: 0,
                        x: item.x * 0.4,
                        y: item.y * 0.4,
                        rotate: -25,
                      }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : {
                        scale: 1,
                        opacity: 1,
                        x: item.x,
                        y: item.y,
                        rotate: item.rotate,
                      }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0.2, delay: idx * 0.04 }
                    : {
                        type: 'spring',
                        stiffness: 420,
                        damping: 18,
                        mass: 0.6,
                        delay: 0.06 + idx * 0.05,
                      }
                }
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{
                  filter:
                    'drop-shadow(0 2px 6px rgba(31, 22, 18, 0.16))',
                }}
              >
                <Component />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MoodStickers;
