import { Tag } from './ui/Tag';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['JavaScript (ES6+)', 'React', 'HTML5', 'CSS3', 'React Router', 'Tailwind CSS', 'Vite', 'Three.js', 'Framer Motion', 'Recharts'],
    extra: false,
  },
  {
    title: 'Backend',
    skills: ['Python', 'Flask', 'Node.js', 'Express', 'REST APIs', 'JWT Authentication', 'OAuth 2.0', 'Marshmallow', 'Nodemailer'],
    extra: false,
  },
  {
    title: 'Databases & ORMs',
    skills: ['PostgreSQL', 'SQLite', 'SQLAlchemy', 'Prisma ORM', 'SQL (joins, subqueries, relations)'],
    extra: false,
  },
  {
    title: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'VS Code', 'npm', 'pip', 'Jest', 'ESLint', 'Vitest', 'Vercel', 'Render'],
    extra: false,
  },
  {
    title: 'Cloud & Integrations',
    skills: ['AWS S3', 'M-Pesa Daraja API', 'PayPal API', 'Google OAuth'],
    extra: false,
  },
  {
    title: 'Media & Design',
    skills: ['Photoshop (Advanced)', 'Illustrator', 'After Effects', 'Premiere Pro', 'InDesign', 'vMix', 'OBS'],
    extra: true,
  },
  {
    title: 'Engineering',
    skills: ['AutoCAD', 'MATLAB', 'Multisim', 'Arduino IDE', 'Circuit troubleshooting', 'Microcontroller programming'],
    extra: true,
  },
];

export function Skills() {
  return (
    <section id="skills" className="bg-bg px-6 py-24">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display font-extrabold text-white text-4xl text-center mb-2">
          Technical Skills
        </h2>
        <p className="font-body text-text text-center mb-14 opacity-70">
          Technologies and tools I work with
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className={`relative bg-surface rounded-lg p-6 border-t-[3px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(13,115,119,0.25)] ${
                cat.extra ? 'border-t-accent/40' : 'border-t-accent'
              }`}
            >
              {cat.extra && (
                <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 bg-accent/15 rounded-full text-accent font-body">
                  Additional Skills
                </span>
              )}
              <h3
                className={`font-display font-bold text-base mb-4 ${
                  cat.extra ? 'text-accent/60' : 'text-accent'
                }`}
              >
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
          ))}
        </div>
      </div>
    </section>
  );
}
