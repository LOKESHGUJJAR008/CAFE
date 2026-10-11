import React from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import Hero from '../components/Hero';
import WhyStrip from '../components/WhyStrip';
import Story from '../components/About';
import SignatureDrinks from '../components/home/SignatureDrinks';
import MenuTeaser from '../components/home/MenuTeaser';
import StudyHub from '../components/home/StudyHub';
import Atmosphere from '../components/home/Atmosphere';
import GalleryTeaser from '../components/home/GalleryTeaser';
import Reviews from '../components/home/Reviews';
import Newsletter from '../components/home/Newsletter';
import FinalCTA from '../components/home/FinalCTA';

const Home = () => {
  useDocumentMeta({
    title: 'Royal Bean Café | Artisan Coffee & Cozy Retreat in Talwandi, Kota',
    description: 'Where Every Sip Feels Like Home. Royal Bean Café in Talwandi, Kota offers single-origin artisan brews, silky lattes, handcrafted cold coffees, fresh desserts, and a cozy study haven.'
  });

  return (
    <>
      <Hero />
      <WhyStrip />
    <Story />
    <SignatureDrinks />
    <MenuTeaser />
    <StudyHub />
    <Atmosphere />
    <GalleryTeaser />
    <Reviews />
    <Newsletter />
    <FinalCTA />
  </>
  );
};

export default Home;

