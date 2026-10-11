import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PoolGallery from '../components/gallery/PoolGallery';

const GalleryPage = () => {
  return (
    <div className="bg-[#140D0A] text-[#FBF7F1] min-h-screen">
      {/* Page Heading Banner (Dark room ambience #140D0A) */}
      <section className="bg-[#140D0A] text-[#FBF7F1] pt-28 sm:pt-32 pb-14 sm:pb-16 px-6 sm:px-10 text-center relative overflow-hidden">
        {/* Soft overhead ambient warm flare */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(168,97,46,0.22)_0%,transparent_75%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0.001, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A27E] bg-[#C9A27E]/10 border border-[#C9A27E]/25 px-4 py-1.5 rounded-full mb-6">
            Interactive Gallery
          </span>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-[#FBF7F1] leading-tight mb-4">
            The Tatva Table
          </h1>
          <p className="text-[#EADBC8]/80 text-base sm:text-lg max-w-xl mx-auto font-light">
            Take a seat by the espresso cloth — eight handcrafted moments racked and ready to explore.
          </p>
        </motion.div>
      </section>

      {/* Pool Table Arena Section (Deep dark room with hanging lamp atmosphere) */}
      <section className="pb-16 sm:pb-20 md:pb-24 px-4 sm:px-8 lg:px-12 bg-[#140D0A] relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <PoolGallery />
        </div>
      </section>

      {/* Visit Invitation CTA */}
      <section className="bg-[#EADBC8] py-16 md:py-20 px-6 sm:px-10 text-center text-[#1F1612]">
        <div className="max-w-md mx-auto">
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#1F1612] mb-4">
            Experience It in Person
          </h2>
          <p className="text-[#1F1612]/75 mb-8">
            Step into Tatva Cafe in Talwandi, Kota and let us brew your perfect cup.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#A8612E] hover:bg-[#A8612E]/90
                       text-[#FBF7F1] font-semibold tracking-wide shadow-md transition-all transform hover:-translate-y-0.5"
          >
            Find Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
