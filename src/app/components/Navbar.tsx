import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  'About',
  'Skills',
  'Projects',
  'Experience',
  'Creative Work',
  'Contact',
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDetailPage = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (section: string) => {
    if (isDetailPage) {
      navigate('/#' + section.toLowerCase().replace(' ', '-'));
    } else {
      const id = section.toLowerCase().replace(' ', '-');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          backgroundColor: scrolled ? 'rgba(26,43,74,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(13,115,119,0.2)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          {/* Always PJOle */}
          <button
            onClick={() =>
              isDetailPage
                ? navigate('/')
                : window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 24,
              color: '#0D7377',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: 1,
            }}
          >
            PJOle
          </button>

          {/* Desktop nav */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 32 }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#C9D1D9',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0D7377')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#C9D1D9')}
              >
                {link}
              </button>
            ))}
            <a
              href="/portfolio/PHILIP_OLEMBO_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                border: '1.5px solid #0D7377',
                borderRadius: 8,
                color: '#0D7377',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  '#0D7377';
                (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  'transparent';
                (e.currentTarget as HTMLAnchorElement).style.color = '#0D7377';
              }}
            >
              <Download size={14} />
              View CV
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#C9D1D9',
              cursor: 'pointer',
            }}
            className="show-mobile"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 280,
          backgroundColor: '#1A2B4A',
          zIndex: 100,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 32px 32px',
          gap: 8,
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            color: '#C9D1D9',
            cursor: 'pointer',
          }}
        >
          <X size={24} />
        </button>
        {navLinks.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: '#C9D1D9',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              padding: '12px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {link}
          </button>
        ))}
        <a
          href="/portfolio/PHILIP_OLEMBO_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '12px 16px',
            border: '1.5px solid #0D7377',
            borderRadius: 8,
            color: '#0D7377',
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          <Download size={14} />
          View CV
        </a>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
        />
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </>
  );
}
