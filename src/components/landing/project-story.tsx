import type { Project } from "@/config/projects";
import type { AnyProjectCopy, Dictionary } from "@/i18n/dictionary";
import { format } from "@/i18n/format";
import { Badge } from "@/components/ui/badge";
import { ScreenCarousel } from "./screen-carousel";

/**
 * One application delivery as a story: the situation, what the team
 * delivered, one product decision and the current outcome, next to a
 * carousel of its real screens. Every story is fully visible on the page.
 */
export function ProjectStory({
  project,
  copy,
  shared,
}: {
  project: Project;
  copy: AnyProjectCopy;
  shared: Pick<
    Dictionary["projects"],
    "credit" | "status" | "slideLabel" | "galleryLabel" | "previous" | "next"
  >;
}) {
  return (
    <article className="grid grid-cols-[minmax(0,1fr)] gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{copy.title}</h3>
            <Badge variant={project.status === "delivered" ? "secondary" : "outline"}>
              {shared.status[project.status]}
            </Badge>
          </div>
          <p className="text-muted-foreground">{copy.tagline}</p>
        </div>
        <p className="text-lg leading-relaxed text-pretty">{copy.problem}</p>
        <p className="leading-relaxed text-pretty">{copy.delivered}</p>
        <p className="leading-relaxed text-pretty">{copy.decision}</p>
        <p className="leading-relaxed text-pretty text-muted-foreground">{copy.result}</p>
        <p className="text-sm font-medium">{shared.credit}</p>
      </div>

      {/* On large screens the carousel runs past the content column to the viewport edge. */}
      <div className="min-w-0 lg:mr-[calc(-1*max(1.5rem,(100vw-72rem)/2+1.5rem))]">
        <ScreenCarousel
          images={project.images}
          alt={copy.images}
          label={format(shared.galleryLabel, { title: copy.title })}
          slideLabel={shared.slideLabel}
          previousLabel={shared.previous}
          nextLabel={shared.next}
        />
      </div>
    </article>
  );
}
