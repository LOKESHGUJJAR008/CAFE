import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Download, Share2, Sparkles, Check, Loader2 } from 'lucide-react';
import { moods } from '../../data/moods';
import { siteData } from '../../data/site';
import { INSTAGRAM } from '../../config';

const EASE = [0.22, 1, 0.36, 1];

// Canvas helper: polyfill / fallback for roundRect
function drawRoundRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

/**
 * MoodCardModal — Generates and previews a vertical 9:16 (1080x1920) mood card
 * using the HTML5 Canvas API without external dependencies.
 */
export const MoodCardModal = ({
  isOpen,
  onClose,
  moodId = 'slow-mornings',
  triggerRef,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const canvasRef = useRef(null);

  const [cardDataUrl, setCardDataUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const currentMood = moods.find((m) => m.id === moodId) || moods[0];
  const moodIndex = moods.findIndex((m) => m.id === moodId) + 1;
  const instagramHandle =
    siteData?.socials?.instagramHandle ||
    (INSTAGRAM ? '@tatvacafe' : null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Trap focus and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const returnTarget = triggerRef?.current;

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 60);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      returnTarget?.focus?.();
    };
  }, [isOpen, onClose, triggerRef]);

  // Generate 1080x1920 vertical canvas card
  const generateCanvasCard = useCallback(async () => {
    setIsGenerating(true);
    setCardDataUrl(null);

    try {
      // 1. Ensure web fonts are completely ready before rendering
      if (document.fonts) {
        try {
          await Promise.all([
            document.fonts.load('600 42px "Caveat"'),
            document.fonts.load('bold 74px "Playfair Display"'),
            document.fonts.load('italic 36px "Playfair Display"'),
            document.fonts.load('bold 30px "Playfair Display"'),
            document.fonts.load('bold 20px "Inter"'),
            document.fonts.load('400 23px "Inter"'),
            document.fonts.ready,
          ]);
        } catch {
          if (document.fonts.ready) {
            await document.fonts.ready;
          }
        }
      }

      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isDark = currentMood.id === 'late-night';

      // 2. Base Background
      const baseBg = isDark
        ? '#1F1612'
        : currentMood.id === 'coffee-conversations'
        ? '#EADBC8'
        : '#FBF7F1';

      ctx.fillStyle = baseBg;
      ctx.fillRect(0, 0, 1080, 1920);

      // Subtle warm radial ambient glow
      const radialGlow = ctx.createRadialGradient(540, 700, 80, 540, 960, 900);
      radialGlow.addColorStop(
        0,
        isDark ? 'rgba(201, 162, 126, 0.18)' : 'rgba(234, 219, 200, 0.65)'
      );
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, 1080, 1920);

      // 3. Elegant Outer Border Frame
      ctx.strokeStyle = isDark
        ? 'rgba(201, 162, 126, 0.28)'
        : 'rgba(201, 162, 126, 0.4)';
      ctx.lineWidth = 3;
      drawRoundRect(ctx, 48, 48, 984, 1824, 40);
      ctx.stroke();

      // Inner hairline rule
      ctx.strokeStyle = isDark
        ? 'rgba(201, 162, 126, 0.12)'
        : 'rgba(201, 162, 126, 0.18)';
      ctx.lineWidth = 1.5;
      drawRoundRect(ctx, 60, 60, 960, 1800, 32);
      ctx.stroke();

      // 4. Header: Handwritten Line with Today's Date
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      ctx.font = '600 42px "Caveat", cursive, sans-serif';
      ctx.fillStyle = '#A8612E';
      ctx.textAlign = 'center';
      ctx.fillText(`today's mood ✦ ${formattedDate}`, 540, 150);

      // 5. Featured Photo Area
      const photoX = 90;
      const photoY = 195;
      const photoW = 900;
      const photoH = 1050;
      const photoRadius = 28;

      ctx.save();
      drawRoundRect(ctx, photoX, photoY, photoW, photoH, photoRadius);
      ctx.clip();

      // Load image with gradient fallback & crossOrigin
      const imageSrc =
        currentMood.featuredImage?.src || currentMood.galleryImages?.[0]?.src;
      let imgLoaded = false;

      if (imageSrc) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;

        const loadedImg = await new Promise((resolve) => {
          if (img.complete) {
            resolve(img);
          } else {
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
          }
        });

        if (loadedImg) {
          imgLoaded = true;
          // Object-fit: cover inside target rectangle
          const targetRatio = photoW / photoH;
          const imgRatio = loadedImg.width / loadedImg.height;
          let sx, sy, sw, sh;

          if (imgRatio > targetRatio) {
            sh = loadedImg.height;
            sw = loadedImg.height * targetRatio;
            sx = (loadedImg.width - sw) / 2;
            sy = 0;
          } else {
            sw = loadedImg.width;
            sh = loadedImg.width / targetRatio;
            sx = 0;
            sy = (loadedImg.height - sh) / 2;
          }

          ctx.drawImage(
            loadedImg,
            sx,
            sy,
            sw,
            sh,
            photoX,
            photoY,
            photoW,
            photoH
          );
        }
      }

      // Gradient fallback if image failed to load
      if (!imgLoaded) {
        const fallbackGrad = ctx.createLinearGradient(
          photoX,
          photoY,
          photoX + photoW,
          photoY + photoH
        );
        fallbackGrad.addColorStop(0, '#1F1612');
        fallbackGrad.addColorStop(0.5, '#A8612E');
        fallbackGrad.addColorStop(1, '#C9A27E');
        ctx.fillStyle = fallbackGrad;
        ctx.fillRect(photoX, photoY, photoW, photoH);
      }

      // Warm cinematic overlay
      const warmGrad = ctx.createLinearGradient(
        photoX,
        photoY,
        photoX,
        photoY + photoH
      );
      warmGrad.addColorStop(0, 'rgba(168, 97, 46, 0.1)');
      warmGrad.addColorStop(0.55, 'rgba(31, 22, 18, 0.15)');
      warmGrad.addColorStop(1, 'rgba(31, 22, 18, 0.7)');
      ctx.fillStyle = warmGrad;
      ctx.fillRect(photoX, photoY, photoW, photoH);

      ctx.restore();

      // Photo border
      ctx.strokeStyle = 'rgba(251, 247, 241, 0.3)';
      ctx.lineWidth = 3;
      drawRoundRect(ctx, photoX, photoY, photoW, photoH, photoRadius);
      ctx.stroke();

      // Film date stamp inside photo corner
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#A8612E';
      ctx.textAlign = 'right';
      ctx.fillText(
        currentMood.featuredImage?.filmDate || '12 · 10 · 26',
        photoX + photoW - 30,
        photoY + photoH - 25
      );

      // 6. Lower Typography Section
      // Eyebrow
      ctx.font = 'bold 20px Inter, sans-serif';
      ctx.fillStyle = isDark ? '#C9A27E' : '#A8612E';
      ctx.textAlign = 'center';
      ctx.fillText(
        `COLLECTION 0${moodIndex} · TATVA ATMOSPHERE`,
        540,
        1350
      );

      // Large Playfair Mood Title
      ctx.font = 'bold 74px "Playfair Display", serif';
      ctx.fillStyle = isDark ? '#FBF7F1' : '#1F1612';
      ctx.textAlign = 'center';
      ctx.fillText(currentMood.title, 540, 1450);

      // Caption Line
      ctx.font = 'italic 36px "Playfair Display", serif';
      ctx.fillStyle = isDark
        ? 'rgba(251, 247, 241, 0.85)'
        : 'rgba(31, 22, 18, 0.8)';
      ctx.fillText(`“${currentMood.caption}”`, 540, 1530);

      // Mood Descriptor Note
      ctx.font = '400 23px Inter, sans-serif';
      ctx.fillStyle = isDark
        ? 'rgba(251, 247, 241, 0.65)'
        : 'rgba(31, 22, 18, 0.68)';
      const shortDesc =
        currentMood.description.length > 70
          ? currentMood.description.slice(0, 68) + '…'
          : currentMood.description;
      ctx.fillText(shortDesc, 540, 1600);

      // 7. Bottom Divider & "TATVA CAFE" Wordmark
      ctx.strokeStyle = isDark
        ? 'rgba(201, 162, 126, 0.25)'
        : 'rgba(201, 162, 126, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(320, 1680);
      ctx.lineTo(760, 1680);
      ctx.stroke();

      // Wordmark
      ctx.font = 'bold 30px "Playfair Display", serif';
      ctx.fillStyle = isDark ? '#FBF7F1' : '#1F1612';
      ctx.fillText('TATVA CAFÉ', 540, 1740);

      // Subline with Instagram handle if available
      ctx.font = '600 20px Inter, sans-serif';
      ctx.fillStyle = isDark ? '#C9A27E' : '#A8612E';
      ctx.fillText(
        instagramHandle
          ? `Talwandi, Kota · ${instagramHandle}`
          : 'Talwandi, Kota',
        540,
        1785
      );

      // Final Data URL
      const dataUrl = canvas.toDataURL('image/png', 0.95);
      setCardDataUrl(dataUrl);
    } catch (err) {
      console.error('Failed to generate mood card canvas:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [currentMood, moodIndex, instagramHandle]);

  // Generate canvas when modal opens or mood changes
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) {
        generateCanvasCard();
      }
    }, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isOpen, generateCanvasCard]);

  // Download card as PNG
  const handleDownload = () => {
    if (!cardDataUrl) return;
    const link = document.createElement('a');
    link.download = `tatva-${currentMood.id}-mood-card.png`;
    link.href = cardDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2400);
  };

  // Share card via Web Share API or download fallback
  const handleShare = async () => {
    if (!cardDataUrl) return;

    try {
      // Convert data URL to Blob & File
      const res = await fetch(cardDataUrl);
      const blob = await res.blob();
      const file = new File(
        [blob],
        `tatva-${currentMood.id}-mood-card.png`,
        { type: 'image/png' }
      );

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${currentMood.title} | TATVA Café`,
          text: `My coffee mood is ${currentMood.title} at ${instagramHandle} ☕`,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2400);
      } else if (navigator.share) {
        await navigator.share({
          title: `${currentMood.title} | TATVA Café`,
          text: `My coffee mood is ${currentMood.title} at ${instagramHandle} ☕`,
          url: window.location.href,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2400);
      } else {
        // Fallback: trigger standard download
        handleDownload();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('Web Share failed, downloading file instead:', err);
        handleDownload();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mood-card-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1F1612]/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 16 }
            }
            transition={{ duration: 0.35, ease: EASE }}
            className="relative z-10 w-full max-w-lg bg-[#FBF7F1] text-[#1F1612] rounded-3xl p-5 sm:p-7 border border-[#C9A27E]/30 shadow-2xl overflow-hidden my-auto"
          >
            {/* Header: Title & Close Button */}
            <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#C9A27E]/25">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A8612E]" />
                <h2
                  id="mood-card-title"
                  className="font-playfair font-bold text-lg sm:text-xl text-[#1F1612]"
                >
                  Your 9:16 Mood Card
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close mood card modal"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#1F1612]/70 hover:text-[#1F1612] hover:bg-[#EADBC8]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Box */}
            <div className="relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] bg-[#EADBC8]/30 rounded-2xl p-3 border border-[#C9A27E]/20 overflow-hidden mb-4">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-3 text-center py-12">
                  <Loader2 className="w-8 h-8 text-[#A8612E] animate-spin" />
                  <p className="font-inter text-xs sm:text-sm font-semibold text-[#1F1612]/75">
                    Crafting your 1080×1920 story card…
                  </p>
                </div>
              ) : cardDataUrl ? (
                <img
                  src={cardDataUrl}
                  alt={`${currentMood.title} custom mood card`}
                  className="max-h-[55vh] sm:max-h-[62vh] aspect-[9/16] rounded-xl shadow-xl object-contain mx-auto"
                />
              ) : (
                <div className="text-center py-12">
                  <p className="font-inter text-sm text-[#1F1612]/70">
                    Failed to preview card. Please try again.
                  </p>
                  <button
                    type="button"
                    onClick={generateCanvasCard}
                    className="mt-3 px-4 py-1.5 rounded-full bg-[#A8612E] text-[#FBF7F1] text-xs font-semibold"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons: Download & Share */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
              <button
                type="button"
                disabled={isGenerating || !cardDataUrl}
                onClick={handleDownload}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#A8612E] hover:bg-[#A8612E]/90 text-[#FBF7F1] font-inter font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved to device!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download PNG</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={isGenerating || !cardDataUrl}
                onClick={handleShare}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FBF7F1] hover:bg-[#EADBC8]/50 text-[#1F1612] border border-[#C9A27E]/40 font-inter font-semibold text-xs sm:text-sm tracking-wide shadow-xs transition-all disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
              >
                {shareSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#A8612E]" />
                    <span>Shared!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#A8612E]" />
                    <span>Share Card</span>
                  </>
                )}
              </button>
            </div>

            {/* Repost callout with Instagram handle if available */}
            <p className="text-center font-inter text-xs text-[#1F1612]/70 leading-relaxed">
              Tag us and we&apos;ll repost
              {instagramHandle ? (
                <>
                  {' '}
                  <span className="font-semibold text-[#A8612E]">
                    {instagramHandle}
                  </span>
                </>
              ) : null}{' '}
              ✦
            </p>

            {/* Hidden canvas element for rendering */}
            <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MoodCardModal;
