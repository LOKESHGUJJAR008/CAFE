import { ANIMATION } from '../config';

export const easings = {
  ease: ANIMATION.ease,
  easeOut: ANIMATION.easeOut,
  easeInOut: [0.42, 0, 0.58, 1],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeOutCirc: [0.08, 0.82, 0.17, 1],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeSpring: ANIMATION.easeSpring,
  easeSpringSoft: ANIMATION.easeSpringSoft,
  easeSpringBounce: { type: 'spring', stiffness: 400, damping: 17 },
  easeSpringGentle: { type: 'spring', stiffness: 150, damping: 15 },
  linear: 'linear',
  easeIn: [0.42, 0, 1, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeOutQuart: [0.25, 1, 0.5, 1],
};

export const getEasing = (name) => easings[name] || easings.ease;

export const createSpring = (stiffness = 300, damping = 24, mass = 1) => ({
  type: 'spring',
  stiffness,
  damping,
  mass,
});

export const createBezier = (x1, y1, x2, y2) => [x1, y1, x2, y2];

export const durations = {
  instant: ANIMATION.instant,
  fast: ANIMATION.fast,
  normal: ANIMATION.normal,
  slow: ANIMATION.slow,
  slower: ANIMATION.slower,
  page: ANIMATION.page,
};

export const getDuration = (name) => durations[name] || durations.normal;

export const reducedMotionConfig = {
  full: { duration: 0 },
  minimal: { duration: 0.01 },
  none: { duration: 0.01 },
};

export const getReducedMotionConfig = (level) => reducedMotionConfig[level] || reducedMotionConfig.none;

export default {
  easings,
  getEasing,
  createSpring,
  createBezier,
  durations,
  getDuration,
  reducedMotionConfig,
  getReducedMotionConfig,
};