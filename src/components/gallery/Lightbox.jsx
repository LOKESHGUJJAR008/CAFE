import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

export default function Lightbox({
  isOpen,
  currentIndex,
  images = [],
  onClose,
  onPrev,
  onNext,
}) {
  const currentImage = images[currentIndex];
  const ballNumber = currentIndex + 1;

  // Keyboard navigation & escape close
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${currentImage.title} photo preview`}
        >
          {/* Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1F1612]/90 backdrop-blur-md cursor-pointer"
          />

          {/* Close Button (Top-Right, min 44px tap target, thumb reachable on mobile) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center bg-[#1F1612]/75 hover:bg-[#A8612E] text-[#FBF7F1] border border-[#C9A27E]/40 backdrop-blur-sm shadow-xl transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A8612E]"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button (Min 44px tap target) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photo"
            className="fixed left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center bg-[#1F1612]/75 hover:bg-[#A8612E] text-[#FBF7F1] border border-[#C9A27E]/40 backdrop-blur-sm shadow-xl transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A8612E]"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Next Button (Min 44px tap target) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photo"
            className="fixed right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center bg-[#1F1612]/75 hover:bg-[#A8612E] text-[#FBF7F1] border border-[#C9A27E]/40 backdrop-blur-sm shadow-xl transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A8612E]"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Centered Image Card with Scale + Fade Transition */}
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.32, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-40 max-w-[94vw] sm:max-w-3xl md:max-w-4xl flex flex-col items-center select-none"
          >
            {/* Image Frame with Aspect Ratio Preservation */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#C9A27E]/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#1F1612]">
              <img
                src={currentImage.src}
                alt={currentImage.title}
                width={800}
                height={600}
                className="max-w-full max-h-[60vh] sm:max-h-[72vh] md:max-h-[76vh] w-auto h-auto object-contain block mx-auto"
                loading="eager"
              />
            </div>

            {/* Title & Ball Number Info Badge Below */}
            <div className="mt-3 sm:mt-5 flex items-center gap-3 sm:gap-4 bg-[#1F1612]/85 border border-[#C9A27E]/40 px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-md shadow-lg">
              {/* Pool Ball Number Disc */}
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FBF7F1] text-[#1F1612] font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-md border border-[#C9A27E]/50">
                {ballNumber}
              </span>

              {/* Title & Counter */}
              <div className="flex flex-col text-left">
                <span className="font-playfair font-bold text-sm sm:text-xl text-[#FBF7F1] leading-tight">
                  {currentImage.title}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#EADBC8]/70">
                  Ball {ballNumber} of {images.length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
