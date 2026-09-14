import FloatingLanguageSwitcher from '@/components/FloatingLanguageSwitcher';
import FloatingLogo from '@/components/FloatingLogo';
import LanguageProvider from '@/components/providers/LanguageProvider';
import { AboutSection, CapabilitiesSection, IntroSection, ProjectsSection } from '@/components/sections';

export default function Home() {
  return (
    <LanguageProvider>
      <a href="#main-content" className="skip-link">
        Přejít k obsahu / Skip to content
      </a>
      <FloatingLogo />
      <FloatingLanguageSwitcher />
      <main id="main-content" className="page-shell">
        <IntroSection />
        <ProjectsSection />
        <CapabilitiesSection />
        <AboutSection />
      </main>
    </LanguageProvider>
  );
}
