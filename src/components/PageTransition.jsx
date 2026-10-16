import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { variants } from '../lib/variants';

/**
 * @typedef {Object} PageTransitionProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 * @property {'fade' | 'slide' | 'scale' | 'fade-up'} [transitionType]
 * @property {React.ReactNode} [loadingComponent]
 * @property {number} [loadingDelay]
 */

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  slide: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  'fade-up': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const PageTransition = ({
  children,
  className = '',
  transitionType = 'fade-up',
  loadingComponent = null,
  loadingDelay = 200,
}) => {
  const location = useLocation();
  const { prefersReducedMotion } = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);

  const currentVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0 },
      }
    : transitionVariants[transitionType];

  useEffect(() => {
    if (loadingComponent) {
      setIsLoading(true);
      setShowContent(false);

      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowContent(true);
      }, loadingDelay);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, loadingComponent, loadingDelay]);

  return (
    <AnimatePresence mode="wait">
      {showContent && (
        <motion.div
          key={location.pathname}
          initial={currentVariants.initial}
          animate={currentVariants.animate}
          exit={currentVariants.exit}
          transition={currentVariants.transition}
          className={className}
        >
          {children}
        </motion.div>
      )}

      {isLoading && loadingComponent && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foam"
        >
          {loadingComponent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const LayoutTransition = ({ children, className = '' }) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <motion.div
      layout
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SharedLayout = ({ children, layoutId, className = '' }) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <motion.div
      layoutId={layoutId}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;