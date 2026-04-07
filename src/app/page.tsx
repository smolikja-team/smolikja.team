import FloatingLanguageSwitcher from '@/components/FloatingLanguageSwitcher';
import GalaxyBackground from '@/components/GalaxyBackground';
import LanguageProvider from '@/components/providers/LanguageProvider';
import { AboutSection, CapabilitiesSection, IntroSection, ProjectsSection } from '@/components/sections';

export default function Home() {
  return (
    <LanguageProvider>
      <GalaxyBackground />
      <FloatingLanguageSwitcher />
      <div className="page-shell">
        <IntroSection />
        <ProjectsSection />
        <CapabilitiesSection />
        <AboutSection />
      </div>
    </LanguageProvider>
  );
}
