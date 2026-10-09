import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Featured from './components/Featured';
import About from './components/About';
import Menu from './components/Menu';
import Atmosphere from './components/Atmosphere';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-inter antialiased selection:bg-caramel selection:text-cream flex flex-col relative">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero (Dark Espresso) */}
        <Hero />

        {/* 3. Featured Coffee (Cream) */}
        <Featured />

        {/* 4. About (Dark Espresso - with 4 stats & merged 4 why items) */}
        <About />

        {/* 5. Menu (Cream - after About) */}
        <Menu />

        {/* 6. Café Atmosphere (Dark Espresso) */}
        <Atmosphere />

        {/* 7. Gallery (Cream - before Reviews) */}
        <Gallery />

        {/* 8. Reviews (Dark Espresso) */}
        <Reviews />

        {/* 9. Final CTA (Cream / Card) */}
        <CTA />
      </main>

      {/* 10. Footer (Dark Espresso) */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
