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
import { Gigs } from './components/Gigs';
import { CreativeWork } from './components/CreativeWork';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { CameraSliderDetail } from './components/camera-slider-detail/CameraSliderDetail';

type NavState = { scrollToId?: string } | null;

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as NavState;
    if (state?.scrollToId) {
      document
        .getElementById(state.scrollToId)
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Gigs />
      <CreativeWork />
      <Contact />
    </>
  );
}

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
  useEffect(() => {
    const block = (e: Event) => {
      if ((e.target as HTMLElement).closest('img, picture, video'))
        e.preventDefault();
    };
    document.addEventListener('contextmenu', block);
    document.addEventListener('dragstart', block);
    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('dragstart', block);
    };
  }, []);
  
  return (
    <Router>
      <div className="bg-bg min-h-screen">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects/camera-slider"
            element={<CameraSliderDetail />}
          />
        </Routes>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}
