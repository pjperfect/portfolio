const skillCategories = [
  { title: "Frontend", skills: ["JavaScript (ES6+)", "React", "HTML5", "CSS3", "React Router", "Tailwind CSS", "Vite", "Three.js", "Framer Motion", "Recharts"], extra: false },
  { title: "Backend", skills: ["Python", "Flask", "Node.js", "Express", "REST APIs", "JWT Authentication", "OAuth 2.0", "Marshmallow", "Nodemailer"], extra: false },
  { title: "Databases & ORMs", skills: ["PostgreSQL", "SQLite", "SQLAlchemy", "Prisma ORM", "SQL (joins, subqueries, relations)"], extra: false },
  { title: "Tools & DevOps", skills: ["Git", "GitHub", "VS Code", "npm", "pip", "Jest", "ESLint", "Vitest", "Vercel", "Render"], extra: false },
  { title: "Cloud & Integrations", skills: ["AWS S3", "M-Pesa Daraja API", "PayPal API", "Google OAuth"], extra: false },
  { title: "Media & Design", skills: ["Photoshop (Advanced)", "Illustrator", "After Effects", "Premiere Pro", "InDesign", "vMix", "OBS"], extra: true },
  { title: "Engineering", skills: ["AutoCAD", "MATLAB", "Multisim", "Arduino IDE", "Circuit troubleshooting", "Microcontroller programming"], extra: true },
];

export function Skills() {
  return (
    <section id="skills" style={{ backgroundColor: "#0D1117", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#FFFFFF", fontSize: 36, textAlign: "center", marginBottom: 8 }}>
          Technical Skills
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", color: "#C9D1D9", textAlign: "center", marginBottom: 56, opacity: 0.7 }}>
          Technologies and tools I work with
        </p>
        <div style={{ display: "grid", gap: 20 }} className="skills-grid">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              style={{
                backgroundColor: "#1A2B4A",
                borderRadius: 8,
                padding: 24,
                borderTop: `3px solid ${cat.extra ? "rgba(13,115,119,0.4)" : "#0D7377"}`,
                transition: "transform 0.2s, box-shadow 0.2s",
                position: "relative",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(13,115,119,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              {cat.extra && (
                <span style={{ position: "absolute", top: 12, right: 12, fontSize: 10, padding: "2px 8px", backgroundColor: "rgba(13,115,119,0.15)", borderRadius: 100, color: "#0D7377", fontFamily: "'Inter', sans-serif" }}>
                  Additional Skills
                </span>
              )}
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: cat.extra ? "rgba(13,115,119,0.6)" : "#0D7377", fontSize: 16, marginBottom: 16 }}>
                {cat.title}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{ padding: "5px 12px", borderRadius: 100, backgroundColor: "rgba(201,209,217,0.08)", color: "#C9D1D9", fontFamily: "'Inter', sans-serif", fontSize: 13, transition: "all 0.2s", cursor: "default" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.backgroundColor = "#0D7377"; (e.currentTarget as HTMLSpanElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.backgroundColor = "rgba(201,209,217,0.08)"; (e.currentTarget as HTMLSpanElement).style.color = "#C9D1D9"; }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .skills-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 1023px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 767px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
