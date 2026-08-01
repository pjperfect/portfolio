import { DetailSection } from './DetailSection';
import { assets } from '@/config/assets';

const { cameraSlider } = assets;

const photos = [
  {
    src: cameraSlider.fig1,
    caption: 'Figure 1 — Motorized Camera Slider Prototype',
  },
  {
    src: cameraSlider.fig2,
    caption: 'Figure 2 — Electronics Enclosure Under Sliding Platform',
  },
  { src: cameraSlider.fig3, caption: 'Figure 3 — NEMA 17 Drive System Detail' },
  {
    src: cameraSlider.fig4,
    caption: 'Figure 4 — Camera Carriage and Belt Attachment',
  },
  {
    src: cameraSlider.fig5,
    caption: 'Figure 5 — Arduino-Based Slider Control Circuit',
  },
  {
    src: cameraSlider.fig6,
    caption: 'Figure 6 — Motorized Camera Slider in Operation',
  },
];

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
            <img
              src={src}
              alt={caption}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
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
