import { Fragment } from "react";

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
      <h2 className="text-[1.75rem] leading-display font-semibold tracking-display text-balance sm:text-4xl lg:text-[2.5rem]">
        {title}
      </h2>
      {text ? (
        <p className="max-w-2xl text-lg leading-relaxed text-balance text-muted-foreground">
          {/* Each sentence wraps as a unit: a sentence that no longer fits
              starts a new line instead of leaving its first words dangling
              after the previous one. */}
          {text.split(/(?<=[.!?])\s+/).map((sentence, index) => (
            <Fragment key={index}>
              {index > 0 ? " " : null}
              <span className="inline-block">{sentence}</span>
            </Fragment>
          ))}
        </p>
      ) : null}
    </div>
  );
}
