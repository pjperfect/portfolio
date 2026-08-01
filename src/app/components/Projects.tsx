import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tag } from './ui/Tag';

const featured = {
  title: 'vision360',
  subtitle: 'Creative Space Booking Platform',
  description:
    'A full-stack platform that solves fragmented creative space booking by merging immersive 360-degree space discovery with an end-to-end booking, payment, and asset-delivery workflow. Targets photography clients, content creators, event planners, and property managers.',
  stack: [
    'React 18',
    'Vite',
    'Three.js',
    'Tailwind CSS',
    'Radix UI',
    'Framer Motion',
    'Recharts',
    'Node.js',
    'Express',
    'Prisma ORM',
    'PostgreSQL',
    'AWS S3',
    'JWT',
    'Google OAuth',
    'M-Pesa Daraja',
    'PayPal',
  ],
  github: 'https://github.com/mongaremetrine5-stack/VISION360-CLIENT-FRONTEND',
  live: 'https://vision-360-client-frontend.vercel.app/',
};

const projects = [
  {
    title: 'Motorized Camera Slider',
    subtitle: 'Undergraduate Final Year Project',
    description:
      'An Arduino-based motorised camera slider built to solve the challenge of manual camera tracking during online education in the COVID-19 pandemic. A 1-metre slider runs on copper pipe rails with a NEMA 17 stepper motor driving a GT2 timing belt, controlled by a potentiometer for variable speed and a limit switch for direction. Built from locally sourced materials for under $200.',
    stack: [
      'Arduino (C++)',
      'NEMA 17 Stepper Motor',
      'A4988 Motor Driver',
      'Potentiometer',
      'Limit Switch',
      'MDF Wood',
      'Copper Pipes',
      'GT2 Timing Belt',
    ],
    github: null,
    live: null,
    award: '2nd Place — EMU 2022',
    detailPage: '/projects/camera-slider',
  },
  {
    title: 'MeterLink — Web',
    subtitle: 'Prepaid Electricity Tracker',
    description:
      'A web-based platform that allows KPLC prepaid electricity customers to track their usage and token history parsed from SMS messages, providing visibility into consumption patterns.',
    stack: ['React'],
    github: 'https://github.com/pjperfect/meterlink',
    live: 'https://meterlink.vercel.app/',
    award: null,
    detailPage: null,
  },
  {
    title: 'MeterLink — CLI',
    subtitle: 'Prepaid Electricity Tracker (Python)',
    description:
      'A Python command-line companion to MeterLink that tracks prepaid electricity token purchases per meter using Excel import and local JSON storage.',
    stack: ['Python', 'JSON', 'openpyxl'],
    github: 'https://github.com/pjperfect/meterlink-cli',
    live: null,
    award: null,
    detailPage: null,
  },
];

function ProjectLinks({
  github,
  live,
}: {
  github: string | null;
  live: string | null;
}) {
  return (
    <div className="flex gap-3.5 mt-auto">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-text-dim text-[13px] font-body no-underline transition-colors duration-200 hover:text-accent"
        >
          <Github size={15} /> Code
        </a>
      )}
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-text-dim text-[13px] font-body no-underline transition-colors duration-200 hover:text-accent"
        >
          <ExternalLink size={15} /> Live Demo
        </a>
      )}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="bg-surface px-6 py-24">
      <div className="max-w-[1280px] mx-auto">
        <p className="font-body text-[11px] tracking-[3px] uppercase text-accent mb-3 font-semibold">
          Projects
        </p>
        <h2 className="font-display font-extrabold text-white text-4xl mb-2">
          A selection of software, hardware,
          <br className="hidden md:block" /> and creative-tech work
        </h2>
        <div className="w-12 h-[3px] bg-accent rounded mb-14" />

        {/* Featured card */}
        <div className="relative bg-bg rounded-xl px-6 md:px-10 pt-10 pb-9 mb-6 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(13,115,119,0.25)]">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-accent-light to-accent" />
          <div
            className="absolute -top-16 -right-16 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(13,115,119,0.08) 0%, transparent 70%)',
            }}
          />

          <div className="flex items-start justify-between flex-wrap gap-4 mb-1">
            <div>
              <span className="inline-block px-2.5 py-[3px] bg-accent/[0.18] border border-accent/40 rounded-full text-accent font-body text-[11px] font-semibold tracking-wide mb-3">
                Featured Project
              </span>
              <h3 className="font-display font-extrabold text-white text-[28px] mb-1 leading-[1.1]">
                {featured.title}
              </h3>
              <p className="font-body text-accent text-sm font-medium mb-4">
                {featured.subtitle}
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={featured.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="flex items-center gap-1.5 px-4 py-2 border-[1.5px] border-accent/40 rounded-lg text-text font-body text-[13px] no-underline transition-all duration-200 hover:border-accent hover:text-accent"
              >
                <Github size={15} /> Code
              </a>
              <a
                href={featured.live}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
                className="flex items-center gap-1.5 px-4 py-2 bg-accent border-[1.5px] border-accent rounded-lg text-white font-body text-[13px] no-underline transition-all duration-200 hover:bg-accent-dark"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            </div>
          </div>

          <p className="font-body text-text text-[15px] leading-[1.75] max-w-[820px] mb-6 opacity-85">
            {featured.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {featured.stack.map((s) => (
              <Tag key={s} variant="outline">
                {s}
              </Tag>
            ))}
          </div>
        </div>

        {/* Other projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => {
            const inner = (
              <div className="relative flex flex-col h-full bg-bg rounded-[10px] px-7 pt-7 pb-6 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(13,115,119,0.2)]">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-70" />

                {p.award && (
                  <Tag variant="award" className="self-start mb-3">
                    🏆 {p.award}
                  </Tag>
                )}

                <h3 className="font-display font-bold text-white text-[17px] mb-1 leading-tight">
                  {p.title}
                </h3>
                <p className="font-body text-accent text-xs mb-3.5 font-medium">
                  {p.subtitle}
                </p>
                <p className="font-body text-text text-[13px] leading-[1.75] mb-5 flex-1 opacity-85">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.stack.map((s) => (
                    <Tag
                      key={s}
                      variant="outline"
                      className="px-2.5 py-1 text-[11px] bg-accent/5"
                    >
                      {s}
                    </Tag>
                  ))}
                </div>

                {p.detailPage ? (
                  <div className="flex items-center gap-1.5 text-accent font-body text-[13px] font-semibold mt-auto">
                    View Case Study <ArrowRight size={14} />
                  </div>
                ) : (
                  <ProjectLinks github={p.github} live={p.live} />
                )}
              </div>
            );

            return p.detailPage ? (
              <Link
                key={p.title}
                to={p.detailPage}
                className="no-underline flex flex-col cursor-pointer"
              >
                {inner}
              </Link>
            ) : (
              <div key={p.title} className="flex flex-col">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
