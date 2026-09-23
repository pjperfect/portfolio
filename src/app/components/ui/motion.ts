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
  amount: 'some',
  margin: '0px 0px -10% 0px',
} as const;
