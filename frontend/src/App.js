import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import '@/App.css';
import Navbar from '@/components/Navbar';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import Home from '@/pages/Home';
import OurWork from '@/pages/OurWork';
import OurTeam from '@/pages/OurTeam';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a
        href="#main-content"
        className="skip-link"
        data-testid="skip-to-content"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/our-team" element={<OurTeam />} />
        </Routes>
      </main>
      <AccessibilityWidget />
    </BrowserRouter>
  );
}

export default App;
