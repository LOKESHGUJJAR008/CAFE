import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { variants } from '../../lib/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const typeStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const typeIcons = {
  success: (
    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
};

export const Toast = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  action,
}: ToastProps) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      setShowProgress(false);
      setTimeout(() => onClose(id), prefersReducedMotion ? 0 : 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose, prefersReducedMotion]);

  const progressVariants = prefersReducedMotion
    ? {}
    : {
        animate: { scaleX: [1, 0] },
        transition: { duration: duration / 1000, ease: 'linear' },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        variants={variants.toastSlide}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`
          relative flex items-start gap-3 p-4 rounded-xl border shadow-lg
          min-w-[300px] max-w-md
          ${typeStyles[type]}
        `}
        role="alert"
        aria-live="polite"
      >
        <div className="flex-shrink-0 mt-0.5">{typeIcons[type]}</div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm">{title}</p>
          {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
          {action && (
            <button
              onClick={() => {
                action.onClick();
                onClose(id);
              }}
              className="mt-3 text-sm font-bold underline hover:opacity-80 transition-opacity"
            >
              {action.label}
            </button>
          )}
        </div>

        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4 opacity-50 hover:opacity-100" />
        </button>

        <AnimatePresence mode="wait">
          {showProgress && (
            <motion.div
              key="progress"
              initial={false}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-xl overflow-hidden"
            >
              <motion.div
                variants={progressVariants}
                className="h-full bg-current"
                style={{ transformOrigin: 'left center' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export interface ToastContainerProps {
  toasts: Array<ToastProps & { id: string }>;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  gap?: number;
  maxToasts?: number;
}

const positionStyles = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const ToastContainer = ({
  toasts,
  position = 'bottom-right',
  gap = 12,
  maxToasts = 5,
}: ToastContainerProps) => {
  const { prefersReducedMotion } = useReducedMotion();

  const visibleToasts = toasts.slice(-maxToasts);

  return (
    <AnimatePresence mode="popLayout">
      <div
        className={`
          fixed z-50 flex flex-col-reverse gap-3 pointer-events-none
          ${positionStyles[position]}
        `}
        style={{ gap: `${gap}px` }}
        aria-live="polite"
        aria-atomic="true"
      >
        {visibleToasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto w-full">
            <Toast {...toast} />
          </div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default Toast;