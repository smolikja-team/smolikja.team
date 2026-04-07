'use client';

import ProjectCarousel from '@/components/ProjectCarousel';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { projects } from '@/lib/projects';
import type { Language } from '@/types';

type ProjectsCopy = {
  kicker: string;
  heading: string;
  lead: string;
  moreLabel: string;
};

const PROJECTS_COPY: Record<Language, ProjectsCopy> = {
  cs: {
    kicker: 'Vybrané projekty',
    heading: 'Ukázky produktů, kde je UX i technická logika součástí jednoho delivery systému.',
    lead:
      'Od komunitního produktu po klientské a provozní aplikace. Každá case study ukazuje jiný typ odpovědnosti, kontextu a návrhového přístupu.',
    moreLabel: 'Více informací',
  },
  en: {
    kicker: 'Selected work',
    heading: 'Products where UX thinking and technical delivery stay in the same system.',
    lead:
      'From in-house product work to client and operational apps. Each case study reflects a different delivery context, level of responsibility, and interaction model.',
    moreLabel: 'More context',
  },
};

export default function ProjectsSection() {
  const { language } = useLanguage();
  const copy = PROJECTS_COPY[language];

  return (
    <section id="projects" className="section section-projects">
      <div className="content-wrapper">
        <div className="section-heading">
          <p className="section-kicker">{copy.kicker}</p>
          <h2 className="section-title">{copy.heading}</h2>
          <p className="section-lead">{copy.lead}</p>
        </div>

        <div className="project-list">
          {projects.map((project, index) => {
            const projectTitle = project.title[language];
            const projectEyebrow = project.eyebrow?.[language];
            const secondaryDescription = project.secondaryDescription?.[language];
            const secondaryLink = project.secondaryLink
              ? {
                  href: project.secondaryLink.href,
                  label: project.secondaryLink.label[language],
                }
              : null;

            return (
              <article key={project.id} className="project-card">
                <div className="project-card__copy">
                  <p className="project-card__index">{String(index + 1).padStart(2, '0')}</p>
                  {projectEyebrow && <p className="project-card__eyebrow">{projectEyebrow}</p>}
                  <h3 className="project-card__title">{projectTitle}</h3>
                  <p className="project-card__description">{project.description[language]}</p>

                  {project.tags?.length ? (
                    <div className="project-card__tags">
                      {project.tags.map((tag) => (
                        <span key={tag[language]} className="project-tag">
                          {tag[language]}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {project.facts?.length ? (
                    <dl className="project-card__facts">
                      {project.facts.map((fact) => (
                        <div key={`${fact.label[language]}-${fact.value[language]}`} className="project-fact">
                          <dt>{fact.label[language]}</dt>
                          <dd>{fact.value[language]}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {secondaryDescription && (
                    <div className="project-card__secondary">
                      <p>{secondaryDescription}</p>

                      {secondaryLink ? (
                        <a
                          href={secondaryLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-inline-link"
                        >
                          {copy.moreLabel}: {secondaryLink.label}
                        </a>
                      ) : null}
                    </div>
                  )}
                </div>

                <ProjectCarousel project={project} language={language} priority={index === 0} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
