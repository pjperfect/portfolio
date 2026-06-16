import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from 'lucide-react';
const BASE = 'https://philip-portfolio-assets.s3.eu-north-1.amazonaws.com';
const img1 = `${BASE}/HBD-SIS-RITA-CEKZ-LOGISTICS.jpg`;
const img2 = `${BASE}/HBD-DCN-LOTAN-CEKZ-LOVEWORLD-SATjpg.jpg`;
const img3 = `${BASE}/HBD-DCN-LOTAN-CEKZ-LOGISTICS-2.jpg`;
const img4 = `${BASE}/HBD-SIS-SHIREEN-CEKZ-LOGISTICS.jpg`;
const img5 = `${BASE}/HBD-PST-MATILDA-CEKZ-LOGISTICS.jpg`;
const img6 = `${BASE}/HBD-PST-NATHANIA-CEKZ-LOGISTICS.jpg`;
const img7 = `${BASE}/HBD-PST-NATHANIA-CEKZ-SPECIAL-DUTY.jpg`;
const img8 = `${BASE}/HBD-BABY-KEZA-SALAPEI-CEKZ-LOGISTICS.jpg`;
const img9 = `${BASE}/HBD-BRO-SENTRIX-LTM_RADIO.jpg`;
const img10 = `${BASE}/HBD-TRACY-ANYANGO-FROM-SIS-MAUREEN.jpg`;
const img11 = `${BASE}/HAPPY-WEDDING-ANNIVERSARY.jpg`;
const video1 = `${BASE}/SUNDAY_SERVICE_WITH_PASTOR_OSAGIE.mp4`;
const video2 = `${BASE}/STAY_TUNED.mp4`;

type Category =
  | 'All'
  | 'Fliers'
  | 'Logos & Branding'
  | 'Video & Motion'
  | 'Live Streams';

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

const items: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: img1,
    title: 'HBD Sis Rita — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 2,
    type: 'image',
    src: img2,
    title: 'HBD Dcn Lotan Salapei — Loveworld SAT',
    category: 'Fliers',
  },
  {
    id: 3,
    type: 'image',
    src: img3,
    title: 'HBD Dcn Lotan — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 4,
    type: 'image',
    src: img4,
    title: 'HBD Sis Shireen — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 5,
    type: 'image',
    src: img5,
    title: 'HBD Pst Matilda Salapei — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 6,
    type: 'image',
    src: img6,
    title: 'HBD Pst Nathania — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 7,
    type: 'image',
    src: img7,
    title: 'HBD Pst Nathania — Special Duty',
    category: 'Fliers',
  },
  {
    id: 8,
    type: 'image',
    src: img8,
    title: 'HBD Baby Keza Salapei — CEKZ Logistics',
    category: 'Fliers',
  },
  {
    id: 9,
    type: 'image',
    src: img9,
    title: 'HBD Bro Sentrix — LTM Radio',
    category: 'Fliers',
  },
  {
    id: 10,
    type: 'image',
    src: img10,
    title: 'HBD Tracy Anyango — From Sis Maureen',
    category: 'Fliers',
  },
  {
    id: 11,
    type: 'image',
    src: img11,
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
    src: video1,
    title: 'Sunday Service with Pastor Osagie',
    category: 'Video & Motion',
  },
  {
    id: 18,
    type: 'video',
    src: video2,
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

const tabs: Category[] = [
  'All',
  'Fliers',
  'Logos & Branding',
  'Video & Motion',
  'Live Streams',
];

const categoryColors: Record<Exclude<Category, 'All'>, string> = {
  Fliers: '#9b59b6',
  'Logos & Branding': '#2980b9',
  'Video & Motion': '#0D7377',
  'Live Streams': '#e67e22',
};

export function CreativeWork() {
  const [active, setActive] = useState<Category>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    active === 'All' ? items : items.filter((i) => i.category === active);

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);
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

  return (
    <section
      id="creative-work"
      style={{ backgroundColor: '#1A2B4A', padding: '96px 24px' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            color: '#FFFFFF',
            fontSize: 36,
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          Creative Work
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#C9D1D9',
            textAlign: 'center',
            marginBottom: 40,
            opacity: 0.8,
          }}
        >
          Media production, graphic design, and live streaming work spanning 6+
          years.
        </p>

        {/* Filter tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 48,
            overflowX: 'auto',
            gap: 10,
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                padding: '8px 18px',
                borderRadius: 100,
                border: '1.5px solid #0D7377',
                backgroundColor: active === tab ? '#0D7377' : 'transparent',
                color: active === tab ? '#fff' : '#0D7377',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gap: 20 }} className="creative-grid">
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'relative',
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '4/3',
                backgroundColor: '#0D1117',
              }}
              onClick={() => openLightbox(item.id)}
              className="creative-card"
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s',
                  }}
                />
              ) : item.type === 'youtube' ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s',
                  }}
                />
              ) : (
                <video
                  src={item.src}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  preload="metadata"
                />
              )}
              <span
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  padding: '3px 10px',
                  borderRadius: 100,
                  backgroundColor: categoryColors[item.category],
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {item.category}
              </span>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                  gap: 8,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)')
                }
              >
                <ZoomIn size={28} color="#fff" />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              color: '#C9D1D9',
              opacity: 0.5,
              fontFamily: "'Inter', sans-serif",
              paddingTop: 40,
            }}
          >
            No items in this category yet.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.92)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            style={{
              position: 'absolute',
              left: 20,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(720px, 90vw)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {lightboxItem.type === 'image' ? (
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  borderRadius: 8,
                  objectFit: 'contain',
                }}
              />
            ) : lightboxItem.type === 'youtube' ? (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${lightboxItem.videoId}?autoplay=1`}
                  title={lightboxItem.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: 'block' }}
                />
              </div>
            ) : (
              <video
                src={lightboxItem.src}
                controls
                autoPlay
                style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: 8 }}
              />
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            style={{
              position: 'absolute',
              right: 20,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <style>{`
        .creative-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 1023px) { .creative-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 767px) { .creative-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
