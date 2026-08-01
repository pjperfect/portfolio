import { HeroBlock } from './HeroBlock';
import { ProblemSection, SolutionSection } from './ProblemSolution';
import { HowItWorks } from './HowItWorks';
import { TechStack } from './TechStack';
import { CodeBlock } from './CodeBlock';
import { BuildGallery } from './BuildGallery';
import { ProjectDetails } from './ProjectDetails';
import { BackNav } from './BackNav';

export function CameraSliderDetail() {
  return (
    <div className="bg-bg min-h-screen pt-16">
      <HeroBlock />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <TechStack />
      <CodeBlock />
      <BuildGallery />
      <ProjectDetails />
      <BackNav />
    </div>
  );
}
