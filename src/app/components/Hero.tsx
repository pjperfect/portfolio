import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const profilePhoto =
  'https://philip-portfolio-assets.s3.eu-north-1.amazonaws.com/Alasya.jpg';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    let animId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(13,115,119,0.5)';
        ctx.fill();
      });
      particles.forEach((p, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(13,115,119,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0D1117',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '100px 24px 60px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 64,
        }}
        className="hero-inner"
      >
        {/* Text */}
        <div style={{ flex: 1 }} className="hero-text">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: '#0D7377',
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Welcome to my portfolio
          </p>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
              marginBottom: 12,
            }}
            className="hero-name"
          >
            Philip Olembo
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#0D7377',
              fontSize: 16,
              marginBottom: 8,
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            Software Engineer · Full-Stack Developer · Electrical & Electronics
            Engineer · <br />
            Graphics Designer · Live Streamer
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#0D7377',
              fontSize: 14,
              marginBottom: 16,
              fontWeight: 400,
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            Nairobi, Kenya
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#C9D1D9',
              fontSize: 16,
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 520,
            }}
          >
            I build web applications that solve real problems — and I make them
            look great. From full-stack platforms to live broadcast productions
            and branded graphic design, I bring engineering precision and
            creative vision together.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              marginBottom: 32,
            }}
            className="hero-buttons"
          >
            <button
              onClick={scrollToProjects}
              style={{
                padding: '12px 28px',
                backgroundColor: '#0D7377',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#0a5f63')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#0D7377')
              }
            >
              View My Work
            </button>
            <a
              href="https://philip-portfolio-assets.s3.eu-north-1.amazonaws.com/PHILIP_OLEMBO_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                border: '1.5px solid #0D7377',
                borderRadius: 8,
                color: '#0D7377',
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  'rgba(13,115,119,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  'transparent';
              }}
            >
              <Download size={16} />
              View CV
            </a>
          </div>
          <div
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            className="hero-socials"
          >
            {[
              {
                icon: <Github size={18} />,
                href: 'https://github.com/pjperfect',
                label: 'GitHub',
              },
              {
                icon: <Linkedin size={18} />,
                href: 'https://linkedin.com/in/pjperfect',
                label: 'LinkedIn',
              },
              {
                icon: <Mail size={18} />,
                href: 'mailto:pjole.kenya@gmail.com',
                label: 'Email',
              },
              {
                icon: <WhatsAppIcon size={18} />,
                href: 'https://wa.me/254715556379',
                label: 'WhatsApp',
              },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                title={label}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(13,115,119,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C9D1D9',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    '#0D7377';
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    '#0D7377';
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    'rgba(13,115,119,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    'rgba(13,115,119,0.4)';
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    '#C9D1D9';
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    'transparent';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Profile photo */}
        <div style={{ flexShrink: 0 }} className="hero-photo-wrap">
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: '50%',
              border: '3px solid #0D7377',
              padding: 4,
              boxShadow: '0 0 40px rgba(13,115,119,0.3)',
            }}
            className="hero-photo-size"
          >
            <img
              src={profilePhoto}
              alt="Philip Olembo"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          document
            .getElementById('about')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          color: '#0D7377',
          cursor: 'pointer',
          animation: 'bounce 2s infinite',
        }}
      >
        <ChevronDown size={28} />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        .hero-name { font-size: 72px; }
        .hero-inner { flex-direction: row; }
        .hero-photo-wrap { order: 2; }
        .hero-text { order: 1; }
        @media (max-width: 767px) {
          .hero-socials { justify-content: center; }
          .hero-buttons { justify-content: center; }
          .hero-name { font-size: 40px !important; }
          .hero-inner { flex-direction: column !important; align-items: center !important; text-align: center; gap: 32px !important; }
          .hero-photo-wrap { order: 1 !important; }
          .hero-text { order: 2 !important; }
          .hero-photo-size { width: 200px !important; height: 200px !important; }
        }
      `}</style>
    </section>
  );
}
