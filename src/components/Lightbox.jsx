import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Lightbox = ({ isOpen, currentIndex, images, onClose, onPrev, onNext }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Basic focus trap
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !images || images.length === 0) return null;
  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          {/* Close Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-6 right-6 p-2 rounded-full bg-foam/10 text-foam hover:bg-foam/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-foam/10 text-foam hover:bg-foam/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Image */}
          <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center">
            <img
              src={currentImage.url}
              alt={currentImage.label || 'Gallery image'}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            {currentImage.label && (
              <div className="mt-4 text-foam text-sm font-semibold tracking-wide" onClick={(e) => e.stopPropagation()}>
                {currentImage.label}
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-foam/10 text-foam hover:bg-foam/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
