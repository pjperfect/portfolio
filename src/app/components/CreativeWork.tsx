import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import {
  creativeCategories as categories,
  creativeItems as items,
  categoryColors,
  type CreativeCategory as ItemCategory,
  type CreativeItem as MediaItem,
} from '@/config/media';
import { SectionHeading } from './ui/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from './ui/motion';

type Category = 'All' | ItemCategory;

const tabs: Category[] = ['All', ...categories];

// Group items by category in menu order. Sort is stable, so items keep their
// relative order inside each category and new entries can go anywhere above.
const orderedItems: MediaItem[] = [...items].sort(
  (a, b) => categories.indexOf(a.category) - categories.indexOf(b.category)
);

export function CreativeWork() {
  const [active, setActive] = useState<Category>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const filtered =
    active === 'All'
      ? orderedItems
      : orderedItems.filter((i) => i.category === active);

  const openLightbox = (id: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setLightbox(id);
  };
  const closeLightbox = () => {
    setLightbox(null);
    lastFocusedRef.current?.focus();
  };
  const prev = () => {
    if (lightbox === null) return;
    const idx = filtered.findIndex((i) => i.id === lightbox);
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length].id);
  };
  const next = () => {
    if (lightbox === null) return;
    const idx = filtered.findIndex((i) => i.id === lightbox);
    setLightbox(filtered[(idx + 1) % filtered.length].id);
  };

  const lightboxItem =
    lightbox !== null ? items.find((i) => i.id === lightbox) : null;

  useEffect(() => {
    if (!lightboxItem) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxItem]);

  return (
    <section id="creative-work" className="bg-surface px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="max-w-[1280px] mx-auto"
      >
        <SectionHeading
          title="Creative Work"
          subtitle="Media production, graphic design and live streaming work"
          spacing="mb-10"
        />

        <motion.div
          variants={fadeUp}
          className="flex justify-start md:justify-center mb-12 overflow-x-auto gap-2.5 pb-2 px-4"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-[18px] py-2 rounded-full border-[1.5px] border-accent font-body text-[13px] font-medium cursor-pointer whitespace-nowrap transition-all duration-200 ${
                active === tab
                  ? 'bg-accent text-white'
                  : 'bg-transparent text-accent'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openLightbox(item.id)}
              aria-label={`Open ${item.title}`}
              className="group relative rounded-lg overflow-hidden cursor-pointer aspect-[4/3] bg-bg p-0 border-none text-left block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {item.type === 'image' ? (
                <picture>
                  <source
                    type="image/webp"
                    srcSet={item.src.srcSet}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <img
                    src={item.src.fallback}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </picture>
              ) : item.type === 'youtube' ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              ) : (
                <video
                  src={item.src}
                  poster={item.thumbnail}
                  className="w-full h-full object-cover"
                  preload="none"
                  muted
                  playsInline
                />
              )}
              <span
                className="absolute top-2.5 left-2.5 px-2.5 py-[3px] rounded-full text-white font-body text-[11px] font-semibold"
                style={{ backgroundColor: categoryColors[item.category] }}
              >
                {item.category}
              </span>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 transition-colors duration-200 group-hover:bg-black/60 group-focus-visible:bg-black/60">
                <ZoomIn size={28} className="text-white" />
              </div>
            </button>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-text opacity-50 font-body pt-10">
            No items in this category yet.
          </p>
        )}
      </motion.div>

      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          className="fixed inset-0 bg-black/[0.92] z-[200] flex items-center justify-center p-6"
          onClick={closeLightbox}
        >
          <button
            ref={closeButtonRef}
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-5 right-5 bg-white/10 border-none rounded-full w-10 h-10 flex items-center justify-center text-white cursor-pointer z-10"
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous item"
            className="absolute left-5 bg-white/10 border-none rounded-full w-11 h-11 flex items-center justify-center text-white cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[min(720px,90vw)] flex flex-col items-center gap-4"
          >
            {lightboxItem.type === 'image' ? (
              <picture>
                <source
                  type="image/webp"
                  srcSet={lightboxItem.src.srcSet}
                  sizes="min(720px, 90vw)"
                />
                <img
                  src={lightboxItem.src.fallback}
                  alt={lightboxItem.title}
                  className="max-w-full max-h-[75vh] rounded-lg object-contain"
                />
              </picture>
            ) : lightboxItem.type === 'youtube' ? (
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${lightboxItem.videoId}?autoplay=1`}
                  title={lightboxItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="block border-0"
                />
              </div>
            ) : (
              <video
                src={lightboxItem.src}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[75vh] rounded-lg"
              />
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next item"
            className="absolute right-5 bg-white/10 border-none rounded-full w-11 h-11 flex items-center justify-center text-white cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}
