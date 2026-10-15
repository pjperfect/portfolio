import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ResponsiveImage } from '@/config/assets';

export type LightboxPhoto = {
  src: ResponsiveImage;
  caption: string;
};

type Props = {
  photos: LightboxPhoto[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

const roundButton =
  'bg-white/10 border-none rounded-full flex items-center justify-center text-white cursor-pointer transition-colors duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-light';

export function PhotoLightbox({ photos, index, onChange, onClose }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];
  const hasSeveral = photos.length > 1;

  // Focus the close button on open and give focus back to the thumbnail on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => opener?.focus();
  }, []);

  useEffect(() => {
    const step = (delta: number) =>
      onChange((index + delta + photos.length) % photos.length);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (hasSeveral && e.key === 'ArrowLeft') step(-1);
      else if (hasSeveral && e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, photos.length, hasSeveral, onChange, onClose]);

  const go = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    onChange((index + delta + photos.length) % photos.length);
  };

  // Portal to <body> so a transformed ancestor (the card's hover lift) can't
  // trap this fixed overlay inside the card.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/[0.92] p-6"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close"
        className={`absolute top-5 right-5 z-10 h-10 w-10 ${roundButton}`}
      >
        <X size={20} />
      </button>

      {hasSeveral && (
        <button
          onClick={(e) => go(e, -1)}
          aria-label="Previous photo"
          className={`absolute left-3 z-10 h-11 w-11 sm:left-5 ${roundButton}`}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="m-0 flex w-[min(960px,92vw)] flex-col items-center gap-3"
      >
        <picture>
          <source
            type="image/webp"
            srcSet={photo.src.srcSet}
            sizes="(min-width: 1024px) 960px, 92vw"
          />
          <img
            key={photo.caption}
            src={photo.src.fallback}
            alt={photo.caption}
            className="block h-auto max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
          />
        </picture>
        <figcaption className="text-center font-body text-sm text-white/80">
          {photo.caption}
          {hasSeveral && (
            <span className="ml-2 text-white/50">
              {index + 1} / {photos.length}
            </span>
          )}
        </figcaption>
      </figure>

      {hasSeveral && (
        <button
          onClick={(e) => go(e, 1)}
          aria-label="Next photo"
          className={`absolute right-3 z-10 h-11 w-11 sm:right-5 ${roundButton}`}
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>,
    document.body
  );
}
