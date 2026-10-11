import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '../hooks/useIntersectionObserver';
import { ANIMATION } from '../config';

export const ProgressiveImage = ({
  src,
  alt,
  placeholder,
  className = '',
  style = {},
  priority = false,
  sizes,
  // quality = 80, // reserved for future use
  onLoad,
  onError,
}) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ref, isInView] = useInView({ once: true, rootMargin: '100px' });
  const imgRef = useRef(null);

  const shouldLoad = priority || isInView;

  useEffect(() => {
    if (!shouldLoad || hasError) return;

    const img = new Image();
    img.src = src;
    img.loading = priority ? 'eager' : 'lazy';

    img.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = src;
      }
      setIsLoaded(true);
      onLoad?.();
    };

    img.onerror = () => {
      setHasError(true);
      onError?.();
    };
  }, [shouldLoad, src, onLoad, onError, hasError, priority]);

  const placeholderStyle = {
    ...style,
    filter: 'blur(20px)',
    transform: 'scale(1.1)',
    transition: prefersReducedMotion
      ? 'none'
      : `filter ${ANIMATION.slower}s ${ANIMATION.ease}, transform ${ANIMATION.slower}s ${ANIMATION.ease}`,
  };

  const loadedStyle = {
    ...style,
    filter: 'blur(0)',
    transform: 'scale(1)',
    transition: prefersReducedMotion
      ? 'none'
      : `opacity ${ANIMATION.slow}s ${ANIMATION.ease}, filter ${ANIMATION.slow}s ${ANIMATION.ease}, transform ${ANIMATION.slow}s ${ANIMATION.ease}`,
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}>
      {(placeholder || !isLoaded) && (
        <motion.img
          src={placeholder || src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={isLoaded ? { opacity: 0 } : placeholderStyle}
          initial={false}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : ANIMATION.slow }}
        />
      )}

      <motion.img
        ref={imgRef}
        src={isLoaded && !hasError ? src : placeholder || ''}
        alt={alt}
        className="relative w-full h-full object-cover"
        style={isLoaded && !hasError ? loadedStyle : { opacity: 0 }}
        initial={false}
        animate={{ opacity: isLoaded && !hasError ? 1 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : ANIMATION.slow }}
        onLoad={() => {
          if (!isLoaded) {
            setIsLoaded(true);
            onLoad?.();
          }
        }}
        onError={() => {
          setHasError(true);
          onError?.();
        }}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
      />

      {hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-almond/50"
          style={loadedStyle}
        >
          <svg
            className="w-12 h-12 text-latte/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export const BlurHashImage = ({
  blurhash,
  ...props
}) => {
  const placeholder = blurhash
    ? `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <filter id="b"><feGaussianBlur stdDeviation="20"/></filter>
        <rect width="100%" height="100%" filter="url(#b)" fill="${blurhash}"/>
      </svg>
    `)}`
    : undefined;

  return <ProgressiveImage {...props} placeholder={placeholder} />;
};

export const SkeletonImage = ({
  className = '',
  style = {},
  aspectRatio = '4/3',
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden bg-almond/30 ${className}`}
      style={{
        ...style,
        aspectRatio,
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          backgroundColor: prefersReducedMotion
            ? '#EADBC8'
            : ['#EADBC8', '#D4C4A8', '#EADBC8'],
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
        className="absolute inset-0"
      />
    </div>
  );
};

export default ProgressiveImage;