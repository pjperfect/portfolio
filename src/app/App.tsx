import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { CreativeWork } from "./components/CreativeWork";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CameraSliderDetail } from "./components/CameraSliderDetail";

function HomePage() {
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

export default function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#0D1117", minHeight: "100vh" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/camera-slider" element={<CameraSliderDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
