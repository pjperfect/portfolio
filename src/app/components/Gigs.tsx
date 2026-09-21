import { Tag } from './ui/Tag';

type Gig = {
  title: string;
  client: string;
  date: string;
  desc: string;
  tags: string[];
};

const gigs: Gig[] = [
  {
    title: 'POS Terminal Repair',
    client: 'Hamdigrill Restaurant, South C, Nairobi',
    date: '5th - 7th August 2026',
    desc: `
    • Called in after a POS terminal stopped progressing past the welcome screen following login.
    • Tried a Windows reset first. It failed, which pointed to a hardware fault rather than a software one, so I did a clean Windows 10 install and had the POS software reinstalled to confirm.
    • Traced the real cause to dust buildup inside the unit. A friend opened it up and cleared it out, and the terminal came back to normal.
    • Found the job through a contact at a broadcasting station I'd approached about a Software Engineering role, who connected me with the restaurant.`,
    tags: ['Hardware Diagnostics', 'Windows', 'POS Systems', 'Troubleshooting'],
  },
];

function GigCard({ title, client, date, desc, tags }: Gig) {
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
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Tag key={tag} variant="outline" className="px-2.5 py-[3px] text-[11px]">
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
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display font-extrabold text-white text-4xl text-center mb-2">
          Gigs
        </h2>
        <p className="font-body text-text text-center mb-16 opacity-70 text-[15px]">
          Small freelance jobs outside the day-to-day
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gigs.map((g) => (
            <GigCard key={g.title + g.client} {...g} />
          ))}
        </div>
      </div>
    </section>
  );
}
