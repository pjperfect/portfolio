import { motion } from 'motion/react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tag } from './ui/Tag';
import { SectionHeading } from './ui/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from './ui/motion';

type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  github: string | null;
  live: string | null;
  award: string | null;
  detailPage: string | null;
  featured?: boolean;
  // Grid placement, the same scheme as Technical Skills: 2 columns on tablets, 3 on
  // small laptops, and a 12-column layout from 1280px where each card's width follows
  // how much it holds. Class names are written out in full so Tailwind can find them.
  span: string;
};

const projects: Project[] = [
  {
    title: 'vision360',
    subtitle: 'Creative Space Booking Platform',
    description:
      'A full-stack platform that solves fragmented creative space booking by merging immersive 360-degree space discovery with an end-to-end booking, payment and asset-delivery workflow. Targets photography clients, content creators, event planners and property managers.',
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
      'Vercel',
      'Render',
    ],
    github: 'https://github.com/mongaremetrine5-stack/VISION360-CLIENT-FRONTEND',
    live: 'https://vision-360-client-frontend.vercel.app/',
    award: null,
    detailPage: null,
    featured: true,
    span: 'md:col-span-2 lg:col-span-2 xl:col-span-7',
  },
  {
    title: 'Motorised Camera Slider',
    subtitle: 'Undergraduate Final Year Project',
    description:
      'An Arduino-based motorised camera slider built to solve the challenge of manual camera tracking during online education in the COVID-19 pandemic. A 1-metre slider runs on copper pipe rails with a NEMA 17 stepper motor driving a GT2 timing belt, controlled by a potentiometer for variable speed and a limit switch for direction. Budget covered was $200.',
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
    award: '2nd Place Final Project EMU 2022',
    detailPage: '/projects/camera-slider',
    span: 'xl:col-span-5',
  },
  {
    title: 'MeterLink — Web',
    subtitle: 'Prepaid Electricity Tracker',
    description:
      'A web platform that turns KPLC prepaid electricity SMS messages into usage insights. Paste your token SMS and it parses spend, units and dates into a dashboard, monthly analytics with cost-per-kWh breakdowns and a filterable usage history, all stored locally in the browser for privacy.',
    stack: ['React 19', 'Vite', 'React Router', 'Recharts', 'Tailwind CSS'],
    github: 'https://github.com/pjperfect/meterlink',
    live: 'https://meterlink.vercel.app/',
    award: null,
    detailPage: null,
    span: 'xl:col-span-4',
  },
  {
    title: 'MeterLink — CLI',
    subtitle: 'Prepaid Electricity Tracker (Python)',
    description:
      "A Python command-line companion to MeterLink (web) that tracks prepaid electricity token purchases per meter for Kenya's KPLC system. It imports purchase history from Excel (pasted M-Pesa/KPLC SMS), with hashed-password login, per-meter tracking, running totals and last-5-purchase summaries, all stored locally in JSON, with a standalone executable also available.",
    stack: ['Python', 'JSON', 'openpyxl'],
    github: 'https://github.com/pjperfect/meterlink-cli',
    live: null,
    award: null,
    detailPage: null,
    span: 'xl:col-span-4',
  },
  {
    title: 'TaskFlow API',
    subtitle: 'Technical Interview Exercise — Africa Tech Space',
    description:
      'Debug, review and extend a small team task-tracker API as part of the Africa Tech Space software engineering internship interview.',
    stack: ['Node.js', 'Express', 'REST API', 'JSON file storage', 'Git', 'GitHub'],
    github: 'https://github.com/pjperfect/taskflow',
    live: null,
    award: null,
    detailPage: null,
    span: 'xl:col-span-4',
  },
];

function FeaturedLinks({
  github,
  live,
}: {
  github: string | null;
  live: string | null;
}) {
  return (
    <div className="flex gap-3">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="flex items-center gap-1.5 px-4 py-2 border-[1.5px] border-accent/40 rounded-lg text-text font-body text-[13px] no-underline transition-all duration-200 hover:border-accent hover:text-accent"
        >
          <Github size={15} /> Code
        </a>
      )}
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          title="Live Demo"
          className="flex items-center gap-1.5 px-4 py-2 bg-accent border-[1.5px] border-accent rounded-lg text-white font-body text-[13px] no-underline transition-all duration-200 hover:bg-accent-dark"
        >
          <ExternalLink size={15} /> Live Demo
        </a>
      )}
    </div>
  );
}

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

function ProjectCard({ project }: { project: Project }) {
  const { featured } = project;

  return (
    <div
      className={`relative flex flex-1 flex-col bg-bg overflow-hidden transition-all duration-200 hover:-translate-y-1 ${
        featured
          ? 'rounded-xl px-6 md:px-8 pt-10 pb-9 hover:shadow-[0_12px_48px_rgba(13,115,119,0.25)]'
          : 'rounded-[10px] px-7 pt-7 pb-6 hover:shadow-[0_8px_32px_rgba(13,115,119,0.2)]'
      }`}
    >
      {featured ? (
        <>
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
                {project.title}
              </h3>
              <p className="font-body text-accent text-sm font-medium mb-4">
                {project.subtitle}
              </p>
            </div>
            <FeaturedLinks github={project.github} live={project.live} />
          </div>
          <p className="font-body text-text text-[15px] leading-[1.75] max-w-[820px] mb-6 flex-1 opacity-85">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Tag key={s} variant="outline">
                {s}
              </Tag>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-70" />

          {project.award && (
            <Tag variant="award" className="self-start mb-3">
              🏆 {project.award}
            </Tag>
          )}

          <h3 className="font-display font-bold text-white text-[17px] mb-1 leading-tight">
            {project.title}
          </h3>
          <p className="font-body text-accent text-xs mb-3.5 font-medium">
            {project.subtitle}
          </p>
          <p className="font-body text-text text-[13px] leading-[1.75] mb-5 flex-1 opacity-85">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.map((s) => (
              <Tag
                key={s}
                variant="outline"
                className="px-2.5 py-1 text-[11px] bg-accent/5"
              >
                {s}
              </Tag>
            ))}
          </div>

          {project.detailPage ? (
            <div className="flex items-center gap-1.5 text-accent font-body text-[13px] font-semibold mt-auto">
              View Case Study <ArrowRight size={14} />
            </div>
          ) : (
            <ProjectLinks github={project.github} live={project.live} />
          )}
        </>
      )}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="bg-surface px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="max-w-[1280px] mx-auto"
      >
        <SectionHeading
          title="Projects"
          subtitle="A selection of software, hardware and creative-tech work"
          align="left"
        />

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 gap-5"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={fadeUp} className={project.span}>
              {project.detailPage ? (
                <Link
                  to={project.detailPage}
                  className="no-underline flex h-full flex-col cursor-pointer"
                >
                  <ProjectCard project={project} />
                </Link>
              ) : (
                <div className="flex h-full flex-col">
                  <ProjectCard project={project} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
