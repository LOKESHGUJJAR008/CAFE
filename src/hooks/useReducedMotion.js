import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'royal-bean-reduced-motion';

export const useReducedMotion = () => {
  const [level, setLevel] = useState(() => {
    if (typeof window === 'undefined') return 'none';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches ? 'full' : 'none';
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && level !== 'full') {
        setLevel('full');
      }
    };

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [level]);

  const setReducedMotionLevel = useCallback((newLevel) => {
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

export const usePrefersReducedMotion = () => {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setPrefers(e.matches);

    setPrefers(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefers;
};

export default useReducedMotion;