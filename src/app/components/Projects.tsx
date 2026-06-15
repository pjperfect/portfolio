import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'vision360 — Creative Space Booking Platform',
    description:
      'A full-stack platform merging immersive 360° space discovery with end-to-end booking, payment, and asset delivery for creative shoots and events.',
    stack: [
      'React',
      'Three.js',
      'Node.js',
      'PostgreSQL',
      'AWS S3',
      'M-Pesa',
      'PayPal',
    ],
    github:
      'https://github.com/mongaremetrine5-stack/VISION360-CLIENT-FRONTEND',
    live: 'https://vision-360-client-frontend.vercel.app/',
    featured: true,
    detailPage: null,
  },
  {
    title: 'Motorized Camera Slider — Undergraduate Final Year Project',
    description:
      "An Arduino-based motorized camera slider built to solve the problem of manual camera tracking for online education during the pandemic. Awarded 2nd Place at Eastern Mediterranean University's Final Year Project Competition, January 2022.",
    stack: ['Arduino', 'C++', 'Stepper Motor', 'PCB Design'],
    github: null,
    live: null,
    featured: false,
    award: '2nd Place — EMU 2022',
    detailPage: '/projects/camera-slider',
  },
  {
    title: 'MeterLink — Prepaid Electricity Tracker (Web)',
    description:
      'A React web app that helps KPLC prepaid electricity customers track token usage and purchase history parsed from SMS messages.',
    stack: ['React'],
    github: 'https://github.com/pjperfect/meterlink',
    live: 'https://meterlink.vercel.app/',
    featured: false,
    detailPage: null,
  },
  {
    title: 'MeterLink CLI — Prepaid Electricity Tracker (Python)',
    description:
      'A Python command-line tool for tracking prepaid electricity token purchases per meter, with local JSON storage and hashed password authentication.',
    stack: ['Python'],
    github: 'https://github.com/pjperfect/meterlink-cli',
    live: null,
    featured: false,
    detailPage: null,
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      style={{ backgroundColor: '#1A2B4A', padding: '96px 24px' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            color: '#FFFFFF',
            fontSize: 36,
            marginBottom: 8,
          }}
        >
          Projects
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#C9D1D9',
            marginBottom: 56,
            opacity: 0.7,
          }}
        >
          A selection of software, hardware, and creative-tech work
        </p>
        <div style={{ display: 'grid', gap: 24 }} className="projects-grid">
          {projects.map((p) => {
            const CardWrapper = p.detailPage
              ? ({ children }: { children: React.ReactNode }) => (
                  <Link
                    to={p.detailPage!}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    {children}
                  </Link>
                )
              : ({ children }: { children: React.ReactNode }) => (
                  <>{children}</>
                );

            return (
              <CardWrapper key={p.title}>
                <div
                  style={{
                    backgroundColor: '#0D1117',
                    borderRadius: 8,
                    padding: 28,
                    borderLeft: '3px solid #0D7377',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: p.detailPage ? 'pointer' : 'default',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform =
                      'translateY(-4px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      '0 8px 32px rgba(13,115,119,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform =
                      'translateY(0)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      'none';
                  }}
                >
                  {p.featured && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        padding: '4px 10px',
                        backgroundColor: '#0D7377',
                        borderRadius: 100,
                        color: '#fff',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Featured
                    </span>
                  )}
                  {p.award && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        padding: '4px 10px',
                        background: 'linear-gradient(135deg, #FFB800, #FFA726)',
                        borderRadius: 100,
                        color: '#1A2B4A',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(255,184,0,0.3)',
                      }}
                    >
                      {p.award}
                    </span>
                  )}
                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      color: '#FFFFFF',
                      fontSize: 18,
                      marginBottom: 12,
                      paddingRight: p.featured || p.award ? 150 : 0,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#C9D1D9',
                      fontSize: 14,
                      lineHeight: 1.7,
                      marginBottom: 20,
                      flex: 1,
                    }}
                  >
                    {p.description}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginBottom: 20,
                    }}
                  >
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 100,
                          border: '1px solid rgba(13,115,119,0.5)',
                          color: '#0D7377',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {!p.detailPage && (
                    <div style={{ display: 'flex', gap: 12 }}>
                      {p.github ? (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="GitHub"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            color: '#C9D1D9',
                            fontSize: 13,
                            fontFamily: "'Inter', sans-serif",
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) =>
                            ((
                              e.currentTarget as HTMLAnchorElement
                            ).style.color = '#0D7377')
                          }
                          onMouseLeave={(e) =>
                            ((
                              e.currentTarget as HTMLAnchorElement
                            ).style.color = '#C9D1D9')
                          }
                        >
                          <Github size={16} /> Code
                        </a>
                      ) : null}
                      {p.live ? (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Live Demo"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            color: '#C9D1D9',
                            fontSize: 13,
                            fontFamily: "'Inter', sans-serif",
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) =>
                            ((
                              e.currentTarget as HTMLAnchorElement
                            ).style.color = '#0D7377')
                          }
                          onMouseLeave={(e) =>
                            ((
                              e.currentTarget as HTMLAnchorElement
                            ).style.color = '#C9D1D9')
                          }
                        >
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      ) : null}
                    </div>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
      <style>{`
        .projects-grid { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 767px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
