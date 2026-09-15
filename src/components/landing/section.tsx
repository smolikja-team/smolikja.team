import { cn } from "@/lib/utils";

/**
 * Landing-page section: at least one viewport tall (minus the sticky header)
 * with its content vertically centred, so short sections never crowd each
 * other and long ones simply grow.
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
        "flex min-h-[calc(100dvh-4rem)] scroll-mt-16 flex-col justify-center border-t",
        tone === "tinted" && "bg-secondary/60",
        className,
      )}
    >
      {children}
    </section>
  );
}
