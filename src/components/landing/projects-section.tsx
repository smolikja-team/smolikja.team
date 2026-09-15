import { projects } from "@/config/projects";
import type { Dictionary } from "@/i18n/dictionary";
import { ProjectStory } from "./project-story";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

export function ProjectsSection({ copy }: { copy: Dictionary["projects"] }) {
  return (
    <Section id="projects" className="overflow-x-clip">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        <SectionHeading title={copy.title} text={copy.fit} />
        <div className="mt-4 flex flex-col divide-y">
          {projects.map((project) => (
            <ProjectStory
              key={project.id}
              project={project}
              copy={copy.items[project.id]}
              shared={copy}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
