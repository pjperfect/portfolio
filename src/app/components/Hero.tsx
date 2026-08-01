import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { Tag } from './ui/Tag';
import { assets } from '@/config/assets';
import { contact, emailHref } from '@/config/contact';

const roles = ['Software Engineer', 'Electrical & Electronics Engineer', 'Media Graphics & Motion Designer', 'Live Streamer'];

const socialLinks = [
  { icon: <Github size={17} />, href: contact.githubUrl, label: 'GitHub' },
  { icon: <Linkedin size={17} />, href: contact.linkedinUrl, label: 'LinkedIn' },
  { icon: <Mail size={17} />, href: emailHref, label: 'Email' },
  { icon: <WhatsAppIcon size={17} />, href: contact.whatsappHref, label: 'WhatsApp' },
];

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
      className="relative min-h-screen bg-bg flex items-center overflow-hidden"
    >
      <div
        className="hidden md:block absolute right-[12%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,115,119,0.12) 0%, transparent 70%)' }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 pb-14 w-full flex flex-col md:flex-row items-center gap-9 md:gap-16">
        {/* Text */}
        <div className="flex-1 order-2 md:order-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-success/35 bg-success/[0.07] mb-6">
            <span className="w-2 h-2 rounded-full bg-success block animate-avail-pulse" />
            <span className="font-body text-xs text-success tracking-wide font-medium">
              {contact.location}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-white leading-[1.08] mb-5 text-[42px] md:text-[72px]">
            Philip <span className="text-accent">Olembo</span>
          </h1>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
            {roles.map((r) => (
              <Tag key={r} variant="outline" className="text-text border-accent/45 bg-accent/[0.08]">
                {r}
              </Tag>
            ))}
          </div>

          <p className="font-body text-text text-base leading-[1.75] mb-9 max-w-[700px] opacity-85 mx-auto md:mx-0">
            Full-stack software engineer with a background in Electrical and Electronics Engineering from Eastern Mediterranean University and several years of experience in live event production and graphic design. Completed a software engineering programme at Moringa School covering JavaScript, React, Python, Flask, SQL, and REST API development across five learning modules and a final capstone project. Built and deployed multiple web applications, including an Employer-Centered Ideation (ECI) production-grade creative space booking platform with payment integrations, 360-degree space visualisation and cloud asset delivery for Nairobi Streetwise.
          </p>

          <div className="flex justify-center md:justify-start gap-3.5 flex-wrap mb-9">
            <button
              onClick={scrollToProjects}
              className="flex items-center gap-2 px-7 py-3.5 bg-accent text-white border-none rounded-lg font-body text-[15px] font-semibold cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(13,115,119,0.35)] hover:bg-accent-dark hover:shadow-[0_6px_28px_rgba(13,115,119,0.5)]"
            >
              View My Work <ArrowRight size={15} />
            </button>
            <a
              href={assets.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 border-[1.5px] border-accent/50 rounded-lg text-accent font-body text-[15px] font-semibold no-underline transition-all duration-200 hover:bg-accent/10 hover:border-accent"
            >
              <Download size={15} /> View CV
            </a>
          </div>

          <div className="flex justify-center md:justify-start gap-2.5 flex-wrap">
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                title={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-[1.5px] border-accent/35 flex items-center justify-center text-text-dim no-underline transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/10 hover:-translate-y-0.5"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Profile photo */}
        <div className="flex-shrink-0 order-1 md:order-2">
          <div className="relative">
            <div className="absolute -inset-1 md:-inset-1.5 rounded-full animate-spin-ring opacity-60 [background:conic-gradient(from_0deg,#0D7377,transparent_60%,#0D7377)]" />
            <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border-[3px] border-accent/60 p-1 bg-bg">
              <img
                src={assets.profilePhoto}
                alt="Philip Olembo"
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to About section"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 bg-transparent border-[1.5px] border-accent/30 rounded-full text-accent cursor-pointer px-[18px] py-2 items-center gap-1.5 font-body text-[11px] tracking-[1.5px] uppercase transition-all duration-200 animate-fade-float hover:bg-accent/10 hover:border-accent"
      >
        Scroll
      </button>
    </section>
  );
}
