import React, { useState } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import GalleryHero from '../components/gallery/GalleryHero';
import MoodSelector from '../components/gallery/MoodSelector';
import EditorialGallery from '../components/gallery/EditorialGallery';
import MoodRecommendations from '../components/gallery/MoodRecommendations';
import SharedMoments from '../components/gallery/SharedMoments';
import GalleryClosingCTA from '../components/gallery/GalleryClosingCTA';
import MoodAtmosphere from '../components/gallery/MoodAtmosphere';
import GalleryMarquee from '../components/gallery/GalleryMarquee';
import GalleryCursor from '../components/gallery/GalleryCursor';
import PhotoboothStrip from '../components/gallery/PhotoboothStrip';

/**
 * Palette Tokens (strictly enforced):
 * - foam #FBF7F1
 * - ink #1F1612
 * - latte #C9A27E
 * - caramel #A8612E
 * - almond #EADBC8
 */
const MOOD_THEME_VARIABLES = {
  'slow-mornings': {
    '--gallery-bg': '#FBF7F1',
    '--gallery-text': '#1F1612',
    '--gallery-subtext': 'rgba(31, 22, 18, 0.72)',
    '--gallery-accent': '#A8612E',
    '--gallery-secondary': '#C9A27E',
    '--gallery-panel': '#EADBC8',
    '--gallery-border': 'rgba(201, 162, 126, 0.35)',
    '--gallery-glow': 'rgba(234, 219, 200, 0.65)',
  },
  'coffee-conversations': {
    '--gallery-bg': '#EADBC8',
    '--gallery-text': '#1F1612',
    '--gallery-subtext': 'rgba(31, 22, 18, 0.75)',
    '--gallery-accent': '#A8612E',
    '--gallery-secondary': '#C9A27E',
    '--gallery-panel': '#FBF7F1',
    '--gallery-border': 'rgba(168, 97, 46, 0.28)',
    '--gallery-glow': 'rgba(168, 97, 46, 0.16)',
  },
  'sweet-cravings': {
    '--gallery-bg': '#FBF7F1',
    '--gallery-text': '#1F1612',
    '--gallery-subtext': 'rgba(31, 22, 18, 0.72)',
    '--gallery-accent': '#A8612E',
    '--gallery-secondary': '#C9A27E',
    '--gallery-panel': '#EADBC8',
    '--gallery-border': 'rgba(201, 162, 126, 0.35)',
    '--gallery-glow': 'rgba(234, 219, 200, 0.55)',
  },
  'late-night': {
    '--gallery-bg': '#1F1612',
    '--gallery-text': '#FBF7F1',
    '--gallery-subtext': 'rgba(251, 247, 241, 0.75)',
    '--gallery-accent': '#C9A27E',
    '--gallery-secondary': '#A8612E',
    '--gallery-panel': 'rgba(201, 162, 126, 0.12)',
    '--gallery-border': 'rgba(201, 162, 126, 0.25)',
    '--gallery-glow': 'rgba(201, 162, 126, 0.22)',
  },
};

const GalleryPage = () => {
  useDocumentMeta({
    title: 'Find Your Coffee Mood | TATVA Café',
    description: 'Every mood has its coffee. Explore handcrafted moments, artisanal roasts, and café rituals at TATVA Café.',
  });

  // Lifted mood selection state shared across the whole page
  const [selectedMood, setSelectedMood] = useState('slow-mornings');
  const activeVariables = MOOD_THEME_VARIABLES[selectedMood] || MOOD_THEME_VARIABLES['slow-mornings'];

  return (
    <div
      style={{
        ...activeVariables,
        backgroundColor: 'var(--gallery-bg)',
        color: 'var(--gallery-text)',
        transition: 'background-color 0.7s cubic-bezier(0.22, 1, 0.36, 1), color 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className="relative min-h-screen overflow-x-hidden selection:bg-[#A8612E] selection:text-[#FBF7F1]"
    >
      {/* Desktop custom cursor */}
      <GalleryCursor />

      {/* Lightweight CSS-only ambient atmosphere layer */}
      <MoodAtmosphere selectedMood={selectedMood} />

      {/* Section 1: Cinematic Hero */}
      <GalleryHero selectedMood={selectedMood} />

      {/* Section 2: Interactive Mood Selector with animated underline on label */}
      <MoodSelector
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood}
      />

      {/* Inter-section Outlined Text Marquee */}
      <GalleryMarquee />

      {/* Section 3: Editorial 3D Gallery with Mood Transitions & Lightbox */}
      <EditorialGallery selectedMood={selectedMood} />

      {/* Section 4: "Perfect for this mood" recommendation strip */}
      <MoodRecommendations selectedMood={selectedMood} />

      {/* Section 5: "Moments shared with us" */}
      <SharedMoments selectedMood={selectedMood} />

      {/* Section 6: Photobooth Memory Strip */}
      <PhotoboothStrip />

      {/* Section 7: Closing CTA */}
      <GalleryClosingCTA selectedMood={selectedMood} />
    </div>
  );
};

export default GalleryPage;
