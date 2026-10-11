import { useEffect, useState, useCallback } from 'react';

export type ReducedMotionLevel = 'none' | 'minimal' | 'full';

const STORAGE_KEY = 'royal-bean-reduced-motion';

export const useReducedMotion = (): { level: ReducedMotionLevel; prefersReducedMotion: boolean } => {
  const [level, setLevel] = useState<ReducedMotionLevel>(() => {
    if (typeof window === 'undefined') return 'none';
    const stored = localStorage.getItem(STORAGE_KEY) as ReducedMotionLevel | null;
    if (stored) return stored;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches ? 'full' : 'none';
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && level !== 'full') {
        setLevel('full');
      }
    };

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [level]);

  const setReducedMotionLevel = useCallback((newLevel: ReducedMotionLevel) => {
    setLevel(newLevel);
    localStorage.setItem(STORAGE_KEY, newLevel);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, level);
  }, [level]);

  return {
    level,
    prefersReducedMotion: prefersReducedMotion || level === 'full',
    setReducedMotionLevel,
  };
};

export const usePrefersReducedMotion = (): boolean => {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setPrefers(e.matches);

    setPrefers(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefers;
};

export default useReducedMotion;