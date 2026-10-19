import { motion } from 'motion/react';
import {
  Monitor,
  Server,
  Database,
  Wrench,
  Cloud,
  Palette,
  CircuitBoard,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';
import { Tag } from './ui/Tag';
import { SectionHeading } from './ui/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from './ui/motion';

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  // Grid placement: 2 columns on tablets, 3 on small laptops, a 12-column
  // layout from 1280px where card widths follow how much each one holds.
  span: string;
  // Lays the title beside the tags on the widest screens.
  wide?: boolean;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Monitor,
    span: 'xl:col-span-5',
    skills: [
      'JavaScript (ES6+)',
      'TypeScript',
      'React',
      'HTML5',
      'CSS3',
      'React Router',
      'Tailwind CSS',
      'Vite',
      'Three.js',
      'Framer Motion',
      'Radix UI',
      'Recharts',
      'Fetch API',
      'async/await',
      'Lucide React',
      'LocalStorage',
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    span: 'xl:col-span-4',
    skills: [
      'Python',
      'Flask',
      'Node.js',
      'Express',
      'REST APIs',
      'JWT Authentication',
      'OAuth 2.0',
      'OTP Email Verification',
      'Marshmallow',
      'Nodemailer',
      'openpyxl',
      'Sessions & Cookies',
      'Password Hashing',
    ],
  },
  {
    title: 'Databases & ORMs',
    icon: Database,
    span: 'xl:col-span-3',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Mongoose',
      'SQLite',
      'SQLAlchemy',
      'Prisma ORM',
      'JSON File Storage',
      'SQL (joins, subqueries, relations)',
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: Wrench,
    span: 'xl:col-span-4',
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'npm',
      'pip',
      'PyPI',
      'Jest',
      'ESLint',
      'Vitest',
      'Babel',
      'Sharp',
      'PyInstaller',
      'Vercel',
      'Render',
      'GitHub Pages',
    ],
  },
  {
    title: 'Cloud & Integrations',
    icon: Cloud,
    span: 'xl:col-span-3',
    skills: [
      'AWS S3',
      'S3 Pre-signed URLs',
      'M-Pesa Daraja API',
      'PayPal API',
      'Google OAuth',
      'EmailJS',
    ],
  },
  {
    title: 'Media & Design',
    icon: Palette,
    span: 'xl:col-span-5',
    skills: [
      'Photoshop',
      'Illustrator',
      'After Effects',
      'Premiere Pro',
      'InDesign',
      'vMix',
      'OBS',
      'EasyWorship',
      'RTMP Streaming',
      'Multi-platform Streaming',
      'Analogue Sound Mixing',
    ],
  },
  {
    title: 'Engineering',
    icon: CircuitBoard,
    span: 'md:col-span-2 lg:col-span-3 xl:col-span-12',
    wide: true,
    skills: [
      'AutoCAD',
      'MATLAB',
      'Multisim',
      'Arduino IDE',
      'C++',
      'Stepper Motor Control (NEMA 17, A4988)',
      'Circuit Design',
      'Circuit Troubleshooting',
      'Microcontroller Programming',
      'Solar PV Design',
      'Hardware Diagnostics',
      'Windows Installation',
    ],
  },
  {
    title: 'Concepts',
    icon: Lightbulb,
    span: 'md:col-span-2 lg:col-span-3 xl:col-span-12',
    wide: true,
    skills: [
      'OOP',
      'Data Structures & Algorithms',
      'Big O Notation',
      'React Context & Custom Hooks',
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="bg-bg px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="max-w-[1280px] mx-auto"
      >
        <SectionHeading
          title="Technical Skills"
          subtitle="Technologies and tools I work with"
        />
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 gap-5"
        >
          {skillCategories.map(({ title, icon: Icon, span, wide, skills }) => (
            <motion.div key={title} variants={fadeUp} className={span}>
              <div
                className={`h-full bg-surface rounded-xl p-6 border border-white/[0.06] border-t-[3px] border-t-accent transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(13,115,119,0.25)] ${
                  wide ? 'xl:flex xl:items-start xl:gap-10' : ''
                }`}
              >
                <div
                  className={`flex items-center gap-3 mb-5 ${
                    wide ? 'xl:mb-0 xl:w-60 xl:shrink-0 xl:pt-1' : ''
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-light">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="font-display font-bold text-[17px] leading-tight text-white">
                    {title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Tag
                      key={skill}
                      variant="subtle"
                      className="px-3 py-1.5 text-[13px]"
                    >
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
