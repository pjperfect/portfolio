// Shared "flows in" scroll-reveal variants, originally defined inline in
// About.tsx and now shared so every section animates in consistently.
//
// Usage:
//   <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={staggerContainer}>
//     <motion.h2 variants={fadeUp}>...</motion.h2>
//     <motion.div variants={staggerContainer}>          // nested stagger group (e.g. a card grid)
//       <motion.div variants={fadeUp}>...</motion.div>  // each card
//     </motion.div>
//   </motion.div>
//
// Only the outermost wrapper of a section needs initial/whileInView/viewport;
// nested motion elements pick up the "show" state automatically as long as
// they use these same variants.
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const viewportOnce = {
  once: true,
  amount: 'some', // any pixel visible triggers it, safe for tall sections
  margin: '0px 0px -10% 0px', // wait until the top is a bit inside the screen so the reveal is visible
} as const;
