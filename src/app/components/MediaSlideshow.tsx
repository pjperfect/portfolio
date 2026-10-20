import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type RefObject,
  type TouchEvent,
} from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { slides, type Slide } from '@/config/media';

const INTERVAL_MS = 5000;
// Slides within this distance of the current one stay mounted, so the next image has
// already loaded by the time it slides in. Everything further away is unmounted.
const RENDER_RANGE = 2;
const SWIPE_PX = 50;
const IMAGE_SIZES = '(min-width: 768px) 540px, 100vw';

// Where slide i sits relative to the current one, going the short way round the loop,
// so the last slide sits directly before the first.
function offsetFrom(i: number, current: number, total: number) {
  let d = i - current;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

function useInView<T extends Element>(ref: RefObject<T>) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function useDocumentHidden() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return hidden;
}

const arrowButton =
  'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-black/50 text-white backdrop-blur transition-colors duration-200 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-light';

function SlideMedia({
  slide,
  active,
  playing,
  onPlay,
}: {
  slide: Slide;
  active: boolean;
  playing: boolean;
  onPlay: () => void;
}) {
  if (slide.kind === 'image') {
    return (
      <picture className="block h-full w-full">
        <source type="image/webp" srcSet={slide.image.srcSet} sizes={IMAGE_SIZES} />
        <img
          src={slide.image.fallback}
          alt={slide.title}
          decoding="async"
          draggable={false}
          className="h-full w-full object-contain"
        />
      </picture>
    );
  }

  if (playing && active) {
    return slide.kind === 'video' ? (
      <video
        src={slide.src}
        poster={slide.poster}
        controls
        autoPlay
        playsInline
        controlsList="nodownload"
        className="h-full w-full bg-black object-contain"
      />
    ) : (
      <iframe
        src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1`}
        title={slide.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="block h-full w-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      tabIndex={active ? 0 : -1}
      aria-label={`Play ${slide.title}`}
      className="group relative block h-full w-full cursor-pointer border-none bg-black p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-light"
    >
      {slide.poster && (
        <img
          src={slide.poster}
          alt=""
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
      )}
      <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-200 group-hover:bg-black/40">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_4px_20px_rgba(13,115,119,0.5)] transition-transform duration-200 group-hover:scale-105">
          <Play size={24} fill="currentColor" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

export function MediaSlideshow() {
  const total = slides.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const reducedMotion = usePrefersReducedMotion();
  const inView = useInView(rootRef);
  const tabHidden = useDocumentHidden();

  // Visitors who ask for reduced motion (many Windows laptops report it when animation
  // effects or battery saver are on) still get the timer. Slides swap instantly instead of
  // sliding, and the pause button stays available.
  const autoplay = total > 1;
  const paused =
    !autoplay ||
    userPaused ||
    hovered ||
    playingId !== null ||
    !inView ||
    tabHidden;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + total) % total),
    [total]
  );

  // A video that was playing stops when the slide changes.
  useEffect(() => {
    setPlayingId(null);
  }, [index]);

  // The countdown restarts after every change, including manual ones.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => go(1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  if (total === 0) return null;
  const current = slides[index];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Arrow keys belong to the video's own controls while one is focused.
    if ((e.target as HTMLElement).closest('video, iframe')) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) >= SWIPE_PX) go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Portfolio media"
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      className="w-full"
    >
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative aspect-[4/3] touch-pan-y overflow-hidden rounded-xl border border-accent/25 bg-bg shadow-[0_8px_40px_rgba(13,115,119,0.18)]"
      >
        {slides.map((slide, i) => {
          const offset = offsetFrom(i, index, total);
          if (Math.abs(offset) > RENDER_RANGE) return null;
          const active = offset === 0;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={!active}
              className={`absolute inset-0 ${
                reducedMotion ? '' : 'transition-transform duration-500 ease-out'
              }`}
              style={{ transform: `translateX(${offset * 100}%)` }}
            >
              <SlideMedia
                slide={slide}
                active={active}
                playing={playingId === slide.id}
                onPlay={() => setPlayingId(slide.id)}
              />
            </div>
          );
        })}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className={`${arrowButton} left-3`}
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className={`${arrowButton} right-3`}
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Countdown to the next slide. It restarts with every slide and while resuming. */}
      <div
        aria-hidden="true"
        className="mt-3 h-0.5 overflow-hidden rounded bg-white/10"
      >
        {!paused && (
          <div
            key={index}
            className="animate-slide-progress h-full w-full bg-accent"
            style={
              { '--slide-progress-duration': `${INTERVAL_MS}ms` } as CSSProperties
            }
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="shrink-0 rounded-full px-2.5 py-[3px] font-body text-[11px] font-semibold text-white"
            style={{ backgroundColor: current.color }}
          >
            {current.label}
          </span>
          <p
            title={current.title}
            aria-live={autoplay && !userPaused ? 'off' : 'polite'}
            className="truncate font-body text-[13px] text-text"
          >
            {current.title}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="font-body text-xs tabular-nums text-text-dim">
            {index + 1} / {total}
          </span>
          {autoplay && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-accent/40 bg-transparent text-accent transition-colors duration-200 hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-light"
            >
              {userPaused ? (
                <Play size={13} fill="currentColor" aria-hidden="true" />
              ) : (
                <Pause size={13} fill="currentColor" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
