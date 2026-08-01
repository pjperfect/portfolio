import { DetailSection } from './DetailSection';

const cards = [
  {
    title: 'Speed Control',
    description:
      'A 10kΩ potentiometer reads an analogue voltage (0–5V) mapped to motor speed (0–100 RPM). The user turns the dial to control how fast the camera slides.',
  },
  {
    title: 'Direction Control',
    description:
      'A limit switch on Pin 10 of the Arduino reads HIGH or LOW. When LOW, the motor steps in the negative direction. When HIGH, it steps in the positive direction — creating the back-and-forth sliding motion.',
  },
  {
    title: 'Motor Drive',
    description:
      'The NEMA 17 bipolar stepper motor (1.8° step angle, 200 steps/revolution) is driven via an A4988 stepper driver powered by a 12V battery pack. The Arduino sends step and direction signals to the driver over 2 pins.',
  },
];

export function HowItWorks() {
  return (
    <DetailSection bg="bg">
      <h2 className="font-display font-extrabold text-white text-[32px] mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-surface border-t-[3px] border-accent rounded-lg p-6">
            <h3 className="font-display font-bold text-white text-lg mb-3">{card.title}</h3>
            <p className="font-body text-text text-sm leading-[1.7]">{card.description}</p>
          </div>
        ))}
      </div>
    </DetailSection>
  );
}
