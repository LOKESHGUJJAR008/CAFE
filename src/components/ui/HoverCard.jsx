import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../../lib/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
  imageZoom?: boolean;
  borderGlow?: boolean;
  as?: React.ElementType;
  onClick?: () => void;
}

export const HoverCard = forwardRef<HTMLElement, HoverCardProps>(
  (
    {
      children,
      className = '',
      hoverLift = true,
      imageZoom = false,
      borderGlow = false,
      as: Component = 'div',
      onClick,
      ...props
    },
    ref
  ) => {
    const { prefersReducedMotion } = useReducedMotion();

    const cardVariants = prefersReducedMotion
      ? {}
      : hoverLift
      ? variants.cardHover
      : {};

    const imageVariants = prefersReducedMotion || !imageZoom
      ? {}
      : variants.imageZoom;

    const glowVariants = prefersReducedMotion || !borderGlow
      ? {}
      : {
          whileHover: {
            boxShadow: '0 0 0 2px #A8612E, 0 20px 40px rgba(31,22,18,0.15)',
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          },
        };

    const isClickable = typeof onClick === 'function';

    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        className={`
          relative overflow-hidden rounded-2xl transition-all duration-300
          ${isClickable ? 'cursor-pointer' : ''}
          ${className}
        `}
        onClick={onClick}
        {...(isClickable ? { role: 'button', tabIndex: 0 } : {})}
        {...props}
      >
        {typeof children === 'function' ? (
          children({ imageVariants, glowVariants, prefersReducedMotion })
        ) : (
          React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;

            const isImage = child.type === 'img' || 
              (typeof child.type === 'string' && child.type === 'img') ||
              child.props.className?.includes('image') ||
              child.props.className?.includes('Image');

            if (isImage && imageZoom) {
              return React.cloneElement(child as React.ReactElement, {
                variants: imageVariants,
              });
            }

            return child;
          })
        )}
      </motion.div>
    );
  }
);

HoverCard.displayName = 'HoverCard';

export interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export const ImageZoom = forwardRef<HTMLImageElement, ImageZoomProps>(
  ({ src, alt, className = '', fill = false, priority = false, ...props }, ref) => {
    const { prefersReducedMotion } = useReducedMotion();

    const imageVariants = prefersReducedMotion
      ? {}
      : variants.imageZoom;

    return (
      <motion.img
        ref={ref}
        src={src}
        alt={alt}
        variants={imageVariants}
        className={`
          w-full h-full object-cover transition-transform duration-500
          ${fill ? 'absolute inset-0' : ''}
          ${className}
        `}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
    );
  }
);

ImageZoom.displayName = 'ImageZoom';

export default HoverCard;