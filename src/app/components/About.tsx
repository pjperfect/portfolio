const techCategories = [
  { label: "Frontend", icon: "⚛️", skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Three.js"] },
  { label: "Backend", icon: "🖥️", skills: ["Node.js", "Express", "Python", "Flask", "REST APIs", "JWT"] },
  { label: "Database", icon: "🗄️", skills: ["PostgreSQL", "SQLite", "SQLAlchemy", "Prisma ORM"] },
  { label: "Tools", icon: "🔧", skills: ["Git", "GitHub", "VS Code", "Vercel", "Render", "npm"] },
];

export function About() {
  return (
    <section id="about" style={{ backgroundColor: "#1A2B4A", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 64, alignItems: "flex-start" }} className="about-inner">
        {/* Left */}
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#0D7377", marginBottom: 16, fontWeight: 600 }}>
            About Me
          </p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#FFFFFF", fontSize: 36, marginBottom: 24, lineHeight: 1.2 }}>
            Engineer by training,<br />creator by heart.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "I'm a software engineering graduate of Moringa School's intensive 6-month bootcamp, with a strong foundation across the full JavaScript and Python stack.",
              "My background in Electrical & Electronics Engineering (Eastern Mediterranean University, CGPA 3.14) gives me a systems-thinking approach to software problems.",
              "Beyond code, I bring 6+ years of experience in live event streaming, AV production, and graphic design — which means I think about user experience as both an engineer and a creative.",
              "Based in Nairobi, Kenya, and open to remote opportunities.",
            ].map((text, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif", color: "#C9D1D9", fontSize: 15, lineHeight: 1.8 }}>
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ flex: 1, display: "grid", gap: 16 }} className="about-grid">
          {techCategories.map((cat) => (
            <div
              key={cat.label}
              style={{ backgroundColor: "#0D1117", borderRadius: 8, padding: 20, borderLeft: "3px solid #0D7377", transition: "box-shadow 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(13,115,119,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#0D7377", fontSize: 14, marginBottom: 12 }}>
                {cat.icon} {cat.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    style={{ padding: "4px 10px", borderRadius: 100, backgroundColor: "rgba(13,115,119,0.1)", border: "1px solid rgba(13,115,119,0.25)", color: "#C9D1D9", fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: "default", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.backgroundColor = "#0D7377"; (e.currentTarget as HTMLSpanElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.backgroundColor = "rgba(13,115,119,0.1)"; (e.currentTarget as HTMLSpanElement).style.color = "#C9D1D9"; }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-inner { flex-direction: row; }
        .about-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 767px) {
          .about-inner { flex-direction: column !important; gap: 40px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
