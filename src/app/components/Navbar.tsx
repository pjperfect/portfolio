import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { assets } from '@/config/assets';

function useScrollState() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
      setScrolled(scrollTop > 20);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { progress, scrolled };
}

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Creative Work', 'Contact'];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailPage = location.pathname !== '/';
  const { progress, scrolled } = useScrollState();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = (section: string) => {
    const id = section.toLowerCase().replace(' ', '-');
    if (isDetailPage) {
      navigate('/', { state: { scrollToId: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-surface/95 backdrop-blur-md' : 'bg-surface/10 backdrop-blur-[2px]'
        }`}
      >
        {/* Glass edge — a soft gradient divider that always separates the nav from the
            content behind it, and brightens once you've scrolled past the hero. */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-40'
          }`}
        />
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-accent-light transition-[width] duration-100 ease-linear rounded-r"
          style={{ width: `${progress}%` }}
        />

        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-16">
          <button
            onClick={() =>
              isDetailPage ? navigate('/') : window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            className="font-display font-extrabold text-2xl text-accent bg-transparent border-none cursor-pointer tracking-wide"
          >
            PJOle
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="font-body text-sm text-text bg-transparent border-none cursor-pointer transition-colors duration-200 hover:text-accent"
              >
                {link}
              </button>
            ))}
            <a
              href={assets.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 border-[1.5px] border-accent rounded-lg text-accent font-body text-sm no-underline transition-all duration-200 hover:bg-accent hover:text-white"
            >
              <Download size={14} />
              View CV
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden bg-transparent border-none text-text cursor-pointer"
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`absolute top-0 left-0 transition-all duration-200 ${
                  menuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                }`}
              />
              <X
                size={24}
                className={`absolute top-0 left-0 transition-all duration-200 ${
                  menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-3/5 overflow-y-auto overscroll-contain bg-surface z-[100] flex flex-col gap-2 px-8 pt-20 pb-8 transition-transform duration-300 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="absolute top-5 right-5 bg-transparent border-none text-text cursor-pointer"
        >
          <X size={24} />
        </button>
        {navLinks.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="font-body text-base text-text bg-transparent border-none cursor-pointer text-left py-3 border-b border-white/5"
          >
            {link}
          </button>
        ))}
        <a
          href={assets.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-1.5 px-4 py-3 border-[1.5px] border-accent rounded-lg text-accent font-body text-sm no-underline"
        >
          <Download size={14} />
          View CV
        </a>
      </div>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-[99]"
          aria-hidden="true"
        />
      )}
    </>
  );
}
