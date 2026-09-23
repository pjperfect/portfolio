import { motion } from 'motion/react';
import { contact } from '@/config/contact';
import { fadeUp, staggerContainer, viewportOnce } from './ui/motion';

const intro = [
  "Software engineering graduate of Moringa School's 6-month bootcamp, with a strong foundation across the full JavaScript and Python stack.",
  'My background in Electrical & Electronics Engineering (Eastern Mediterranean University, CGPA 3.14) gives me a systems-thinking approach to software problems.',
  'Beyond code, I bring 6+ years of experience in live event streaming, AV production and graphic design, which means I think about user experience from an engineer and creative point of view.',
  `Based in ${contact.location}. Open to local & remote opportunities worldwide.`,
];

export function About() {
  return (
    <section id="about" className="bg-surface px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="max-w-[720px] mx-auto text-center"
      >
        <motion.p
          variants={fadeUp}
          className="font-body text-[11px] tracking-[3px] uppercase text-accent mb-4 font-semibold"
        >
          About Me
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display font-extrabold text-white text-4xl mb-7 leading-tight"
        >
          What I bring to the table.
        </motion.h2>
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          {intro.map((text, i) => (
            <p
              key={i}
              className="font-body text-text text-[15px] leading-[1.8] opacity-90"
            >
              {text}
            </p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
