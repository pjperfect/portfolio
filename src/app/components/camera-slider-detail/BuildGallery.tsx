import { DetailSection } from './DetailSection';
import { cameraSliderPhotos as photos } from '@/config/media';

export function BuildGallery() {
  return (
    <DetailSection bg="surface">
      <h2 className="font-display font-extrabold text-white text-[32px] mb-10">
        Build Gallery
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {photos.map(({ src, caption }, index) => (
          <div
            key={caption}
            className="min-w-[320px] h-60 rounded-lg overflow-hidden relative flex-shrink-0"
          >
            <picture>
              <source type="image/webp" srcSet={src.srcSet} sizes="320px" />
              <img
                src={src.fallback}
                alt={caption}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </picture>
            <div
              className="absolute bottom-0 left-0 right-0 px-3 pt-4 pb-3"
              style={{
                background:
                  'linear-gradient(to top, rgba(13,17,23,0.85) 0%, transparent 100%)',
              }}
            >
              <p className="font-body text-xs text-text m-0">{caption}</p>
            </div>
          </div>
        ))}
      </div>
    </DetailSection>
  );
}
