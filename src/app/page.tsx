import FloatingLanguageSwitcher from '@/components/FloatingLanguageSwitcher';
import LanguageProvider from '@/components/providers/LanguageProvider';
import { AboutSection, IntroSection, ProjectsSection } from '@/components/sections';

export default function Home() {
  return (
    <LanguageProvider>
      <FloatingLanguageSwitcher />
      <div className="scroll-snap-container">
        <IntroSection />
        <ProjectsSection />
        <AboutSection />
      </div>
    </LanguageProvider>
  );
}
