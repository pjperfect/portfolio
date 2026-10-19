import { assets, type ResponsiveImage } from './assets';

// Every piece of media on the site lives here, so the About slideshow, the Creative Work
// gallery, the Freelance Work cards and the camera-slider page all draw from one list.
// Add an item to the right list below and it appears everywhere it belongs.

/* ------------------------------------------------------------------ */
/* Creative work                                                        */
/* ------------------------------------------------------------------ */

// Order here drives both the filter menu and the order of items in "All".
export const creativeCategories = ['Flyers', 'Video & Motion', 'Live Streams', 'Merch'] as const;

export type CreativeCategory = (typeof creativeCategories)[number];
export type CreativeItem =
  | {
      id: number;
      type: 'image';
      src: ResponsiveImage;
      title: string;
      category: CreativeCategory;
    }
  | {
      id: number;
      type: 'youtube';
      videoId: string;
      title: string;
      thumbnail: string;
      category: CreativeCategory;
    }
  | {
      id: number;
      type: 'video';
      src: string;
      title: string;
      thumbnail?: string;
      category: CreativeCategory;
    };

const { creativeWork: cw } = assets;

export const creativeItems: CreativeItem[] = [
  {
    id: 1,
    type: 'image',
    src: cw.img1,
    title: 'HBD Sis Rita — CEKZ Logistics',
    category: 'Flyers',
  },
  {
    id: 2,
    type: 'image',
    src: cw.img2,
    title: 'HBD Dcn Lotan Salapei — Loveworld SAT',
    category: 'Flyers',
  },
  {
    id: 3,
    type: 'image',
    src: cw.img3,
    title: 'HBD Dcn Lotan — CEKZ Logistics',
    category: 'Flyers',
  },
  {
    id: 4,
    type: 'image',
    src: cw.img4,
    title: 'HBD Sis Shireen — CEKZ Logistics',
    category: 'Flyers',
  },
  {
    id: 5,
    type: 'image',
    src: cw.img5,
    title: 'HBD Pst Matilda Salapei — CEKZ Logistics',
    category: 'Flyers',
  },
  {
    id: 6,
    type: 'image',
    src: cw.img6,
    title: 'HBD Pst Nathania — CEKZ Logistics',
    category: 'Flyers',
  },
  {
    id: 7,
    type: 'image',
    src: cw.img7,
    title: 'HBD Pst Nathania — Special Duty',
    category: 'Flyers',
  },
  {
    id: 8,
    type: 'image',
    src: cw.img8,
    title: 'HBD Baby Keza Salapei — CEKZ Logistics',
    category: 'Flyers',
  },
  {
    id: 9,
    type: 'image',
    src: cw.img9,
    title: 'HBD Bro Sentrix — LTM Radio',
    category: 'Flyers',
  },
  {
    id: 10,
    type: 'image',
    src: cw.img10,
    title: 'HBD Tracy Anyango — From Sis Maureen',
    category: 'Flyers',
  },
  {
    id: 11,
    type: 'image',
    src: cw.img11,
    title: 'Happy Wedding Anniversary',
    category: 'Flyers',
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
    thumbnail: cw.video1Thumb,
    title: 'Sunday Service with Pastor Osagie',
    category: 'Video & Motion',
  },
  {
    id: 18,
    type: 'video',
    src: cw.video2,
    thumbnail: cw.video2Thumb,
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
  {
    id: 20,
    type: 'image',
    src: cw.img12,
    title: 'HBD Bro Sentrix Mususi — Mimshac Senior Cell',
    category: 'Flyers',
  },
  {
    id: 21,
    type: 'image',
    src: cw.img13,
    title: 'HBD Bro Sentrix Mususi — From His Wife',
    category: 'Flyers',
  },
  {
    id: 22,
    type: 'image',
    src: cw.img14,
    title: 'HBD Sis Susan Nyakundi — CEKZ Logistics',
    category: 'Flyers',
  },
  {
    id: 23,
    type: 'image',
    src: cw.img15,
    title: 'HBD Sis Chantelle Wanza',
    category: 'Flyers',
  },
  {
    id: 24,
    type: 'image',
    src: cw.img16,
    title: 'HBD Bro Timothy Mengich — Mimshac Senior Cell',
    category: 'Flyers',
  },
  {
    id: 25,
    type: 'image',
    src: cw.img17,
    title: 'HBD Sis Natasha Mitchell — CEKZ Special Duty',
    category: 'Flyers',
  },
  {
    id: 26,
    type: 'image',
    src: cw.img18,
    title: '60 Mins on the Altar — Mimshac SC Event Flyer',
    category: 'Flyers',
  },
  {
    id: 27,
    type: 'image',
    src: cw.img20,
    title: 'HBD Sis Vanessa Wambui — Mimshac Cell 1',
    category: 'Flyers',
  },
  {
    id: 28,
    type: 'image',
    src: cw.img19,
    title: 'The Lord Jesus at Your Doorstep — Apparel Design',
    category: 'Merch',
  },
];

export const categoryColors: Record<CreativeCategory, string> = {
  Flyers: '#9b59b6',
  'Video & Motion': '#0D7377',
  'Live Streams': '#e67e22',
  Merch: '#c9a227',
};


/* ------------------------------------------------------------------ */
/* Camera slider build photos                                           */
/* ------------------------------------------------------------------ */

export type CaptionedImage = {
  src: ResponsiveImage;
  caption: string;
};

const { cameraSlider } = assets;

export const cameraSliderPhotos: CaptionedImage[] = [
  {
    src: cameraSlider.fig1,
    caption: 'Figure 1 — Motorised Camera Slider Prototype',
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
    caption: 'Figure 6 — Motorised Camera Slider in Operation',
  },
];

/* ------------------------------------------------------------------ */
/* Freelance work                                                       */
/* ------------------------------------------------------------------ */

export const hamdigrillPhotos: CaptionedImage[] = [
      {
        src: assets.gigs.hamdigrill1,
        caption: 'Clean Windows install in progress',
      },
      {
        src: assets.gigs.hamdigrill2,
        caption: 'Install error, ruling out software',
      },
      {
        src: assets.gigs.hamdigrill3,
        caption: 'Terminal stuck on a static display',
      },
      {
        src: assets.gigs.hamdigrill4,
        caption: 'Terminal and camera feed setup',
      },
      { src: assets.gigs.hamdigrill5, caption: 'Dust visible on the screen' },
      {
        src: assets.gigs.hamdigrill6,
        caption: 'The mini PC unit behind the terminal',
      },
      { src: assets.gigs.hamdigrill7, caption: 'Boot menu, SSD detected' },
    ];

export const liveStreamingWorkshopVideo = {
  src: assets.gigs.techConnectClip,
  poster: assets.gigs.techConnectClipThumb,
};

/* ------------------------------------------------------------------ */
/* About slideshow                                                      */
/* ------------------------------------------------------------------ */

type SlideBase = {
  id: string;
  title: string;
  // Short tag shown beside the title, and its colour.
  label: string;
  color: string;
};

export type Slide =
  | (SlideBase & { kind: 'image'; image: ResponsiveImage })
  | (SlideBase & { kind: 'video'; src: string; poster?: string })
  | (SlideBase & { kind: 'youtube'; videoId: string; poster: string });

const CAMERA_SLIDER_COLOR = '#1f6fb2';
const FREELANCE_COLOR = '#1e8449';

const cameraSliderSlides: Slide[] = cameraSliderPhotos.map((photo, i) => ({
  id: `camera-slider-${i + 1}`,
  kind: 'image',
  title: photo.caption,
  label: 'Camera Slider',
  color: CAMERA_SLIDER_COLOR,
  image: photo.src,
}));

const freelanceSlides: Slide[] = [
  ...hamdigrillPhotos.map(
    (photo, i): Slide => ({
      id: `pos-repair-${i + 1}`,
      kind: 'image',
      title: `POS Terminal Repair: ${photo.caption}`,
      label: 'Freelance Work',
      color: FREELANCE_COLOR,
      image: photo.src,
    })
  ),
  {
    id: 'live-streaming-workshop',
    kind: 'video',
    title: 'Live Streaming Workshop',
    label: 'Freelance Work',
    color: FREELANCE_COLOR,
    src: liveStreamingWorkshopVideo.src,
    poster: liveStreamingWorkshopVideo.poster,
  },
];

const toCreativeSlide = (item: CreativeItem): Slide => {
  const base = {
    id: `creative-${item.id}`,
    title: item.title,
    label: item.category,
    color: categoryColors[item.category],
  };
  if (item.type === 'image') return { ...base, kind: 'image', image: item.src };
  if (item.type === 'youtube') {
    return { ...base, kind: 'youtube', videoId: item.videoId, poster: item.thumbnail };
  }
  return { ...base, kind: 'video', src: item.src, poster: item.thumbnail };
};

// Interleaves the groups so each one is spread evenly through the whole list instead of
// appearing in a block. Order inside every group is kept, and each group's first item
// leads, so the show opens with the camera slider.
function spread<T>(groups: T[][]): T[] {
  return groups
    .flatMap((group, g) =>
      group.map((item, i) => ({ item, g, at: i / group.length }))
    )
    .sort((a, b) => a.at - b.at || a.g - b.g)
    .map(({ item }) => item);
}

// All of the portfolio's media, in the order the About slideshow plays it.
export const slides: Slide[] = spread([
  cameraSliderSlides,
  freelanceSlides,
  ...creativeCategories.map((category) =>
    creativeItems.filter((item) => item.category === category).map(toCreativeSlide)
  ),
]);
