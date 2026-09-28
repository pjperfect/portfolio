import { motion } from 'motion/react';
import { Tag } from './ui/Tag';
import { fadeUp, staggerContainer, viewportOnce } from './ui/motion';

const skillCategories = [
  {
    title: 'Frontend',
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
      'Lucide React',
      'LocalStorage',
    ],
  },
  {
    title: 'Backend',
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
    ],
  },
  {
    title: 'Databases & ORMs',
    skills: [
      'PostgreSQL',
      'SQLite',
      'SQLAlchemy',
      'Prisma ORM',
      'SQL (joins, subqueries, relations)',
    ],
  },
  {
    title: 'Tools & DevOps',
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
    skills: [
      'Photoshop',
      'Illustrator',
      'After Effects',
      'Premiere Pro',
      'InDesign',
      'vMix',
      'OBS',
      'EasyWorship',
      'RTMP',
      'Multi-platform Streaming',
      'Sound Engineering',
    ],
  },
  {
    title: 'Engineering',
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
        <motion.h2
          variants={fadeUp}
          className="font-display font-extrabold text-white text-4xl text-center mb-2"
        >
          Technical Skills
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-body text-text text-center mb-14 opacity-70"
        >
          Technologies and tools I work with
        </motion.p>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillCategories.map((cat) => (
            <motion.div key={cat.title} variants={fadeUp}>
              <div className="bg-surface rounded-lg p-6 border-t-[3px] border-t-accent transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(13,115,119,0.25)]">
                <h3 className="font-display font-bold text-base mb-4 text-accent">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <Tag key={skill} variant="subtle">
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
