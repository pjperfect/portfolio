const experience = [
  {
    role: 'ECI Project — Frontend Developer',
    org: 'vision360 · Moringa Capstone Project (Team of 6)',
    date: 'May 2026',
    desc: 'Full-stack creative space booking platform. React, Three.js, Node.js, PostgreSQL, AWS S3, M-Pesa Daraja, PayPal. Live deployed on Vercel and Render.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS S3'],
  },
  {
    role: 'Media & Streaming Coordinator',
    org: 'Freelance / Church & Events',
    date: 'Jan 2019 – Present',
    desc: 'Live streaming productions (vMix, OBS), multi-platform distribution across Facebook, YouTube, TikTok, and Instagram, sound engineering, graphic design and branding.',
    tags: ['vMix', 'OBS', 'RTMP', 'Photoshop'],
  },
  {
    role: 'Intern',
    org: 'Bar-er Energy Ltd.',
    date: 'Jan 2023 (40 days) · Famagusta, TRNC',
    desc: 'Solar panel installation design using AutoCAD, wiring troubleshooting, renewable energy systems.',
    tags: ['AutoCAD', 'Solar PV', 'Electrical Design'],
  },
];

const education = [
  {
    role: 'Software Engineering Bootcamp',
    org: 'Moringa School (Flatiron Curriculum)',
    date: 'Nov 2025 – May 2026',
    desc: '6-month full-stack programme across 5 learning modules and a final project. JavaScript, React, Python, Flask, SQL, REST APIs, deployment.',
    tags: ['JavaScript', 'React', 'Python', 'Flask', 'PostgreSQL'],
  },
  {
    role: 'B.Sc. Electrical & Electronics Engineering (Honours)',
    org: 'Eastern Mediterranean University',
    date: '2018 – 2022',
    desc: 'CGPA 3.14 / 4.00. Circuit design, microcontroller programming, renewable energy systems, AutoCAD, MATLAB, Multisim. Final Year Project: Motorized Camera Slider — 2nd Place.',
    tags: ['CGPA 3.14', 'Arduino', 'MATLAB', 'AutoCAD'],
  },
  {
    role: 'A-Levels, AS-Levels & IGCSE',
    org: 'Brookhouse International School',
    date: '2013 – 2017',
    desc: 'Specialised in Physics, Mathematics, Geography, and Computer Science.',
    tags: ['Physics', 'Mathematics', 'Computer Science'],
  },
];

function TimelineCard({
  role,
  org,
  date,
  desc,
  tags,
}: {
  role: string;
  org: string;
  date: string;
  desc: string;
  tags: string[];
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        marginBottom: 32,
        position: 'relative',
      }}
    >
      {/* Dot + line */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#0D7377',
            border: '2px solid #1A2B4A',
            flexShrink: 0,
            marginTop: 6,
            zIndex: 1,
          }}
        />
        <div
          style={{
            flex: 1,
            width: 2,
            backgroundColor: 'rgba(13,115,119,0.25)',
            marginTop: 4,
          }}
        />
      </div>
      {/* Card */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#0D1117',
          borderRadius: 8,
          padding: '20px 20px 16px',
          borderTop: '3px solid #0D7377',
          marginBottom: 4,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform =
            'translateY(-3px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            '0 8px 28px rgba(13,115,119,0.2)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        <h3
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            color: '#FFFFFF',
            fontSize: 15,
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {role}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#0D7377',
            fontSize: 12,
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          {org} · {date}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#C9D1D9',
            fontSize: 13,
            lineHeight: 1.7,
            marginBottom: 12,
            opacity: 0.85,
          }}
        >
          {desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 9px',
                borderRadius: 100,
                border: '1px solid rgba(13,115,119,0.4)',
                color: '#0D7377',
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      style={{ backgroundColor: '#1A2B4A', padding: '96px 24px' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            color: '#FFFFFF',
            fontSize: 36,
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          Experience & Education
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#C9D1D9',
            textAlign: 'center',
            marginBottom: 64,
            opacity: 0.7,
            fontSize: 15,
          }}
        >
          Where I've worked, studied, and built things
        </p>

        <div style={{ display: 'grid', gap: 48 }} className="exp-grid">
          {/* Left — Experience */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: 'rgba(13,115,119,0.15)',
                  border: '1px solid rgba(13,115,119,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D7377"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  color: '#FFFFFF',
                  fontSize: 20,
                }}
              >
                Experience
              </h3>
            </div>
            {experience.map((e, i) => (
              <TimelineCard key={i} {...e} />
            ))}
          </div>

          {/* Right — Education */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: 'rgba(13,115,119,0.15)',
                  border: '1px solid rgba(13,115,119,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D7377"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  color: '#FFFFFF',
                  fontSize: 20,
                }}
              >
                Education
              </h3>
            </div>
            {education.map((e, i) => (
              <TimelineCard key={i} {...e} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .exp-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 1023px) { .exp-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
