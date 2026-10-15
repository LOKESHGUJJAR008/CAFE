import React from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  HeroSection,
  EssenceStatement,
  OurStory,
  CraftRitual,
  Sanctuary,
  Connoisseurs,
  QuietMilestones,
  FinalInvitation,
} from '../components/about/index';
import { aboutLuxury } from '../data/aboutLuxury';

const AboutPage = () => {
  useDocumentMeta({
    title: 'Our Story & Spatial Architecture | TATVA Café Kota',
    description: "Discover TATVA Café's journey in Talwandi, Kota — our founding aspiration to brew belonging, single-origin extraction craft, four distinct sanctuary zones, and the artisan guild.",
  });

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#14100E] overflow-x-hidden selection:bg-[#14100E] selection:text-[#FAF7F2]">
      {/* ── Section 1: Swiss Constructivist Monograph Masthead (Zero upper gap) ── */}
      <HeroSection />

      {/* ── Section 2: Architectural Mandate & Essence Statement ── */}
      <EssenceStatement lines={aboutLuxury.essence.lines} />

      {/* ── Section 3: The Origin Chronicle (Dual-Photo Archival Spread) ── */}
      <OurStory
        eyebrow={aboutLuxury.story.eyebrow}
        heading={aboutLuxury.story.heading}
        paragraphs={aboutLuxury.story.paragraphs}
      />

      {/* ── Section 4: Tri-Pillar Extraction Standard (3-Card Specimen Grid) ── */}
      <CraftRitual
        eyebrow={aboutLuxury.craft.eyebrow}
        heading={aboutLuxury.craft.heading}
        cards={aboutLuxury.craft.cards}
      />

      {/* ── Section 5: The Four Distinct Sanctuary Spaces (Interactive Spatial Blueprint) ── */}
      <Sanctuary
        eyebrow={aboutLuxury.sanctuary.eyebrow}
        heading={aboutLuxury.sanctuary.heading}
        images={aboutLuxury.sanctuary.images}
      />

      {/* ── Section 6: The Artisan Guild Dossier (Connoisseurs) ── */}
      <Connoisseurs
        eyebrow={aboutLuxury.connoisseurs.eyebrow}
        heading={aboutLuxury.connoisseurs.heading}
        members={aboutLuxury.connoisseurs.members}
      />

      {/* ── Section 7: Archival Chronology Ledger (Quiet Milestones) ── */}
      <QuietMilestones
        eyebrow={aboutLuxury.milestones.eyebrow}
        heading={aboutLuxury.milestones.heading}
        items={aboutLuxury.milestones.items}
      />

      {/* ── Section 8: Inverted Constructivist Poster Closing Invitation ── */}
      <FinalInvitation
        eyebrow={aboutLuxury.invitation.eyebrow}
        quote={aboutLuxury.invitation.quote}
        buttonText={aboutLuxury.invitation.buttonText}
        buttonLink={aboutLuxury.invitation.buttonLink}
        image={aboutLuxury.invitation.image}
      />
    </div>
  );
};

export default AboutPage;