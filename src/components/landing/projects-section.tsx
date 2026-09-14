import { ArrowUpRightIcon } from "lucide-react";

import { projects } from "@/config/projects";
import type { Dictionary } from "@/i18n/dictionary";
import { format } from "@/i18n/format";
import { ProjectGallery } from "./project-gallery";

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/**
 * One band per project: copy on the left, screenshots on the right. Projects
 * are not a sequence, so a hairline between bands is the only structure.
 */
export function ProjectsSection({ copy }: { copy: Dictionary["projects"] }) {
  return (
    <section id="projects" className="scroll-mt-14 overflow-x-clip border-t">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="pt-16 text-3xl font-semibold tracking-tight sm:pt-20 sm:text-4xl">
          {copy.title}
        </h2>
        <ul className="flex flex-col divide-y">
          {projects.map((project, index) => {
            const item = copy.items[project.id];
            return (
              <li
                key={project.id}
                className="grid grid-cols-[minmax(0,1fr)] gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
              >
                <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
                  <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-pretty">{item.summary}</p>
                  <p className="leading-relaxed text-pretty text-muted-foreground">
                    {item.details}
                  </p>
                  {project.link && item.linkLabel ? (
                    <a
                      href={project.link}
                      {...(isExternal(project.link)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex w-fit items-center gap-1 rounded-md font-medium underline decoration-foreground/30 underline-offset-4 transition-colors outline-none hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {item.linkLabel}
                      {isExternal(project.link) ? (
                        <ArrowUpRightIcon aria-hidden="true" className="size-4" />
                      ) : null}
                    </a>
                  ) : null}
                </div>
                <ProjectGallery
                  images={project.images}
                  alt={item.images}
                  label={format(copy.galleryLabel, { title: item.title })}
                  previousLabel={copy.previous}
                  nextLabel={copy.next}
                  priority={index === 0}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
