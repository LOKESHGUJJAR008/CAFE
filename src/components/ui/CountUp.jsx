import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '../../hooks/useIntersectionObserver';
import { variants } from '../../lib/variants';

export interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  onComplete?: () => void;
}

const easing = [0.22, 1, 0.36, 1];

export const CountUp = ({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  decimals = 0,
  separator = ',',
  prefix = '',
  suffix = '',
  className = '',
  onComplete,
}: CountUpProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, isInView] = useInView({ once: true, rootMargin: '0px 0px -50px 0px' });
  const [count, setCount] = useState(start);
  const hasAnimated = useRef(false);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  useEffect(() => {
    if (!isInView || hasAnimated.current || prefersReducedMotion) {
      if (prefersReducedMotion || !isInView) {
        setCount(end);
        onComplete?.();
      }
      return;
    }

    hasAnimated.current = true;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime;
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const current = start + (end - start) * easedProgress;
      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        onComplete?.();
      }
    };

    const timeoutId = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isInView, end, start, duration, delay, prefersReducedMotion, onComplete]);

  return (
    <motion.span
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease, delay }}
      className={className}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.span>
  );
};

export interface CountUpGroupProps {
  counters: Array<{
    id: string;
    end: number;
    start?: number;
    duration?: number;
    delay?: number;
    decimals?: number;
    separator?: string;
    prefix?: string;
    suffix?: string;
    label?: string;
  }>;
  staggerDelay?: number;
  className?: string;
}

export const CountUpGroup = ({
  counters,
  staggerDelay = 0.1,
  className = '',
}: CountUpGroupProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, isInView] = useInView({ once: true, rootMargin: '0px 0px -50px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {counters.map((counter, index) => (
          <div key={counter.id} className="text-center">
            <CountUp
              {...counter}
              delay={(counter.delay || 0) + index * staggerDelay}
              className="font-playfair font-bold text-3xl md:text-4xl lg:text-5xl text-ink"
            />
            {counter.label && (
              <p className="mt-1 text-sm text-ink/70 font-inter">{counter.label}</p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CountUp;