import { cn } from "@/lib/utils";

/**
 * Page section: at least one screen tall (minus the sticky header) with its
 * content vertically centred, so every topic gets its own screen and long
 * ones simply grow. `lvh` is the largest viewport height, so a section still
 * fills the screen when a mobile browser hides its toolbar. Sections are told
 * apart by alternating backgrounds rather than rules: pages alternate
 * `default` and `tinted`, and tinted sections carry a hairline top and bottom.
 */
export function Section({
  id,
  tone = "default",
  className,
  children,
}: {
  id?: string;
  tone?: "default" | "tinted";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "flex min-h-[calc(100lvh-4rem)] scroll-mt-16 flex-col justify-center",
        tone === "tinted" && "border-y border-border/60 bg-secondary/60",
        className,
      )}
    >
      {children}
    </section>
  );
}
