import { motion } from 'motion/react';
import { fadeUp } from './motion';

type Props = {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  // Spacing below the heading block. Tailwind class, e.g. "mb-14".
  spacing?: string;
};

// One heading style for every section: the title in white, the subtitle in the
// accent colour (the same teal as "Olembo" in the hero). Rendered inside a section's
// staggerContainer so both lines fade in with the rest of the section.
export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  spacing = 'mb-14',
}: Props) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${spacing}`}>
      <motion.h2
        variants={fadeUp}
        className="font-display font-extrabold text-white text-4xl leading-tight mb-2"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="font-body text-accent text-[15px] font-medium"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
