import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { variants } from '../lib/variants';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  transitionType?: 'fade' | 'slide' | 'scale' | 'fade-up';
  loadingComponent?: React.ReactNode;
  loadingDelay?: number;
}

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
}: PageTransitionProps) => {
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

export interface LayoutTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const LayoutTransition = ({ children, className = '' }: LayoutTransitionProps) => {
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

export interface SharedLayoutProps {
  children: React.ReactNode;
  layoutId?: string;
  className?: string;
}

export const SharedLayout = ({ children, layoutId, className = '' }: SharedLayoutProps) => {
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