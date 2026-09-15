import type { Project } from "@/config/projects";
import type { AnyProjectCopy, Dictionary } from "@/i18n/dictionary";
import { Badge } from "@/components/ui/badge";
import { PhoneScreen } from "./phone-screen";

/**
 * One application delivery as a story: the situation, what the team
 * delivered, one product decision and the current outcome, next to two or
 * three readable screens. Every story is fully visible — no carousel.
 */
export function ProjectStory({
  project,
  copy,
  shared,
}: {
  project: Project;
  copy: AnyProjectCopy;
  shared: Pick<Dictionary["projects"], "credit" | "status">;
}) {
  const screens = project.images.length;

  return (
    <article className="grid grid-cols-[minmax(0,1fr)] gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
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

      <div
        className="grid items-start gap-4 rounded-3xl bg-secondary p-5 sm:gap-6 sm:p-8"
        style={{ gridTemplateColumns: `repeat(${screens}, minmax(0, 1fr))` }}
      >
        {project.images.map((image) => (
          <PhoneScreen
            key={image.id}
            image={image}
            alt={copy.images[image.id]}
            sizes={screens === 3 ? "(min-width: 1024px) 180px, 28vw" : "(min-width: 1024px) 250px, 40vw"}
          />
        ))}
      </div>
    </article>
  );
}
