import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

export const GalleryLightbox = ({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
  triggerElementRef,
  activeTriggerIndex = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Trap focus and restore focus on close
  useEffect(() => {
    if (!isOpen) return;

    // Cache the return element to avoid accessing ref in cleanup
    const returnTarget = triggerElementRef?.current?.[activeTriggerIndex];

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
        return;
      }

      // Tab trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      // Restore focus to triggering button
      returnTarget?.focus?.();
    };
  }, [isOpen, onClose, onPrev, onNext, triggerElementRef, activeTriggerIndex]);

  // Mobile swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance) {
      // Swiped left -> Next
      onNext();
    } else if (diff < -minSwipeDistance) {
      // Swiped right -> Prev
      onPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentItem = images[currentIndex] || images[0];
  const totalCount = images.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
        >
          {/* Backdrop with click-outside listener */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1F1612]/92 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col items-center justify-center select-none"
          >
            {/* Top Toolbar: Counter and Close */}
            <div className="w-full flex items-center justify-between py-2 px-1 text-[#FBF7F1] mb-2">
              <span className="font-inter text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#C9A27E]">
                {currentIndex + 1} / {totalCount}
              </span>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close lightbox"
                className="p-2.5 rounded-full bg-[#1F1612]/80 hover:bg-[#A8612E] text-[#FBF7F1] border border-[#C9A27E]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Stage */}
            <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-[#1F1612]/50 border border-[#C9A27E]/20 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              <motion.img
                key={currentItem.src}
                src={currentItem.src}
                alt={currentItem.alt || currentItem.caption || 'Café gallery view'}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="max-h-[68vh] sm:max-h-[74vh] w-auto max-w-full object-contain rounded-xl"
                onError={(e) => {
                  e.currentTarget.src = '/images/hero.webp';
                }}
              />

              {/* Navigation Arrows */}
              {totalCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrev();
                    }}
                    aria-label="Previous image"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#1F1612]/70 hover:bg-[#A8612E] text-[#FBF7F1] border border-[#C9A27E]/30 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNext();
                    }}
                    aria-label="Next image"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#1F1612]/70 hover:bg-[#A8612E] text-[#FBF7F1] border border-[#C9A27E]/30 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption */}
            {currentItem.caption && (
              <div className="w-full text-center mt-3 px-4">
                <p className="font-playfair italic text-sm sm:text-base text-[#FBF7F1]/90 max-w-2xl mx-auto">
                  “{currentItem.caption}”
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GalleryLightbox;
