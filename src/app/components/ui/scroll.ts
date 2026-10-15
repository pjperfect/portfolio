// Animated in-page scrolling.
//
// The browser's own `behavior: 'smooth'` is skipped whenever smooth scrolling
// is switched off in the browser or the OS (Windows "Animation effects", the
// Chrome/Brave smooth-scrolling flag), and the page then jumps. This drives
// the scroll itself, so it animates the same way everywhere.

const MIN_DURATION = 600;
const MAX_DURATION = 1100;
const BASE_DURATION = 500;
const MS_PER_PX = 0.3;

const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
]);

const INTERRUPT_EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clampY = (y: number) =>
  Math.max(0, Math.min(y, document.documentElement.scrollHeight - window.innerHeight));

let stopActive: (() => void) | null = null;

function animateTo(getTargetY: () => number) {
  stopActive?.();

  const from = window.scrollY;
  const distance = Math.abs(clampY(getTargetY()) - from);
  if (distance < 2) return;

  const duration = Math.min(
    MAX_DURATION,
    Math.max(MIN_DURATION, BASE_DURATION + distance * MS_PER_PX)
  );
  const startTime = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    INTERRUPT_EVENTS.forEach((type) =>
      window.removeEventListener(type, onInterrupt)
    );
    if (stopActive === stop) stopActive = null;
  };

  // Hand control back as soon as the visitor scrolls, touches or presses a
  // scroll key, so the animation never fights them.
  function onInterrupt(event: Event) {
    if (event.type === 'keydown' && !SCROLL_KEYS.has((event as KeyboardEvent).key))
      return;
    stop();
  }

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    // The target is re-read every frame, so images loading or sections
    // animating in above it can't make the scroll land in the wrong place.
    const target = clampY(getTargetY());
    window.scrollTo({
      top: from + (target - from) * easeInOutCubic(progress),
      left: 0,
      behavior: 'instant',
    });
    if (progress < 1) frame = requestAnimationFrame(step);
    else stop();
  };

  INTERRUPT_EVENTS.forEach((type) =>
    window.addEventListener(type, onInterrupt, { passive: true })
  );
  stopActive = stop;
  frame = requestAnimationFrame(step);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  animateTo(() => {
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    return el.getBoundingClientRect().top + window.scrollY - margin;
  });
}

export function scrollToTop() {
  animateTo(() => 0);
}
