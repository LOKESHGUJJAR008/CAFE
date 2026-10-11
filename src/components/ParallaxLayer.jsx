import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  offset?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxLayer = ({
  children,
  speed = 0.3,
  offset = 0,
  className = '',
  style = {},
}: ParallaxLayerProps) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateParallax = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = (viewportCenter - elementCenter) / viewportCenter;

      const y = distanceFromCenter * speed * 100 + offset;

      setTransform({ x: 0, y });
    };

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);

    return () => {
      window.removeEventListener('scroll', updateParallax);
      window.removeEventListener('resize', updateParallax);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, offset, prefersReducedMotion]);

  return (
    <div
      ref={elementRef}
      className={`
        relative overflow-hidden will-change-transform
        ${className}
      `}
      style={{
        ...style,
        transform: prefersReducedMotion ? 'none' : `translate3d(0, ${transform.y}px, 0)`,
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
    >
      {children}
    </div>
  );
};

interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  layers: Array<{
    speed: number;
    offset?: number;
    children: React.ReactNode;
    className?: string;
  }>;
}

export const ParallaxContainer = ({
  children,
  className = '',
  style = {},
  layers = [],
}: ParallaxContainerProps) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <div
      className={`
        relative overflow-hidden
        ${className}
      `}
      style={style}
    >
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          speed={layer.speed}
          offset={layer.offset}
          className={layer.className}
        >
          {layer.children}
        </ParallaxLayer>
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface MouseParallaxProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const MouseParallax = ({
  children,
  strength = 20,
  className = '',
  style = {},
}: MouseParallaxProps) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      setTransform({
        x: deltaX * strength,
        y: deltaY * strength,
      });
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
    };

    containerRef.current?.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`
        relative overflow-hidden
        ${className}
      `}
      style={style}
    >
      <motion.div
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          willChange: prefersReducedMotion ? 'auto' : 'transform',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxLayer;