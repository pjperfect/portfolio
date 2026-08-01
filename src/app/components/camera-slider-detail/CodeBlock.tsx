import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { DetailSection } from './DetailSection';

const code = `#include <Stepper.h>
const int stepsPerRevolution = 200;
Stepper myStepper(stepsPerRevolution, 4, 3, 7, 8);
int Pin10 = 10;
bool s10;

void setup() {
  pinMode(Pin10, INPUT);
}

void loop() {
  s10 = digitalRead(Pin10);
  int sensorReading = analogRead(A0);
  int motorSpeed = map(sensorReading, 0, 1023, 0, 100);

  if (motorSpeed > 0) {
    myStepper.setSpeed(motorSpeed);
    if (s10 == LOW)  { myStepper.step(-stepsPerRevolution / 100); }
    if (s10 == HIGH) { myStepper.step( stepsPerRevolution / 100); }
  }
}`;

export function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DetailSection bg="bg">
      <h2 className="font-display font-extrabold text-white text-[32px] mb-5">The Code</h2>
      <div className="relative bg-bg border border-accent/30 rounded-lg p-6 overflow-auto">
        <button
          onClick={copyCode}
          className={`absolute top-4 right-4 border border-accent rounded-md px-3 py-1.5 text-white font-body text-xs cursor-pointer flex items-center gap-1.5 transition-all duration-200 ${
            copied ? 'bg-accent' : 'bg-accent/20'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre className="font-mono text-sm text-text m-0 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
      <p className="font-body text-[13px] text-text mt-3 italic opacity-70">
        Full Arduino sketch — stepper motor direction and speed control via potentiometer and
        limit switch.
      </p>
    </DetailSection>
  );
}
