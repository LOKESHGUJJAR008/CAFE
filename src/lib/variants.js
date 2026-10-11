import { ANIMATION } from '../config';

const { ease, easeOut, easeSpring, easeSpringSoft, stagger } = ANIMATION;

export const variants = {
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: ANIMATION.page, ease },
  },

  stagger: (staggerDelay = stagger) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
    },
  }),

  fadeUp: (delay = 0, yOffset = 24) => ({
    hidden: { opacity: 0, y: yOffset },
    visible: { opacity: 1, y: 0, transition: { duration: ANIMATION.slow, ease, delay } },
  }),

  fadeDown: (delay = 0, yOffset = 24) => ({
    hidden: { opacity: 0, y: -yOffset },
    visible: { opacity: 1, y: 0, transition: { duration: ANIMATION.slow, ease, delay } },
  }),

  fadeLeft: (delay = 0, xOffset = 30) => ({
    hidden: { opacity: 0, x: -xOffset },
    visible: { opacity: 1, x: 0, transition: { duration: ANIMATION.slow, ease, delay } },
  }),

  fadeRight: (delay = 0, xOffset = 30) => ({
    hidden: { opacity: 0, x: xOffset },
    visible: { opacity: 1, x: 0, transition: { duration: ANIMATION.slow, ease, delay } },
  }),

  scaleIn: (delay = 0, scale = 0.95) => ({
    hidden: { opacity: 0, scale },
    visible: { opacity: 1, scale: 1, transition: { duration: ANIMATION.normal, ease, delay } },
  }),

  scaleOut: (delay = 0, scale = 0.95) => ({
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale, transition: { duration: ANIMATION.fast, ease } },
  }),

  hoverLift: {
    whileHover: { y: -8, transition: { duration: ANIMATION.fast, ease } },
  },

  hoverLiftLarge: {
    whileHover: { y: -12, transition: { duration: ANIMATION.normal, ease } },
  },

  tapPress: {
    whileTap: { scale: 0.97, transition: { duration: ANIMATION.instant } },
  },

  tapPressSoft: {
    whileTap: { scale: 0.98, transition: { duration: ANIMATION.instant } },
  },

  imageZoom: {
    whileHover: { scale: 1.05, transition: { duration: ANIMATION.slower, ease } },
  },

  imageZoomSoft: {
    whileHover: { scale: 1.03, transition: { duration: ANIMATION.slow, ease } },
  },

  cardHover: {
    whileHover: {
      y: -8,
      boxShadow: '0 20px 40px rgba(31,22,18,0.15)',
      transition: { duration: ANIMATION.normal, ease },
    },
  },

  buttonPrimary: {
    whileHover: { y: -1, transition: { duration: ANIMATION.fast, ease } },
    whileTap: { scale: 0.97, transition: { duration: ANIMATION.instant } },
  },

  buttonGhost: {
    whileHover: { backgroundColor: 'rgba(201,162,126,0.15)', transition: { duration: ANIMATION.fast } },
    whileTap: { scale: 0.98, transition: { duration: ANIMATION.instant } },
  },

  linkUnderline: {
    whileHover: { x: 4, transition: { duration: ANIMATION.fast, ease } },
  },

  badgePop: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 17 } },
    exit: { scale: 0, opacity: 0, transition: { duration: ANIMATION.fast } },
  },

  toastSlide: {
    initial: { opacity: 0, x: 300, y: 20 },
    animate: { opacity: 1, x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, x: 300, transition: { duration: ANIMATION.fast, ease } },
  },

  modalBackdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: ANIMATION.normal } },
    exit: { opacity: 0, transition: { duration: ANIMATION.normal } },
  },

  modalContent: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: ANIMATION.fast, ease } },
  },

  drawerSlide: (side = 'right') => {
    const x = side === 'left' ? -300 : 300;
    return {
      initial: { opacity: 0, x },
      animate: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
      exit: { opacity: 0, x, transition: { duration: ANIMATION.normal, ease } },
    };
  },

  accordion: {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1, transition: { duration: ANIMATION.normal, ease } },
    exit: { height: 0, opacity: 0, transition: { duration: ANIMATION.normal, ease } },
  },

  tabsIndicator: {
    animate: { transition: { type: 'spring', stiffness: 400, damping: 25 } },
  },

  staggerChildren: (staggerDelay = stagger, delayChildren = 0.1) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren },
    },
  }),

  listItem: (index = 0, staggerDelay = stagger) => ({
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ANIMATION.normal, ease, delay: index * staggerDelay },
    },
  }),

  skeletonPulse: {
    animate: {
      opacity: [0.4, 0.7, 0.4],
      transition: { duration: 1.5, ease: 'easeInOut', repeat: Infinity },
    },
  },

  shimmer: {
    animate: {
      x: ['-100%', '100%'],
      transition: { duration: 1.5, ease: 'easeInOut', repeat: Infinity },
    },
  },

  float: (yRange = 15, duration = 4, delay = 0) => ({
    animate: {
      y: [-yRange, yRange],
      rotate: [-3, 3],
      transition: { duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay },
    },
  }),

  pulse: (scale = 1.05, duration = 2) => ({
    animate: {
      scale: [1, scale, 1],
      transition: { duration, ease: 'easeInOut', repeat: Infinity },
    },
  }),

  rotate: (degrees = 360, duration = 1) => ({
    animate: {
      rotate: degrees,
      transition: { duration, ease: 'linear', repeat: Infinity },
    },
  }),

  slideInFromBottom: (delay = 0, height = '100%') => ({
    initial: { opacity: 0, y: height },
    animate: { opacity: 1, y: 0, transition: { duration: ANIMATION.slow, ease, delay } },
    exit: { opacity: 0, y: -height, transition: { duration: ANIMATION.normal, ease } },
  }),

  expandWidth: (delay = 0) => ({
    initial: { width: 0, opacity: 0 },
    animate: { width: 'auto', opacity: 1, transition: { duration: ANIMATION.normal, ease, delay } },
    exit: { width: 0, opacity: 0, transition: { duration: ANIMATION.fast, ease } },
  }),

  expandHeight: (delay = 0) => ({
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1, transition: { duration: ANIMATION.normal, ease, delay } },
    exit: { height: 0, opacity: 0, transition: { duration: ANIMATION.fast, ease } },
  }),

  flipIn: (delay = 0) => ({
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0, transition: { duration: ANIMATION.slow, ease, delay } },
  }),

  revealText: (delay = 0, staggerDelay = 0.03) => ({
    hidden: { opacity: 0, y: '100%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay, staggerChildren: staggerDelay },
    },
  }),

  revealChar: (index = 0, delay = 0) => ({
    hidden: { opacity: 0, y: '100%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: delay + index * 0.02 },
    },
  }),

  countUp: (delay = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: ANIMATION.normal, ease, delay } },
  }),
};

export const getReducedMotionVariants = (prefersReducedMotion) => {
  if (prefersReducedMotion) {
    return {
      page: { ...variants.page, transition: { duration: 0 } },
      fadeUp: (delay = 0) => ({ ...variants.fadeUp(delay), transition: { duration: 0 } }),
      scaleIn: (delay = 0) => ({ ...variants.scaleIn(delay), transition: { duration: 0 } }),
      hoverLift: { whileHover: {} },
      tapPress: { whileTap: {} },
      imageZoom: { whileHover: {} },
      cardHover: { whileHover: {} },
      buttonPrimary: { whileHover: {}, whileTap: {} },
      float: () => ({ animate: {} }),
      pulse: () => ({ animate: {} }),
      rotate: () => ({ animate: {} }),
    };
  }
  return variants;
};

export default variants;