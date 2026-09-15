import { projects } from "@/config/projects";
import type { Dictionary } from "@/i18n/dictionary";
import { ProjectStory } from "./project-story";
import { SectionHeading } from "./section-heading";

export function ProjectsSection({ copy }: { copy: Dictionary["projects"] }) {
  return (
    <section id="projects" className="scroll-mt-16 border-t">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <SectionHeading title={copy.title} text={copy.fit} className="pt-16 sm:pt-20" />
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
    </section>
  );
}
