import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";

function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const cards = [
    { icon: <Mail size={28} />, label: "Email", value: "pjole.kenya@gmail.com", href: "mailto:pjole.kenya@gmail.com" },
    { icon: <Linkedin size={28} />, label: "LinkedIn", value: "linkedin.com/in/pjperfect", href: "https://linkedin.com/in/pjperfect" },
    { icon: <Github size={28} />, label: "GitHub", value: "github.com/pjperfect", href: "https://github.com/pjperfect" },
    { icon: <WhatsAppIcon size={28} />, label: "WhatsApp", value: "+254 715 556 379", href: "https://wa.me/254715556379" },
  ];

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#1A2B4A",
    border: "1.5px solid rgba(13,115,119,0.25)",
    borderRadius: 8,
    color: "#C9D1D9",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box" as const,
  };

  return (
    <section id="contact" style={{ backgroundColor: "#0D1117", padding: "96px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#FFFFFF", fontSize: 36, textAlign: "center", marginBottom: 12 }}>
          Let's Work Together
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", color: "#C9D1D9", textAlign: "center", marginBottom: 56, opacity: 0.8, fontSize: 15 }}>
          Open to junior software engineering roles, freelance projects, and collaborations — local and remote.
        </p>

        {/* Contact cards */}
        <div style={{ display: "grid", gap: 20, marginBottom: 56 }} className="contact-grid-4">
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#1A2B4A", borderRadius: 8, padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(13,115,119,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >
              <span style={{ color: "#0D7377" }}>{c.icon}</span>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#FFFFFF", fontSize: 15 }}>{c.label}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: "#0D7377", fontSize: 13 }}>{c.value}</p>
            </a>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gap: 16 }} className="form-row">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#0D7377")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(13,115,119,0.25)")}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#0D7377")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(13,115,119,0.25)")}
            />
          </div>
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#0D7377")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(13,115,119,0.25)")}
          />
          <button
            type="submit"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 32px", backgroundColor: sent ? "#0a5f63" : "#0D7377", color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", alignSelf: "flex-start" }}
            onMouseEnter={(e) => !sent && (e.currentTarget.style.backgroundColor = "#0a5f63")}
            onMouseLeave={(e) => !sent && (e.currentTarget.style.backgroundColor = "#0D7377")}
          >
            <Send size={16} />
            {sent ? "Message Sent!" : "Send Message"}
          </button>
        </form>
      </div>
      <style>{`
        .contact-grid-4 { grid-template-columns: repeat(4, 1fr); }
        .form-row { grid-template-columns: 1fr 1fr; }
        @media (max-width: 1023px) { .contact-grid-4 { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 767px) {
          .contact-grid-4 { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
