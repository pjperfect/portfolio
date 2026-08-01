import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '@/config/assets';

export function HeroBlock() {
  return (
    <section className="relative bg-surface px-6 py-20">
      <div className="max-w-[1280px] mx-auto">
        <Link
          to="/"
          state={{ scrollToId: 'projects' }}
          className="inline-flex items-center gap-2 text-accent font-body text-sm mb-6 no-underline transition-colors duration-200 hover:text-accent-light"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <h1 className="font-display font-extrabold text-white text-[48px] mb-3">
          Motorized Camera Slider
        </h1>
        <p className="font-body text-text text-lg mb-5 opacity-80">
          Undergraduate Final Year Project — Eastern Mediterranean University, January 2022
        </p>

        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <span className="px-3.5 py-1.5 bg-gradient-to-br from-gold to-gold-dark rounded-full text-surface font-body text-[13px] font-bold shadow-[0_2px_8px_rgba(255,184,0,0.3)]">
            🏆 2nd Place — EMU Final Year Project Competition
          </span>
          <div className="flex gap-3 font-body text-[13px] text-text">
            <span>Team of 3</span>
            <span>·</span>
            <span>Hardware + Software</span>
            <span>·</span>
            <span>Arduino / C++</span>
          </div>
        </div>

        <div className="w-full h-[500px] rounded-xl overflow-hidden relative">
          <img
            src={assets.cameraSlider.fig6}
            alt="Motorized Camera Slider in Operation"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.6) 0%, transparent 60%)' }}
          />
        </div>
      </div>
    </section>
  );
}
