import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { CreativeWork } from './components/CreativeWork';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CameraSliderDetail } from './components/camera-slider-detail/CameraSliderDetail';

type NavState = { scrollToId?: string } | null;

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as NavState;
    if (state?.scrollToId) {
      document.getElementById(state.scrollToId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <CreativeWork />
      <Contact />
    </>
  );
}

// Resets scroll position on every route change, unless the navigation asked
// for a specific section (state.scrollToId) — in which case HomePage's own
// effect above handles scrolling there instead. Without this, React Router
// leaves the scroll position untouched across client-side navigations, which
// made links like the navbar logo or "Back to Projects" look like they did
// nothing when they'd actually navigated while leaving you mid-scroll.
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as NavState;
    if (!state?.scrollToId) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <div className="bg-bg min-h-screen">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/camera-slider" element={<CameraSliderDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
