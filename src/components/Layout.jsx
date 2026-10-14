import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import OfferBar from '../components/OfferBar';

/**
 * Layout
 * Shell wrapping every route: OfferBar → Navbar → page content (Outlet) → Footer.
 * The navbar's top offset adjusts when the offer bar is visible.
 */
const Layout = () => {
  const [barVisible, setBarVisible] = useState(false);

  const handleBarVisibility = useCallback((visible) => {
    setBarVisible(visible);
  }, []);

  return (
    <div className="min-h-screen bg-foam text-ink font-inter antialiased
                    selection:bg-caramel selection:text-foam flex flex-col relative">
      <OfferBar onVisibilityChange={handleBarVisibility} />
      <Navbar barVisible={barVisible} />

      <main className="flex-1" style={{ paddingTop: barVisible ? '6.5rem' : '4.5rem' }}>
        <Outlet />
      </main>

      <Footer />

      {/* Floating WhatsApp Action Button — visible on every page */}
      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;
