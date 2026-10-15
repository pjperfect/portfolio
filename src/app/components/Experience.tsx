import { motion } from 'motion/react';
import { Tag } from './ui/Tag';
import { fadeUp, staggerContainer, viewportOnce } from './ui/motion';

const experience = [
  {
    role: 'Electrical Engineering Intern',
    org: 'Bar-Er Energy, Famagusta, Northern Cyprus',
    date: 'Monday, 30th January 2023 – Friday, 17th March 2023',
    desc: `
    • Produced detailed electrical layouts for solar-integrated housing projects in AutoCAD, including wiring diagrams, circuit designs, lighting placement and load calculations, translating engineers' conceptual designs into buildable electrical plans.
    • Designed solar panel installation layouts and system wiring schematics covering panels, inverters, charge controllers and batteries, in line with IEC solar performance and safety standards.
    • Applied system design principles including load analysis, solar resource assessment and energy yield estimation, to size and configure PV systems for specific site conditions.
    • Coordinated design and field work with a Turkish-speaking engineering team, adapting communication across languages.`,
    tags: ['AutoCAD', 'Solar PV', 'Electrical Design'],
  },
  {
    role: 'Media and Streaming Coordinator Volunteer',
    org: 'Christ Embassy Intl (Believers’ LoveWorld), Nairobi, Kenya',
    date: 'August 2023 – August 2026',
    desc: `
    • Set up and operated live streaming productions using vMix and OBS for church services, weddings, conferences and outreach events across Facebook, YouTube, TikTok and Instagram.
    • Configured RTMP stream keys, stream URLs and multi-platform distribution pipelines, maintaining uptime and stream quality under live production conditions.
    • Managed sound engineering with analogue mixers, coordinating technical setup, rehearsal and real-time troubleshooting.
    • Produced branding assets including logos, animated intros, lyrical video overlays and event flyers for businesses and organisations.`,
    tags: ['vMix', 'OBS', 'RTMP', 'Photoshop'],
  },
  {
    role: 'Full Stack Software Engineer',
    org: 'vision360 Employer-Centered Ideation Project @ Moringa School',
    date: 'Monday, 04th May 2026 – Friday, 29th May 2026',
    desc: `
    • Built a 360° virtual tour viewer using Three.js with drag-to-explore, inertia, auto-rotation and multi-shot navigation, used to showcase sample spaces and deliver clients' own captured tours.
    • Engineered a 3-tier booking flow (Essential, Professional, Enterprise) for clients to schedule an onsite 360°/3D space-capture session, handling date selection, space type and special requirements via the backend REST API.
    • Integrated 3 payment methods and full authentication coverage — JWT, Google OAuth and OTP email verification, to secure the booking and delivery process.
    • Implemented secure, pay-gated asset delivery via AWS S3 pre-signed URLs so clients could access their finished virtual tour once capture and payment were complete, plus an admin analytics dashboard built with Recharts.
    • Managed Git-based collaboration with pull requests across 4 agile sprint phases and daily API contract syncs with the backend team.`,
    tags: [
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
  },
  {
    role: 'Full Stack Web Development Intern (Remote)',
    org: 'InternX Technologies, Bengaluru, India',
    date: 'October 2026 – Present',
    desc: `
    • Completing a 4-week, project-based internship assessed on submitted work: GitHub repository, live deployment and written notes for each weekly task.
    • Building a MERN notes application with JWT authentication, private per-user data and a responsive Tailwind CSS interface (Week 1).`,
    tags: ['MERN', 'JWT', 'Tailwind CSS'],
  },
  {
    role: '[Frontend / Backend] Developer Intern (Remote)',
    org: 'Vyren (DevConnect), Nuremberg, Germany',
    date: 'October 2026 – Present',
    desc: `
    • Working through the Verified [Frontend / Backend] Internship, a free programme with seven mandatory milestones: a knowledge assessment, two practical tasks, a final project, a community contribution, documentation and professional practice.
    • Assessed on the work produced rather than hours attended. Completion earns a certificate with a public verification page.`,
    tags: [],
  },
];

const education = [
  {
    role: 'Software Engineering Bootcamp',
    org: 'Moringa School, Nairobi, Kenya',
    date: 'Monday, 27th October 2025 – Friday, 24th April 2026',
    desc: '6-month full-stack program across 5 structured learning modules and a final capstone project. Built and deployed multiple projects throughout.',
    modules: [
      {
        title: 'Module 1 - Foundations',
        desc: 'HTML, CSS, JavaScript fundamentals, Git and GitHub, CLI, algorithms, arrays, objects, debugging, SDLC, VS Code, Node.js.',
      },
      {
        title: 'Module 2 - JavaScript',
        desc: 'Functions, scope, higher-order functions, callbacks, DOM manipulation, events, HTML forms, async JS, Promises, async/await, external APIs, fetch, unit testing (Jest), ESLint, Big O notation.',
      },
      {
        title: 'Module 3 - React',
        desc: 'Components, props, state (useState), event handlers, controlled forms, useEffect, useRef, useContext, custom hooks, CRUD, data fetching, React Router, Vitest, npm.',
      },
      {
        title: 'Module 4 - Python and OOP',
        desc: 'Python fundamentals, lists, tuples, dictionaries, sets, loops, functions, PyPI, pip, file I/O, OOP (classes, inheritance, property decorators), one-to-many and many-to-many relationships, CLI design, debugging and testing.',
      },
      {
        title: 'Module 5 - Flask and Backend',
        desc: 'Flask, REST APIs, full CRUD, Flask-SQLAlchemy, SQL (SELECT, filter, JOIN, subqueries), Marshmallow serialization, JWT authentication, sessions, cookies, password hashing, deployment (Render), data structures and algorithms (linked lists, hash tables, trees, stacks, queues, recursion), React-Flask integration.',
      },
    ],
    tags: [
      'HTML',
      'CSS',
      'JavaScript',
      'Git',
      'GitHub',
      'Node.js',
      'VS Code',
      'DOM',
      'Jest',
      'ESLint',
      'React',
      'React Router',
      'Vitest',
      'npm',
      'Python',
      'PyPI',
      'pip',
      'Flask',
      'Flask-SQLAlchemy',
      'SQL',
      'Marshmallow',
      'JWT',
      'Render',
    ],
  },
  {
    role: 'B.Sc. Electrical and Electronics Engineering',
    org: 'Eastern Mediterranean University, Famagusta, North Cyprus',
    date: 'Monday, 19th February 2018 – Tuesday, 05th July 2022',
    desc: 'Graduated with CGPA 3.14 / 4.00 (Honors). Specialised in circuit design, microcontroller programming, renewable energy systems and engineering simulation (AutoCAD, MATLAB, Multisim). Final year project: a motorised camera slider (Arduino, NEMA 17 stepper motor) that took 2nd place at the university\'s Final Year Project Competition.',
    tags: ['Arduino', 'MATLAB', 'AutoCAD', 'Multisim'],
  },
  {
    role: 'A-Levels, AS-Levels and IGCSE',
    org: 'Brookhouse International School, Nairobi, Kenya',
    date: 'September 2013 – July 2017',
    desc: "Majored in Physics, Mathematics, Geography and Computer Science. Activities: Hog Charge, President's Award-Kenya (Silver & Gold), Chess Tournament, Environmental Club.",
    tags: ['Physics', 'Mathematics', 'Computer Science'],
  },
];

function TimelineCard({
  role,
  org,
  date,
  desc,
  tags,
  modules,
}: {
  role: string;
  org: string;
  date: string;
  desc: string;
  tags: string[];
  modules?: { title: string; desc: string }[];
}) {
  return (
    <motion.div variants={fadeUp} className="flex gap-4 mb-8 relative">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-accent border-2 border-surface flex-shrink-0 mt-1.5 z-10" />
        <div className="flex-1 w-0.5 bg-accent/25 mt-1" />
      </div>
      <div className="flex-1 bg-bg rounded-lg px-5 pt-5 pb-4 border-t-[3px] border-accent mb-1 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(13,115,119,0.2)]">
        <h3 className="font-display font-bold text-white text-[15px] mb-1 leading-[1.3]">
          {role}
        </h3>
        <p className="font-body text-accent text-xs mb-2 font-medium">
          {org} · {date}
        </p>
        <p className="font-body text-text text-[13px] leading-[1.7] mb-3 opacity-85 whitespace-pre-line">
          {desc.trim()}
        </p>
        {modules && (
          <ul className="mb-3 space-y-1.5 list-disc list-inside">
            {modules.map((m) => (
              <li
                key={m.title}
                className="font-body text-text text-[13px] leading-[1.6] opacity-85"
              >
                <span className="font-semibold text-white/90">{m.title}:</span>{' '}
                {m.desc}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Tag
              key={tag}
              variant="outline"
              className="px-2.5 py-[3px] text-[11px]"
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ColumnHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-display font-bold text-white text-xl">{title}</h3>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="bg-surface px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="max-w-[1280px] mx-auto"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display font-extrabold text-white text-4xl text-center mb-2"
        >
          Experience & Education
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-body text-text text-center mb-16 opacity-70 text-[15px]"
        >
          Where I've worked, studied and built
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={staggerContainer}>
            <ColumnHeading
              title="Experience"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              }
            />
            {experience.map((e, i) => (
              <TimelineCard key={i} {...e} />
            ))}
          </motion.div>

          <motion.div variants={staggerContainer}>
            <ColumnHeading
              title="Education"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              }
            />
            {education.map((e, i) => (
              <TimelineCard key={i} {...e} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
