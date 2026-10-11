import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

const Home = React.lazy(() => import('./pages/Home'));
const AboutPage = React.lazy(() => import('./pages/About'));
const MenuPage = React.lazy(() => import('./pages/Menu'));
const DishDetail = React.lazy(() => import('./pages/DishDetail'));
const GalleryPage = React.lazy(() => import('./pages/Gallery'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const ReservePage = React.lazy(() => import('./pages/Reserve'));

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route index element={
              <Suspense fallback={<div className="h-screen bg-foam flex items-center justify-center text-caramel">Loading...</div>}>
                <Home />
              </Suspense>
            } />
            <Route path="about" element={
              <Suspense fallback={<div className="h-screen bg-foam flex items-center justify-center text-caramel">Loading...</div>}>
                <AboutPage />
              </Suspense>
            } />
            <Route path="menu" element={
              <Suspense fallback={<div className="h-screen bg-foam flex items-center justify-center text-caramel">Loading...</div>}>
                <MenuPage />
              </Suspense>
            } />
            <Route path="menu/:slug" element={
              <Suspense fallback={<div className="h-screen bg-foam flex items-center justify-center text-caramel">Loading...</div>}>
                <DishDetail />
              </Suspense>
            } />
            <Route path="gallery" element={
              <Suspense fallback={<div className="h-screen bg-foam flex items-center justify-center text-caramel">Loading...</div>}>
                <GalleryPage />
              </Suspense>
            } />
            <Route path="contact" element={
              <Suspense fallback={<div className="h-screen bg-foam flex items-center justify-center text-caramel">Loading...</div>}>
                <ContactPage />
              </Suspense>
            } />
            <Route path="reserve" element={
              <Suspense fallback={<div className="h-screen bg-foam flex items-center justify-center text-caramel">Loading...</div>}>
                <ReservePage />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<div className="h-screen bg-foam flex items-center justify-center text-caramel">Loading...</div>}>
                <NotFound />
              </Suspense>
            } />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
