import React, { useState } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import GalleryCursor from '../components/gallery/GalleryCursor';
import GalleryHero from '../components/gallery/GalleryHero';
import PrimeFilterBar from '../components/gallery/PrimeFilterBar';
import EditorialGallery from '../components/gallery/EditorialGallery';
import PrimeDossier from '../components/gallery/PrimeDossier';
import PrimeContactSheet from '../components/gallery/PrimeContactSheet';
import GalleryClosingCTA from '../components/gallery/GalleryClosingCTA';

const GalleryPage = () => {
  useDocumentMeta({
    title: 'Visual Documentary & Archive | TATVA Café Kota',
    description: 'High-contrast photographic record of single-origin coffee rituals, brutalist concrete spaces, and archival moments at TATVA Café.',
  });

  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#14100E] overflow-x-hidden selection:bg-[#14100E] selection:text-[#FAF7F2]">
      {/* Desktop Precision Cursor */}
      <GalleryCursor />

      {/* ── Section 1: Swiss Constructivist Publication Masthead ── */}
      <GalleryHero />

      {/* ── Section 2: Swiss Editorial Classification & Filter Bar ── */}
      <PrimeFilterBar
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* ── Section 3: The Centerpiece 15-Block CNBC Prime Constructivist Grid ── */}
      <EditorialGallery activeFilter={activeFilter} />

      {/* ── Section 4: Constructivist Curator Dossier & Split Typography ── */}
      <PrimeDossier />

      {/* ── Section 5: 35mm Darkroom Film Contact Sheet ── */}
      <PrimeContactSheet />

      {/* ── Section 6: Swiss Inverted Poster Closing CTA ── */}
      <GalleryClosingCTA />
    </div>
  );
};

export default GalleryPage;
