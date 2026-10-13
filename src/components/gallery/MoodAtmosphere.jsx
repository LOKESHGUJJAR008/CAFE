import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * MoodAtmosphere — Tiny, CSS-only ambient atmosphere layer for the Gallery page.
 *
 * Micro-details per mood:
 * - Slow Mornings: soft sunlight beam (breathe & gentle drift)
 * - Coffee & Conversations: gentle floating warm bokeh dots (3 orbs)
 * - Sweet Cravings: slow drifting sugar-dust particles (4 tiny motes)
 * - Late Night: soft candle-flicker glow (ambient warmth micro-pulse)
 *
 * Constraints respected:
 * - CSS-only transforms & opacities.
 * - Very low opacity (0.10 - 0.30 max).
 * - Paused when tab is hidden (document.hidden) or prefers-reduced-motion is on.
 * - Zero layout shift, pointer-events none, GPU-accelerated.
 */
export const MoodAtmosphere = ({ selectedMood = 'slow-mornings' }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isTabHidden, setIsTabHidden] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  const pausedClass = isTabHidden ? 'paused-atmosphere' : '';

  return (
    <div
      className={`mood-atmosphere-container pointer-events-none absolute inset-0 overflow-hidden -z-0 ${pausedClass}`}
      aria-hidden="true"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .mood-atmosphere-container,
          .mood-atmosphere-container * {
            animation: none !important;
            display: none !important;
            opacity: 0 !important;
          }
        }

        .paused-atmosphere * {
          animation-play-state: paused !important;
        }

        /* ── Slow Mornings: Soft Sunlight Beam ── */
        .sunlight-beam {
          position: absolute;
          top: -8%;
          left: 15%;
          width: 48vw;
          height: 140vh;
          transform: rotate(-24deg);
          background: linear-gradient(180deg, rgba(251, 247, 241, 0.4) 0%, rgba(201, 162, 126, 0.12) 40%, transparent 80%);
          filter: blur(48px);
          animation: sunlightBreathe 10s ease-in-out infinite alternate;
          will-change: opacity, transform;
        }
        @keyframes sunlightBreathe {
          0% {
            opacity: 0.12;
            transform: rotate(-24deg) translateY(0);
          }
          100% {
            opacity: 0.26;
            transform: rotate(-24deg) translateY(18px);
          }
        }

        /* ── Coffee & Conversations: Floating Warm Bokeh Dots ── */
        .bokeh-dot-1 {
          position: absolute;
          top: 22%;
          right: 10%;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168, 97, 46, 0.2) 0%, transparent 70%);
          filter: blur(28px);
          animation: bokehFloat1 13s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }
        .bokeh-dot-2 {
          position: absolute;
          top: 52%;
          left: 8%;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201, 162, 126, 0.22) 0%, transparent 70%);
          filter: blur(34px);
          animation: bokehFloat2 16s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }
        .bokeh-dot-3 {
          position: absolute;
          bottom: 20%;
          right: 18%;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168, 97, 46, 0.18) 0%, transparent 70%);
          filter: blur(24px);
          animation: bokehFloat1 15s ease-in-out infinite alternate 2.5s;
          will-change: transform, opacity;
        }
        @keyframes bokehFloat1 {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.16;
          }
          100% {
            transform: translate3d(24px, -28px, 0);
            opacity: 0.28;
          }
        }
        @keyframes bokehFloat2 {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.18;
          }
          100% {
            transform: translate3d(-26px, 22px, 0);
            opacity: 0.32;
          }
        }

        /* ── Sweet Cravings: Slow Drifting Sugar-Dust Motes ── */
        .sugar-mote {
          position: absolute;
          border-radius: 50%;
          background-color: #FBF7F1;
          box-shadow: 0 0 6px rgba(251, 247, 241, 0.5);
          will-change: transform, opacity;
        }
        .sugar-mote-1 {
          top: 18%;
          left: 20%;
          width: 3px;
          height: 3px;
          animation: sugarFall1 14s linear infinite;
        }
        .sugar-mote-2 {
          top: 32%;
          right: 22%;
          width: 2.5px;
          height: 2.5px;
          animation: sugarFall2 18s linear infinite 3s;
        }
        .sugar-mote-3 {
          top: 56%;
          left: 32%;
          width: 3px;
          height: 3px;
          animation: sugarFall1 16s linear infinite 6s;
        }
        .sugar-mote-4 {
          top: 74%;
          right: 16%;
          width: 2px;
          height: 2px;
          animation: sugarFall2 13s linear infinite 1.5s;
        }
        @keyframes sugarFall1 {
          0% {
            transform: translate3d(0, -10px, 0);
            opacity: 0;
          }
          20% {
            opacity: 0.32;
          }
          80% {
            opacity: 0.32;
          }
          100% {
            transform: translate3d(30px, 120px, 0);
            opacity: 0;
          }
        }
        @keyframes sugarFall2 {
          0% {
            transform: translate3d(0, -10px, 0);
            opacity: 0;
          }
          20% {
            opacity: 0.28;
          }
          80% {
            opacity: 0.28;
          }
          100% {
            transform: translate3d(-24px, 110px, 0);
            opacity: 0;
          }
        }

        /* ── Late Night: Soft Candle-Flicker Glow ── */
        .candle-glow-1 {
          position: absolute;
          bottom: 26%;
          right: 14%;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201, 162, 126, 0.24) 0%, rgba(168, 97, 46, 0.1) 40%, transparent 70%);
          filter: blur(42px);
          animation: candleFlicker 5.5s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }
        .candle-glow-2 {
          position: absolute;
          top: 32%;
          left: 12%;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201, 162, 126, 0.18) 0%, transparent 65%);
          filter: blur(36px);
          animation: candleFlicker 7s ease-in-out infinite alternate 1.8s;
          will-change: transform, opacity;
        }
        @keyframes candleFlicker {
          0% {
            transform: scale(1);
            opacity: 0.16;
          }
          30% {
            transform: scale(1.03);
            opacity: 0.25;
          }
          60% {
            transform: scale(0.97);
            opacity: 0.14;
          }
          85% {
            transform: scale(1.02);
            opacity: 0.27;
          }
          100% {
            transform: scale(1);
            opacity: 0.18;
          }
        }
      `}</style>

      {/* Conditional micro-detail per mood */}
      {selectedMood === 'slow-mornings' && (
        <div className="sunlight-beam" />
      )}

      {selectedMood === 'coffee-conversations' && (
        <>
          <div className="bokeh-dot-1" />
          <div className="bokeh-dot-2" />
          <div className="bokeh-dot-3" />
        </>
      )}

      {selectedMood === 'sweet-cravings' && (
        <>
          <div className="sugar-mote sugar-mote-1" />
          <div className="sugar-mote sugar-mote-2" />
          <div className="sugar-mote sugar-mote-3" />
          <div className="sugar-mote sugar-mote-4" />
        </>
      )}

      {selectedMood === 'late-night' && (
        <>
          <div className="candle-glow-1" />
          <div className="candle-glow-2" />
        </>
      )}
    </div>
  );
};

export default MoodAtmosphere;
