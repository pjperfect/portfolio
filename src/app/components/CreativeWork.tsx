import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { assets } from '@/config/assets';

type Category = 'All' | 'Fliers' | 'Video & Motion' | 'Live Streams';

type MediaItem =
  | {
      id: number;
      type: 'image';
      src: string;
      title: string;
      category: Exclude<Category, 'All'>;
    }
  | {
      id: number;
      type: 'youtube';
      videoId: string;
      title: string;
      thumbnail: string;
      category: Exclude<Category, 'All'>;
    }
  | {
      id: number;
      type: 'video';
      src: string;
      title: string;
      thumbnail?: string;
      category: Exclude<Category, 'All'>;
    };

const { creativeWork: cw } = assets;

const items: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: cw.img1,
    title: 'HBD Sis Rita — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 2,
    type: 'image',
    src: cw.img2,
    title: 'HBD Dcn Lotan Salapei — Loveworld SAT',
    category: 'Fliers',
  },
  {
    id: 3,
    type: 'image',
    src: cw.img3,
    title: 'HBD Dcn Lotan — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 4,
    type: 'image',
    src: cw.img4,
    title: 'HBD Sis Shireen — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 5,
    type: 'image',
    src: cw.img5,
    title: 'HBD Pst Matilda Salapei — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 6,
    type: 'image',
    src: cw.img6,
    title: 'HBD Pst Nathania — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 7,
    type: 'image',
    src: cw.img7,
    title: 'HBD Pst Nathania — Special Duty',
    category: 'Fliers',
  },
  {
    id: 8,
    type: 'image',
    src: cw.img8,
    title: 'HBD Baby Keza Salapei — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 9,
    type: 'image',
    src: cw.img9,
    title: 'HBD Bro Sentrix — LTM Radio',
    category: 'Fliers',
  },
  {
    id: 10,
    type: 'image',
    src: cw.img10,
    title: 'HBD Tracy Anyango — From Sis Maureen',
    category: 'Fliers',
  },
  {
    id: 11,
    type: 'image',
    src: cw.img11,
    title: 'Happy Wedding Anniversary',
    category: 'Fliers',
  },
  {
    id: 12,
    type: 'youtube',
    videoId: 'GdZIMSt3Cn8',
    title: 'Live Stream — Church Service',
    thumbnail: 'https://img.youtube.com/vi/GdZIMSt3Cn8/hqdefault.jpg',
    category: 'Live Streams',
  },
  {
    id: 13,
    type: 'youtube',
    videoId: 'wqqui8UtDTk',
    title: 'Live Stream — Special Service',
    thumbnail: 'https://img.youtube.com/vi/wqqui8UtDTk/hqdefault.jpg',
    category: 'Live Streams',
  },
  {
    id: 14,
    type: 'youtube',
    videoId: 'zxHXEVZh_Y4',
    title: 'Live Stream — Sunday Service',
    thumbnail: 'https://img.youtube.com/vi/zxHXEVZh_Y4/hqdefault.jpg',
    category: 'Live Streams',
  },
  {
    id: 15,
    type: 'youtube',
    videoId: 'V_aHl2UrGns',
    title: 'Live Stream — Evening Service',
    thumbnail: 'https://img.youtube.com/vi/V_aHl2UrGns/hqdefault.jpg',
    category: 'Live Streams',
  },
  {
    id: 16,
    type: 'youtube',
    videoId: 'Lk48dOjETo0',
    title: 'Live Stream — Special Event',
    thumbnail: 'https://img.youtube.com/vi/Lk48dOjETo0/hqdefault.jpg',
    category: 'Live Streams',
  },
  {
    id: 17,
    type: 'video',
    src: cw.video1,
    title: 'Sunday Service with Pastor Osagie',
    category: 'Video & Motion',
  },
  {
    id: 18,
    type: 'video',
    src: cw.video2,
    title: 'Stay Tuned',
    category: 'Video & Motion',
  },
  {
    id: 19,
    type: 'youtube',
    videoId: 'HVBRa0vL-Q0',
    title: 'Creative Production',
    thumbnail: 'https://img.youtube.com/vi/HVBRa0vL-Q0/hqdefault.jpg',
    category: 'Video & Motion',
  },
];

const tabs: Category[] = ['All', 'Fliers', 'Video & Motion', 'Live Streams'];

const categoryColors: Record<Exclude<Category, 'All'>, string> = {
  Fliers: '#9b59b6',
  'Video & Motion': '#0D7377',
  'Live Streams': '#e67e22',
};

export function CreativeWork() {
  const [active, setActive] = useState<Category>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const filtered =
    active === 'All' ? items : items.filter((i) => i.category === active);

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

  // Move focus into the modal on open, and let Escape / arrow keys drive it while it's open.
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
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display font-extrabold text-white text-4xl text-center mb-3">
          Creative Work
        </h2>
        <p className="font-body text-text text-center mb-10 opacity-80">
          Media production, graphic design and live streaming work.
        </p>

        {/* Filter tabs */}
        <div className="flex justify-start md:justify-center mb-12 overflow-x-auto gap-2.5 pb-2 px-4">
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
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openLightbox(item.id)}
              aria-label={`Open ${item.title}`}
              className="group relative rounded-lg overflow-hidden cursor-pointer aspect-[4/3] bg-bg p-0 border-none text-left block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300"
                />
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
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text opacity-50 font-body pt-10">
            No items in this category yet.
          </p>
        )}
      </div>

      {/* Lightbox */}
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
            className="absolute top-5 right-5 bg-white/10 border-none rounded-full w-10 h-10 flex items-center justify-centertext-white cursor-pointer z-10"
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
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                className="max-w-full max-h-[75vh] rounded-lg object-contain"
              />
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
