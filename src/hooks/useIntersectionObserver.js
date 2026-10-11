import { useEffect, useRef, useState, useCallback } from 'react';

export const useIntersectionObserver = (
  options = {}
) => {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    once = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  const hasTriggered = useRef(false);

  const _setRef = useCallback((node) => {
    elementRef.current = node;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (once && hasTriggered.current && isIntersecting) return;

    observerRef.current = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);
        setIsIntersecting(observerEntry.isIntersecting);

        if (once && observerEntry.isIntersecting) {
          hasTriggered.current = true;
          observerRef.current?.unobserve(element);
        }
      },
      { root, rootMargin, threshold }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [root, rootMargin, threshold, once, isIntersecting]);

  return { ref: elementRef, isIntersecting, entry };
};

export const useInView = (
  options = {}
) => {
  const { ref, isIntersecting } = useIntersectionObserver(options);
  return [ref, isIntersecting];
};

export const useScrollSpy = (
  sectionIds,
  options = {}
) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -75% 0px', ...options }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, options]);

  return activeId;
};

export default useIntersectionObserver;