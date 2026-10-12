import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ZoomIn, Sparkles } from 'lucide-react';
import { moods } from '../../data/moods';
import GalleryLightbox from './GalleryLightbox';

const EASE = [0.22, 1, 0.36, 1];

export const EditorialGallery = ({ selectedMood = 'slow-mornings' }) => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const cardTriggerRefs = useRef({});

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTriggerIndex, setActiveTriggerIndex] = useState(0);

  // Parallax pointer state
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [canHover] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  const currentMood = useMemo(() => {
    return moods.find((m) => m.id === selectedMood) || moods[0];
  }, [selectedMood]);

  // Construct the 4 editorial images for the grid
  const editorialImages = useMemo(() => {
    const list = [
      currentMood.featuredImage,
      ...(currentMood.galleryImages || []).filter(
        (img) => img.src !== currentMood.featuredImage.src
      ),
    ];
    // Guarantee 4 slots
    while (list.length < 4 && currentMood.galleryImages?.length > 0) {
      list.push(currentMood.galleryImages[list.length % currentMood.galleryImages.length]);
    }
    return list.slice(0, 4);
  }, [currentMood]);

  // All photos for lightbox navigation
  const lightboxImages = useMemo(() => {
    const uniqueMap = new Map();
    [currentMood.featuredImage, ...(currentMood.galleryImages || [])].forEach((item) => {
      if (item?.src && !uniqueMap.has(item.src)) {
        uniqueMap.set(item.src, item);
      }
    });
    return Array.from(uniqueMap.values());
  }, [currentMood]);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !canHover || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x: normX, y: normY });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const openLightbox = (index) => {
    setActiveTriggerIndex(index);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Determine section text & border colors adapting to mood background tint
  const isDarkMood = currentMood.visualTreatment.bgTint === '#1F1612';
  const headingColor = isDarkMood ? '#FBF7F1' : '#1F1612';
  const textColor = isDarkMood ? 'rgba(251, 247, 241, 0.75)' : 'rgba(31, 22, 18, 0.75)';
  const borderColor = isDarkMood ? 'rgba(201, 162, 126, 0.3)' : 'rgba(201, 162, 126, 0.35)';

  return (
    <motion.section
      animate={{ backgroundColor: currentMood.visualTreatment.bgTint }}
      transition={{ duration: 0.65, ease: EASE }}
      className="relative py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-12 overflow-hidden transition-colors"
      style={{ perspective: '1200px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBC8]/40 border border-[#C9A27E]/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A8612E]" />
            <span className="font-inter text-xs font-bold tracking-[0.2em] text-[#A8612E] uppercase">
              {currentMood.title} Collection
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3"
            style={{ color: headingColor }}
          >
            “{currentMood.caption}”
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="font-inter text-sm sm:text-base leading-relaxed"
            style={{ color: textColor }}
          >
            {currentMood.description}
          </motion.p>
        </div>

        {/* Gallery Container with 3D Parallax and AnimatePresence mood transition */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMood.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24, scale: 0.985 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -20, scale: 0.985 }
              }
              transition={{ duration: 0.5, ease: EASE }}
              className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-8 items-start"
            >
              {/* ── Left Focal Point: Featured Photo (58% width on desktop) ── */}
              <div
                className="w-full lg:col-span-7 transition-transform duration-100 ease-out"
                style={{
                  transform:
                    !prefersReducedMotion && canHover
                      ? `translate3d(${mouseOffset.x * -4}px, ${mouseOffset.y * -4}px, 0px)`
                      : 'none',
                }}
              >
                <div
                  ref={(el) => {
                    cardTriggerRefs.current[0] = el;
                  }}
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(0)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(0);
                    }
                  }}
                  aria-label={`View enlarged photo: ${editorialImages[0].caption || currentMood.title}`}
                  className="group relative block w-full rounded-3xl overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(31,22,18,0.16)] border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                  style={{
                    backgroundColor: currentMood.visualTreatment.panelBg,
                    borderColor: borderColor,
                  }}
                >
                  {/* Fixed aspect ratio container preventing CLS */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#EADBC8]">
                    <img
                      src={editorialImages[0].src}
                      alt={editorialImages[0].alt || currentMood.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/images/hero.webp';
                      }}
                    />

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, transparent 40%, rgba(31, 22, 18, 0.6) 100%)',
                      }}
                      aria-hidden="true"
                    />

                    {/* Floating Zoom Action Badge */}
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F1612]/75 backdrop-blur-sm text-[#FBF7F1] border border-[#C9A27E]/30 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-3.5 h-3.5 text-[#C9A27E]" />
                      <span>Zoom</span>
                    </div>

                    {/* Top index badge */}
                    <div className="absolute top-4 left-4 font-inter text-[11px] font-bold tracking-widest uppercase text-[#FBF7F1] bg-[#1F1612]/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#C9A27E]/25">
                      01 / 04
                    </div>
                  </div>

                  {/* Caption & Metadata Strip */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="font-inter text-xs font-bold uppercase tracking-wider text-[#A8612E]">
                        Focal Ritual
                      </span>
                      <span className="font-inter text-xs opacity-60 font-semibold" style={{ color: headingColor }}>
                        {currentMood.title}
                      </span>
                    </div>
                    <p
                      className="font-playfair text-base sm:text-lg italic font-medium leading-relaxed"
                      style={{ color: headingColor }}
                    >
                      “{editorialImages[0].caption}”
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Right Column: 3 Layered Supporting Cards with Depth & Rotation ── */}
              <div className="w-full lg:col-span-5 flex flex-col gap-6 sm:gap-7 relative lg:pl-2">
                {/* Supporting Card 1 (Top right, slight rotate 2.5deg) */}
                <div
                  className="transition-transform duration-100 ease-out"
                  style={{
                    transform:
                      !prefersReducedMotion && canHover
                        ? `translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px, 20px) rotate(2deg)`
                        : !prefersReducedMotion
                        ? 'rotate(1.5deg)'
                        : 'none',
                  }}
                >
                  <div
                    ref={(el) => {
                      cardTriggerRefs.current[1] = el;
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(1)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(1);
                      }
                    }}
                    aria-label={`View enlarged photo: ${editorialImages[1].caption}`}
                    className="group relative flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl cursor-pointer shadow-[0_12px_32px_rgba(31,22,18,0.1)] border transition-all duration-300 hover:shadow-[0_16px_40px_rgba(31,22,18,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                    style={{
                      backgroundColor: currentMood.visualTreatment.panelBg,
                      borderColor: borderColor,
                    }}
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-[#EADBC8]">
                      <img
                        src={editorialImages[1].src}
                        alt={editorialImages[1].alt || 'Supporting detail'}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/images/gallery/cafe-1.webp';
                        }}
                      />
                      <span className="absolute bottom-1 right-1 font-inter text-[9px] font-bold text-[#FBF7F1] bg-[#1F1612]/75 px-1.5 py-0.5 rounded">
                        02 / 04
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <span className="block font-inter text-[10px] uppercase font-bold tracking-widest text-[#A8612E] mb-1">
                        Perspective
                      </span>
                      <p
                        className="font-playfair text-xs sm:text-sm italic font-medium line-clamp-2"
                        style={{ color: headingColor }}
                      >
                        “{editorialImages[1].caption}”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Supporting Card 2 (Middle, slight rotate -3deg with partial overlap) */}
                <div
                  className="transition-transform duration-100 ease-out lg:-mt-2"
                  style={{
                    transform:
                      !prefersReducedMotion && canHover
                        ? `translate3d(${mouseOffset.x * -10}px, ${mouseOffset.y * -10}px, 40px) rotate(-2.5deg)`
                        : !prefersReducedMotion
                        ? 'rotate(-2deg)'
                        : 'none',
                  }}
                >
                  <div
                    ref={(el) => {
                      cardTriggerRefs.current[2] = el;
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(2)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(2);
                      }
                    }}
                    aria-label={`View enlarged photo: ${editorialImages[2].caption}`}
                    className="group relative flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl cursor-pointer shadow-[0_14px_36px_rgba(31,22,18,0.12)] border transition-all duration-300 hover:shadow-[0_20px_45px_rgba(31,22,18,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                    style={{
                      backgroundColor: currentMood.visualTreatment.panelBg,
                      borderColor: borderColor,
                    }}
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-[#EADBC8]">
                      <img
                        src={editorialImages[2].src}
                        alt={editorialImages[2].alt || 'Supporting detail'}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/images/gallery/cafe-2.webp';
                        }}
                      />
                      <span className="absolute bottom-1 right-1 font-inter text-[9px] font-bold text-[#FBF7F1] bg-[#1F1612]/75 px-1.5 py-0.5 rounded">
                        03 / 04
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <span className="block font-inter text-[10px] uppercase font-bold tracking-widest text-[#A8612E] mb-1">
                        Atmosphere
                      </span>
                      <p
                        className="font-playfair text-xs sm:text-sm italic font-medium line-clamp-2"
                        style={{ color: headingColor }}
                      >
                        “{editorialImages[2].caption}”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Supporting Card 3 (Bottom, slight rotate 2deg) */}
                <div
                  className="transition-transform duration-100 ease-out lg:-mt-2"
                  style={{
                    transform:
                      !prefersReducedMotion && canHover
                        ? `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 8}px, 25px) rotate(2deg)`
                        : !prefersReducedMotion
                        ? 'rotate(1.5deg)'
                        : 'none',
                  }}
                >
                  <div
                    ref={(el) => {
                      cardTriggerRefs.current[3] = el;
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(3)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(3);
                      }
                    }}
                    aria-label={`View enlarged photo: ${editorialImages[3].caption}`}
                    className="group relative flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl cursor-pointer shadow-[0_12px_32px_rgba(31,22,18,0.1)] border transition-all duration-300 hover:shadow-[0_16px_40px_rgba(31,22,18,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                    style={{
                      backgroundColor: currentMood.visualTreatment.panelBg,
                      borderColor: borderColor,
                    }}
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-[#EADBC8]">
                      <img
                        src={editorialImages[3].src}
                        alt={editorialImages[3].alt || 'Supporting detail'}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/images/gallery/cafe-3.webp';
                        }}
                      />
                      <span className="absolute bottom-1 right-1 font-inter text-[9px] font-bold text-[#FBF7F1] bg-[#1F1612]/75 px-1.5 py-0.5 rounded">
                        04 / 04
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <span className="block font-inter text-[10px] uppercase font-bold tracking-widest text-[#A8612E] mb-1">
                        Detail
                      </span>
                      <p
                        className="font-playfair text-xs sm:text-sm italic font-medium line-clamp-2"
                        style={{ color: headingColor }}
                      >
                        “{editorialImages[3].caption}”
                      </p>
                    </div>
                  </div>
                </div>
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
    </motion.section>
  );
};

export default EditorialGallery;
