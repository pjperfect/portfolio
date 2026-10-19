import { useState } from 'react';
import { motion } from 'motion/react';
import { ZoomIn } from 'lucide-react';
import { Tag } from './ui/Tag';
import { PhotoLightbox } from './ui/PhotoLightbox';
import { SectionHeading } from './ui/SectionHeading';
import type { ResponsiveImage } from '@/config/assets';
import { hamdigrillPhotos, liveStreamingWorkshopVideo } from '@/config/media';
import { fadeUp, staggerContainer, viewportOnce } from './ui/motion';

type GigPhoto = {
  src: ResponsiveImage;
  caption: string;
};

type GigVideo = {
  src: string;
  poster?: string;
};

type Gig = {
  title: string;
  client: string;
  date: string;
  desc: string;
  tags: string[];
  photos?: GigPhoto[];
  video?: GigVideo;
};

const gigs: Gig[] = [
  {
    title: 'POS Terminal Repair',
    client: 'HamdiGrill Restaurant, South C, Nairobi, Kenya',
    date: '5th - 7th August 2026',
    desc: `
    • POS terminal stopped progressing past the welcome screen following login.
    •	Ruled out software first: a Windows reset failed, pointing to a hardware fault, proceeded with a clean Windows 10 install.
    •	Traced the real cause to dust buildup inside the unit. Opened up the CPU and cleared out the dust, resulting in the terminal working normally.`,
    tags: ['Hardware Diagnostics', 'Windows', 'POS Systems', 'Troubleshooting'],
    photos: hamdigrillPhotos,
  },
  {
    title: 'Live Streaming Workshop',
    client:
      'Tech Connect Media Bootcamp, Christ Embassy Intl (Believers’ LoveWorld), Nairobi, Kenya',
    date: '20th - 21st February 2026',
    desc: `
    • Led a session on live streaming, covering why it matters and the basics of getting a stream running.
    • Session was streamed live with an onsite attendance of over 100 and an online viewership of over 500.`,
    tags: ['Live Streaming', 'Public Speaking', 'Workshop Facilitation'],
    video: liveStreamingWorkshopVideo,
  },
];

function GigCard({ title, client, date, desc, tags, photos, video }: Gig) {
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);

  return (
    <div className="bg-bg rounded-lg px-6 pt-6 pb-5 border-t-[3px] border-accent transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(13,115,119,0.2)]">
      <h3 className="font-display font-bold text-white text-lg mb-1 leading-[1.3]">
        {title}
      </h3>
      <p className="font-body text-accent text-xs mb-3 font-medium">
        {client} · {date}
      </p>
      <p className="font-body text-text text-sm leading-[1.7] mb-4 opacity-85 whitespace-pre-line">
        {desc.trim()}
      </p>
      {photos && photos.length > 0 && (
        <div className="scrollbar-thin flex gap-3 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
          {photos.map((photo, i) => (
            <button
              key={photo.caption}
              type="button"
              onClick={() => setOpenPhoto(i)}
              aria-label={`View larger: ${photo.caption}`}
              className="group relative flex-shrink-0 w-32 h-24 rounded-md overflow-hidden bg-surface p-0 border-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={photo.src.srcSet}
                  sizes="128px"
                />
                <img
                  src={photo.src.fallback}
                  alt={photo.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </picture>
              <span className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/35 group-focus-visible:bg-black/35" />
              <span className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white">
                <ZoomIn size={13} aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      )}
      {video && (
        <div className="rounded-md overflow-hidden mb-4 bg-surface">
          <video
            src={video.src}
            poster={video.poster}
            controls
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            preload="none"
            playsInline
            className="w-full max-h-[280px] rounded-md"
          >
            Your browser doesn't support embedded video.
          </video>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Tag
            key={tag}
            variant="outline"
            className="px-2.5 py-[3px] text-[11px]"
          >
            {tag}
          </Tag>
        ))}
      </div>

      {photos && openPhoto !== null && (
        <PhotoLightbox
          photos={photos}
          index={openPhoto}
          onChange={setOpenPhoto}
          onClose={() => setOpenPhoto(null)}
        />
      )}
    </div>
  );
}

export function Gigs() {
  return (
    <section id="freelance" className="bg-surface px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="max-w-[1280px] mx-auto"
      >
        <SectionHeading
          title="Freelance Work"
          subtitle="Small jobs outside the day-to-day"
          spacing="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {gigs.map((g) => (
            <motion.div key={g.title + g.client} variants={fadeUp}>
              <GigCard {...g} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
