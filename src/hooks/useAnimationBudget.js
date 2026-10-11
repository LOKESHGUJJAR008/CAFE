import { useEffect, useRef, useState, useCallback } from 'react';

interface FrameMetrics {
  fps: number;
  frameTime: number;
  droppedFrames: number;
  totalFrames: number;
}

interface AnimationBudgetOptions {
  sampleSize?: number;
  warningThreshold?: number;
  onWarning?: (metrics: FrameMetrics) => void;
}

export const useAnimationBudget = (options: AnimationBudgetOptions = {}): FrameMetrics & {
  isOverBudget: boolean;
  reset: () => void;
} => {
  const {
    sampleSize = 120,
    warningThreshold = 16.67,
    onWarning,
  } = options;

  const [metrics, setMetrics] = useState<FrameMetrics>({
    fps: 60,
    frameTime: 16.67,
    droppedFrames: 0,
    totalFrames: 0,
  });

  const framesRef = useRef<number[]>([]);
  const lastTimeRef = useRef<number>(performance.now());
  const animationIdRef = useRef<number>();
  const warningTriggeredRef = useRef(false);

  const measureFrame = useCallback((currentTime: number) => {
    const frameTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    framesRef.current.push(frameTime);
    if (framesRef.current.length > sampleSize) {
      framesRef.current.shift();
    }

    const totalFrames = framesRef.current.length;
    const droppedFrames = framesRef.current.filter((t) => t > warningThreshold).length;
    const avgFrameTime = framesRef.current.reduce((a, b) => a + b, 0) / totalFrames;
    const fps = 1000 / avgFrameTime;

    const newMetrics: FrameMetrics = {
      fps: Math.round(fps),
      frameTime: Math.round(avgFrameTime * 100) / 100,
      droppedFrames,
      totalFrames,
    };

    setMetrics(newMetrics);

    const isOverBudget = droppedFrames / totalFrames > 0.05;
    if (isOverBudget && !warningTriggeredRef.current && onWarning) {
      warningTriggeredRef.current = true;
      onWarning(newMetrics);
    } else if (!isOverBudget) {
      warningTriggeredRef.current = false;
    }

    animationIdRef.current = requestAnimationFrame(measureFrame);
  }, [sampleSize, warningThreshold, onWarning]);

  useEffect(() => {
    animationIdRef.current = requestAnimationFrame(measureFrame);
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [measureFrame]);

  const reset = useCallback(() => {
    framesRef.current = [];
    lastTimeRef.current = performance.now();
    warningTriggeredRef.current = false;
    setMetrics({
      fps: 60,
      frameTime: 16.67,
      droppedFrames: 0,
      totalFrames: 0,
    });
  }, []);

  return {
    ...metrics,
    isOverBudget: metrics.droppedFrames / Math.max(metrics.totalFrames, 1) > 0.05,
    reset,
  };
};

export const useReducedMotionAuto = (): boolean => {
  const { isOverBudget } = useAnimationBudget({
    onWarning: () => {
      // Could dispatch event to notify components to reduce motion
      window.dispatchEvent(new CustomEvent('animation-budget-exceeded'));
    },
  });

  return isOverBudget;
};

export default useAnimationBudget;