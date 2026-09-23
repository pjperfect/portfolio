import { motion } from 'motion/react';
import { Tag } from './ui/Tag';
import { assets, type ResponsiveImage } from '@/config/assets';
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
    client: 'Hamdigrill Restaurant, South C, Nairobi',
    date: '5th - 7th August 2026',
    desc: `
    • Called in after a POS terminal stopped progressing past the welcome screen following login.
    • Tried a Windows reset first. It failed, which pointed to a hardware fault rather than a software one, so I did a clean Windows 10 install and had the POS software reinstalled to confirm.
    • Traced the real cause to dust buildup inside the unit. A friend opened it up and cleared it out and the terminal came back to normal.
    • Found the job through a contact at a broadcasting station I'd approached about a Software Engineering role, who connected me with the restaurant.`,
    tags: ['Hardware Diagnostics', 'Windows', 'POS Systems', 'Troubleshooting'],
    photos: [
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
    ],
  },
  {
    title: 'Live Streaming Workshop',
    client: 'Tech Connect Media Bootcamp, Christ Embassy Kenya HQ, Nairobi',
    date: '20th - 21st February 2026',
    desc: `
    • Led a session on live streaming, covering why it matters and the basics of getting a stream running.
    • Session was streamed live on YouTube.`,
    tags: ['Live Streaming', 'Public Speaking', 'Workshop Facilitation'],
    video: { src: assets.gigs.techConnectClip },
  },
];

function GigCard({ title, client, date, desc, tags, photos, video }: Gig) {
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
        <div className="flex gap-3 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
          {photos.map((photo) => (
            <div
              key={photo.caption}
              className="flex-shrink-0 w-32 h-24 rounded-md overflow-hidden bg-surface"
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
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          ))}
        </div>
      )}
      {video && (
        <div className="rounded-md overflow-hidden mb-4 bg-surface">
          <video
            src={video.src}
            poster={video.poster}
            controls
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
    </div>
  );
}

export function Gigs() {
  return (
    <section id="gigs" className="bg-surface px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="max-w-[1280px] mx-auto"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display font-extrabold text-white text-4xl text-center mb-2"
        >
          Gigs
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-body text-text text-center mb-16 opacity-70 text-[15px]"
        >
          Small freelance jobs outside the day-to-day
        </motion.p>

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
