import { DetailSection } from './DetailSection';
import { Tag } from '../ui/Tag';

const software = ['Arduino IDE', 'C++ (Stepper.h library)', 'Multisim (circuit simulation)', 'AutoCAD (virtual design)'];

const hardware = [
  'Arduino Nano',
  'NEMA 17 Stepper Motor',
  'A4988 Stepper Driver',
  '10kΩ Potentiometer',
  'Limit Switch',
  'GT2 Timing Belt & Pulleys',
  '22mm Copper Pipes (1m × 2)',
  'MDF Wood frame',
  '12V AA Battery Pack',
];

function TechCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-bg border-t-[3px] border-accent rounded-lg p-7">
      <h3 className="font-display font-bold text-accent text-base mb-5">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Tag key={item} variant="outline">
            {item}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <DetailSection bg="surface">
      <h2 className="font-display font-extrabold text-white text-[32px] mb-10">
        Tech Stack & Components
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TechCard title="Software" items={software} />
        <TechCard title="Hardware" items={hardware} />
      </div>
    </DetailSection>
  );
}
