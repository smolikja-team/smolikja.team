import { cn } from "@/lib/utils";

/** Section title with an optional lead paragraph, sized per the type scale. */
export function SectionHeading({
  title,
  text,
  className,
}: {
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-3xl flex-col gap-4", className)}>
      <h2 className="text-[2rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {text ? (
        <p className="max-w-prose text-lg leading-relaxed text-pretty text-muted-foreground">
          {text}
        </p>
      ) : null}
    </div>
  );
}
