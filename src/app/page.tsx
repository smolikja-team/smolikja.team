import { AboutSection, IntroSection, ProjectsSection } from '@/components/sections';

export default function Home() {
  return (
    <div className="scroll-snap-container">
      <IntroSection />
      <ProjectsSection />
      <AboutSection />
    </div>
  );
}

