import { DetailSection } from './DetailSection';

export function ProblemSection() {
  return (
    <DetailSection bg="bg">
      <h2 className="font-display font-extrabold text-white text-[32px] mb-5">The Problem</h2>
      <p className="font-body text-text text-base leading-[1.8] max-w-[900px]">
        During the COVID-19 pandemic, lecturers were forced to move education online but existing
        software solutions couldn't replicate the natural experience of a lecturer writing
        equations on a blackboard. Manual camera handling was impractical. A low-cost, automated
        camera tracking solution was needed — accessible to educational institutions, not just
        film professionals.
      </p>
    </DetailSection>
  );
}

export function SolutionSection() {
  return (
    <DetailSection bg="surface">
      <h2 className="font-display font-extrabold text-white text-[32px] mb-5">The Solution</h2>
      <p className="font-body text-text text-base leading-[1.8] max-w-[900px]">
        A 1-metre motorised camera slider built from copper pipes, MDF wood, a NEMA 17 stepper
        motor, and an Arduino Nano. The slider moves the camera back and forth along the rail at
        variable speed, controlled by a potentiometer. Direction is managed by a limit switch.
        Speed is mapped from an analogue sensor input (0–1023) to a motor speed range (0–100 RPM).
        The entire build cost approximately $200 — deliberately designed to be affordable and
        replicable by any educational institution.
      </p>
    </DetailSection>
  );
}
