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
    title: 'Our Story - Royal Bean Café',
    description: "Discover Royal Bean Café's journey in Kota — from our founding aspiration to brew belonging, to the craft behind every cup, our sanctuary space, and the team that makes it all possible.",
  });

  return (
    <div className="bg-foam text-ink min-h-screen">
      <HeroSection />
      <EssenceStatement lines={aboutLuxury.essence.lines} />
      <OurStory
        eyebrow={aboutLuxury.story.eyebrow}
        heading={aboutLuxury.story.heading}
        paragraphs={aboutLuxury.story.paragraphs}
      />
      <CraftRitual
        eyebrow={aboutLuxury.craft.eyebrow}
        heading={aboutLuxury.craft.heading}
        cards={aboutLuxury.craft.cards}
      />
      <Sanctuary
        eyebrow={aboutLuxury.sanctuary.eyebrow}
        heading={aboutLuxury.sanctuary.heading}
        images={aboutLuxury.sanctuary.images}
      />
      <Connoisseurs
        eyebrow={aboutLuxury.connoisseurs.eyebrow}
        heading={aboutLuxury.connoisseurs.heading}
        members={aboutLuxury.connoisseurs.members}
      />
      <QuietMilestones
        eyebrow={aboutLuxury.milestones.eyebrow}
        heading={aboutLuxury.milestones.heading}
        items={aboutLuxury.milestones.items}
      />
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