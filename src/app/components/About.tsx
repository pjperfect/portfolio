import { Tag } from './ui/Tag';
import { contact } from '@/config/contact';

const techCategories = [
  {
    label: 'Frontend',
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Three.js'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'Flask', 'REST APIs', 'JWT'],
  },
  {
    label: 'Database',
    skills: ['PostgreSQL', 'SQLite', 'SQLAlchemy', 'Prisma ORM'],
  },
  {
    label: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Vercel', 'Render', 'AWS S3', 'vMix', 'OBS'],
  },
];

const intro = [
  "Software engineering graduate of Moringa School's 6-month bootcamp, with a strong foundation across the full JavaScript and Python stack.",
  'My background in Electrical & Electronics Engineering (Eastern Mediterranean University, CGPA 3.14) gives me a systems-thinking approach to software problems.',
  'Beyond code, I bring 6+ years of experience in live event streaming, AV production, and graphic design, which means I think about user experience as both an engineer and a creative.',
  `Based in ${contact.location}. Open to local & remote opportunities worldwide.`,
];

export function About() {
  return (
    <section id="about" className="bg-surface px-6 py-24">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Left */}
          <div className="flex-1">
            <p className="font-body text-[11px] tracking-[3px] uppercase text-accent mb-4 font-semibold">
              About Me
            </p>
            <h2 className="font-display font-extrabold text-white text-4xl mb-7 leading-tight">
              Engineer by training,
              <br />
              creator by heart.
            </h2>
            <div className="flex flex-col gap-4">
              {intro.map((text, i) => (
                <p
                  key={i}
                  className="font-body text-text text-[15px] leading-[1.8] opacity-90"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Right — skills grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
            {techCategories.map((cat) => (
              <div
                key={cat.label}
                className="bg-bg rounded-lg px-5 py-[18px] border-l-[3px] border-accent transition-shadow duration-200 hover:shadow-[0_6px_28px_rgba(13,115,119,0.18)]"
              >
                <p className="font-display font-bold text-accent text-xs mb-2.5 tracking-wide uppercase">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <Tag key={s} variant="subtle">
                      {s}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
