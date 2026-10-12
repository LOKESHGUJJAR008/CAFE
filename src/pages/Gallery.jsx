import React, { useState } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import GalleryHero from '../components/gallery/GalleryHero';
import MoodSelector from '../components/gallery/MoodSelector';
import EditorialGallery from '../components/gallery/EditorialGallery';
import GalleryClosingCTA from '../components/gallery/GalleryClosingCTA';

const GalleryPage = () => {
  useDocumentMeta({
    title: 'Find Your Coffee Mood | TATVA Café',
    description: 'Every mood has its coffee. Explore handcrafted moments, artisanal roasts, and café rituals at TATVA Café.',
  });

  // Lifted mood selection state shared between selector and editorial gallery
  const [selectedMood, setSelectedMood] = useState('slow-mornings');

  return (
    <div className="bg-[#FBF7F1] text-[#1F1612] min-h-screen">
      {/* Section 1: Cinematic Hero */}
      <GalleryHero />

      {/* Section 2: Interactive Mood Selector */}
      <MoodSelector
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood}
      />

      {/* Section 3: Editorial 3D Gallery with Mood Transitions & Lightbox */}
      <EditorialGallery selectedMood={selectedMood} />

      {/* Section 4: Closing CTA */}
      <GalleryClosingCTA />
    </div>
  );
};

export default GalleryPage;
