import { motion } from 'motion/react';
import { contact } from '@/config/contact';
import { MediaSlideshow } from './MediaSlideshow';
import { SectionHeading } from './ui/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from './ui/motion';

const intro = [
  'I am a software engineer with an Electrical & Electronics Engineering degree, and I also work as a graphics and motion designer and live streamer.',
  'My degree at Eastern Mediterranean University (CGPA 3.14) ended with a motorised camera slider that took 2nd place in the Final Year Project Competition. I then interned at Bar-Er Energy, drawing solar PV electrical layouts in AutoCAD and later trained as a full-stack developer at Moringa School.',
  'I built vision360, a booking platform for creative spaces with 360° tours and payments, as well as MeterLink, which turns KPLC token SMS messages into electricity usage insights.',
  'Since 2023 I have run live streams and sound setup for conferences, programmes and outreach events.',
  'I produce logos, animated intros, video overlays and flyers for businesses and organisations.',
  `Based in ${contact.location}.`,
];

const [lead, ...rest] = intro;

export function About() {
  return (
    <section id="about" className="bg-surface px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="max-w-[1080px] mx-auto"
      >
        <SectionHeading
          title="About Me"
          subtitle="From circuits to code"
          align="left"
          spacing="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10 items-start"
        >
          <div className="flex flex-col gap-6">
            <motion.p
              variants={fadeUp}
              className="font-display font-medium text-white text-2xl leading-[1.5]"
            >
              {lead}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {rest.map((text, i) => (
                <p
                  key={i}
                  className="font-body text-text text-[15px] leading-[1.8] opacity-90"
                >
                  {text}
                </p>
              ))}
            </motion.div>
          </div>

          {/* Stays in view beside the text on wider screens. */}
          <motion.div variants={fadeUp} className="md:sticky md:top-24">
            <MediaSlideshow />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
