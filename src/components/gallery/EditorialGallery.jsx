import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ZoomIn, Sparkles } from 'lucide-react';
import { moods } from '../../data/moods';
import GalleryLightbox from './GalleryLightbox';
import KineticHeadline from './KineticHeadline';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Translucent Washi Tape, Paper Clip, and Corner Tape accessories (CSS only).
 */
const TapeOrClip = ({ type }) => {
  if (type === 'washi-latte') {
    return (
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 pointer-events-none select-none z-30 opacity-90 shadow-xs"
        style={{
          background:
            'linear-gradient(135deg, rgba(201, 162, 126, 0.72) 0%, rgba(201, 162, 126, 0.55) 100%)',
          backdropFilter: 'blur(1px)',
          clipPath:
            'polygon(0% 6%, 2% 0%, 98% 0%, 100% 6%, 99% 94%, 97% 100%, 2% 100%, 0% 94%)',
          transform: 'rotate(-1.8deg)',
          borderTop: '1px solid rgba(251, 247, 241, 0.35)',
          borderBottom: '1px solid rgba(251, 247, 241, 0.2)',
        }}
        aria-hidden="true"
      />
    );
  }

  if (type === 'washi-caramel') {
    return (
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 pointer-events-none select-none z-30 opacity-90 shadow-xs"
        style={{
          background:
            'linear-gradient(135deg, rgba(168, 97, 46, 0.68) 0%, rgba(168, 97, 46, 0.52) 100%)',
          backdropFilter: 'blur(1px)',
          clipPath:
            'polygon(0% 5%, 3% 0%, 97% 0%, 100% 5%, 99% 95%, 98% 100%, 3% 100%, 0% 95%)',
          transform: 'rotate(1.5deg)',
          borderTop: '1px solid rgba(251, 247, 241, 0.35)',
          borderBottom: '1px solid rgba(251, 247, 241, 0.2)',
        }}
        aria-hidden="true"
      />
    );
  }

  if (type === 'paperclip') {
    return (
      <svg
        className="absolute -top-3.5 left-6 w-4.5 h-8 pointer-events-none select-none z-30 drop-shadow-xs"
        viewBox="0 0 20 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 11 V27 C7 31 13 31 13 27 V7 C13 3 5 3 5 7 V29 C5 35 15 35 15 29 V13"
          stroke="#A8612E"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'corner-tape') {
    return (
      <div
        className="absolute -top-2 -right-2.5 w-14 h-5 pointer-events-none select-none z-30 opacity-85 shadow-xs"
        style={{
          background:
            'linear-gradient(135deg, rgba(201, 162, 126, 0.7) 0%, rgba(201, 162, 126, 0.5) 100%)',
          backdropFilter: 'blur(1px)',
          clipPath:
            'polygon(0% 8%, 4% 0%, 96% 0%, 100% 8%, 98% 92%, 96% 100%, 3% 100%, 0% 92%)',
          transform: 'rotate(40deg)',
          borderTop: '1px solid rgba(251, 247, 241, 0.35)',
        }}
        aria-hidden="true"
      />
    );
  }

  return null;
};

/**
 * PolaroidCard — Individual scrapbook polaroid with foam frame, handwritten note,
 * orange film-date stamp, desktop drag, and hover lift/straighten.
 */
const PolaroidCard = ({
  item,
  index,
  totalCount,
  onClick,
  prefersReducedMotion,
  canHover,
  dragBoundsRef,
  zIndex,
  onDragStart,
  onDragEnd,
  isFeatured = false,
  triggerRefCallback,
}) => {
  const rot = prefersReducedMotion ? 0 : item.rotation || 0;
  const isDraggingLocal = useRef(false);
  const dragPos = useRef({ x: 0, y: 0 });

  return (
    <motion.div
      ref={triggerRefCallback}
      drag={!prefersReducedMotion && canHover}
      dragConstraints={dragBoundsRef}
      dragElastic={0.05}
      dragMomentum={false}
      onDragStart={(e, info) => {
        isDraggingLocal.current = true;
        dragPos.current = { x: info.point.x, y: info.point.y };
        if (onDragStart) onDragStart(index);
      }}
      onDragEnd={(e, info) => {
        const moved = Math.hypot(
          info.point.x - dragPos.current.x,
          info.point.y - dragPos.current.y
        );
        if (moved > 6) {
          setTimeout(() => {
            isDraggingLocal.current = false;
          }, 80);
        } else {
          isDraggingLocal.current = false;
        }
        if (onDragEnd) onDragEnd();
      }}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, rotate: rot }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: rot,
        zIndex,
      }}
      whileHover={
        !prefersReducedMotion
          ? {
              rotate: 0,
              scale: 1.04,
              y: -8,
              zIndex: 45,
              boxShadow:
                '0 28px 56px rgba(31, 22, 18, 0.22), 0 8px 16px rgba(31, 22, 18, 0.12)',
            }
          : {}
      }
      whileTap={
        !prefersReducedMotion
          ? {
              rotate: 0,
              scale: 1.03,
              y: -4,
              zIndex: 45,
            }
          : {}
      }
      transition={{ duration: 0.35, ease: EASE }}
      role="button"
      tabIndex={0}
      data-cursor="drag"
      onClick={() => {
        if (isDraggingLocal.current) return;
        onClick(index);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(index);
        }
      }}
      aria-label={`View enlarged polaroid: ${item.caption || item.handwrittenNote}`}
      className={`group relative select-none rounded-xs border cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] w-full ${
        isFeatured ? 'max-w-[580px]' : 'max-w-[440px]'
      }`}
      style={{
        backgroundColor: '#FBF7F1', // Foam polaroid frame
        borderColor: 'rgba(201, 162, 126, 0.3)',
        boxShadow:
          '0 16px 36px rgba(31, 22, 18, 0.14), 0 3px 8px rgba(31, 22, 18, 0.08)',
        padding: '11px 11px 42px 11px', // Classical polaroid proportions with thicker bottom
      }}
    >
      {/* Decorative Washi Tape or Paperclip */}
      <TapeOrClip type={item.tapeType} />

      {/* Inner Photo Area */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#EADBC8]/40 rounded-xs">
        <img
          src={item.src}
          alt={item.alt || item.caption}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          style={{ objectPosition: item.objectPosition || 'center' }}
          loading="lazy"
          draggable={false}
        />

        {/* Subtle photo vignette */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30"
          style={{
            background:
              'linear-gradient(135deg, rgba(168, 97, 46, 0.12) 0%, rgba(201, 162, 126, 0.06) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Orange-ish mono film-date stamp like "12 · 10 · 26" */}
        <span
          className="absolute bottom-2.5 right-2.5 font-mono text-[10px] sm:text-[11px] font-bold tracking-widest select-none pointer-events-none px-1.5 py-0.5 rounded-xs"
          style={{
            color: '#A8612E', // caramel/orange accent
            backgroundColor: 'rgba(31, 22, 18, 0.45)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
          }}
        >
          {item.filmDate || '12 · 10 · 26'}
        </span>

        {/* Subtle hover zoom badge */}
        <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1F1612]/75 backdrop-blur-xs text-[#FBF7F1] text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ZoomIn className="w-3 h-3 text-[#C9A27E]" />
          <span>Zoom</span>
        </div>
      </div>

      {/* Bottom Strip: Handwritten Caption in Caveat */}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
        <p
          className="font-caveat text-lg sm:text-xl text-[#1F1612] font-semibold leading-tight tracking-wide line-clamp-1 flex-1 pr-2"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          {item.handwrittenNote || item.caption}
        </p>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#1F1612]/40 shrink-0">
          0{index + 1} / 0{totalCount}
        </span>
      </div>
    </motion.div>
  );
};

export const EditorialGallery = ({ selectedMood = 'slow-mornings' }) => {
  const prefersReducedMotion = useReducedMotion();
  const galleryBoundsRef = useRef(null);
  const cardTriggerRefs = useRef({});

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTriggerIndex, setActiveTriggerIndex] = useState(0);

  // Card Z-indices for raising z-index on drag
  const [cardZIndices, setCardZIndices] = useState({});

  const [canHover] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  const currentMood = useMemo(() => {
    return moods.find((m) => m.id === selectedMood) || moods[0];
  }, [selectedMood]);

  // All photos for this mood in sequential order
  const lightboxImages = useMemo(() => {
    return currentMood.galleryImages || [currentMood.featuredImage];
  }, [currentMood]);

  const featuredImage = lightboxImages[0] || currentMood.featuredImage;
  const supportingImages = lightboxImages.slice(1);

  const openLightbox = (index) => {
    setActiveTriggerIndex(index);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleCardDragStart = (idx) => {
    setCardZIndices((prev) => {
      const currentHighest = Math.max(...Object.values(prev), 10) || 10;
      return {
        ...prev,
        [idx]: currentHighest + 1,
      };
    });
  };

  return (
    <section
      className="relative py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-12 overflow-hidden bg-transparent text-[var(--gallery-text)] transition-colors duration-700"
      style={{ perspective: '1200px' }}
      aria-label="Editorial photo scrapbook"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 transition-colors duration-500"
            style={{
              backgroundColor: 'var(--gallery-panel)',
              borderColor: 'var(--gallery-border)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--gallery-accent)' }} />
            <span
              className="relative inline-block pb-0.5 font-inter text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: 'var(--gallery-accent)' }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentMood.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -2 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="inline-block"
                >
                  {currentMood.title} Collection
                </motion.span>
              </AnimatePresence>
              {!prefersReducedMotion && (
                <motion.span
                  key={`underline-col-${currentMood.id}`}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
                  className="absolute left-0 bottom-0 w-full h-[1.5px] rounded-full"
                  style={{ backgroundColor: 'var(--gallery-accent)' }}
                />
              )}
            </span>
          </motion.div>

          <KineticHeadline
            as="h2"
            text={`“${currentMood.caption}”`}
            triggerKey={currentMood.id}
            delay={0.08}
            className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3 transition-colors duration-500"
            style={{ color: 'var(--gallery-text)' }}
          />

          <motion.p
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="font-inter text-sm sm:text-base leading-relaxed transition-colors duration-500"
            style={{ color: 'var(--gallery-subtext)' }}
          >
            {currentMood.description}
          </motion.p>
        </div>

        {/* Gallery Area: Scrapbook Tabletop with subtle film grain */}
        <div
          ref={galleryBoundsRef}
          className="relative w-full rounded-3xl p-4 sm:p-8 lg:p-10 border transition-colors duration-500 min-h-[540px]"
          style={{
            backgroundColor: 'var(--gallery-panel)',
            borderColor: 'var(--gallery-border)',
          }}
        >
          {/* Subtle inline SVG film grain overlay (no large image files) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] mix-blend-overlay rounded-3xl -z-0 select-none"
            aria-hidden="true"
          >
            <filter id="scrapbook-film-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#scrapbook-film-grain)" />
          </svg>

          {/* AnimatePresence for coordinated mood switching */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMood.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -20, scale: 0.98 }
              }
              transition={{ duration: 0.5, ease: EASE }}
              className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center justify-items-center"
            >
              {/* Left: Focal Polaroid (larger frame, sitting at fixed rotation) */}
              <div className="w-full lg:col-span-7 flex justify-center">
                <PolaroidCard
                  item={featuredImage}
                  index={0}
                  totalCount={lightboxImages.length}
                  onClick={openLightbox}
                  prefersReducedMotion={prefersReducedMotion}
                  canHover={canHover}
                  dragBoundsRef={galleryBoundsRef}
                  zIndex={cardZIndices[0] || 15}
                  onDragStart={handleCardDragStart}
                  isFeatured={true}
                  triggerRefCallback={(el) => {
                    cardTriggerRefs.current[0] = el;
                  }}
                />
              </div>

              {/* Right: Supporting Polaroids in Scrapbook Overlap */}
              <div className="w-full lg:col-span-5 flex flex-col gap-6 sm:gap-7 items-center justify-center">
                {supportingImages.map((item, sIdx) => {
                  const globalIdx = sIdx + 1;
                  return (
                    <div
                      key={item.src + sIdx}
                      className={`w-full flex justify-center ${
                        sIdx > 0 ? 'lg:-mt-6' : ''
                      }`}
                    >
                      <PolaroidCard
                        item={item}
                        index={globalIdx}
                        totalCount={lightboxImages.length}
                        onClick={openLightbox}
                        prefersReducedMotion={prefersReducedMotion}
                        canHover={canHover}
                        dragBoundsRef={galleryBoundsRef}
                        zIndex={cardZIndices[globalIdx] || 12 - sIdx}
                        onDragStart={handleCardDragStart}
                        isFeatured={false}
                        triggerRefCallback={(el) => {
                          cardTriggerRefs.current[globalIdx] = el;
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Accessible Full-Screen Lightbox */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex(
            (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length
          )
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
        }
        triggerElementRef={cardTriggerRefs}
        activeTriggerIndex={activeTriggerIndex}
      />
    </section>
  );
};

export default EditorialGallery;
