import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";

/** Whether there is room for new projects, switched in `siteConfig`. */
export function AvailabilityNote({
  copy,
  className,
}: {
  copy: Dictionary["availability"];
  className?: string;
}) {
  const open = siteConfig.availableForNewProjects;

  return (
    <p className={cn("flex items-start gap-2.5 text-pretty", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "mt-[0.5lh] size-2 shrink-0 -translate-y-1/2 rounded-full",
          open ? "bg-primary" : "bg-muted-foreground",
        )}
      />
      {open ? copy.open : copy.busy}
    </p>
  );
}
