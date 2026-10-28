import { cn } from "@/lib/utils";

/** Two placeholder lines of redacted text inside a tile. */
function RedactedTile() {
  return (
    <span className="flex aspect-square flex-col justify-end gap-[2.5cqw] rounded-[6cqw] bg-muted p-[5cqw]">
      <span className="h-[3.5cqw] w-[75%] rounded-[1cqw] bg-foreground/80" />
      <span className="h-[3.5cqw] w-[45%] rounded-[1cqw] bg-foreground/80" />
    </span>
  );
}

/**
 * Screen content for the projects under NDA: an app layout whose every line
 * of text is blacked out, like a redacted document, with a stamp across it.
 * Sizes are in container units, so it scales with the device it sits in.
 * Purely visual — the caption next to the device says what it means.
 */
export function ConfidentialScreen({ stamp }: { stamp: string }) {
  return (
    <div aria-hidden="true" className="@container relative h-full select-none">
      <div className="flex h-full flex-col gap-[5cqw] px-[8cqw] pt-[22cqw]">
        <span className="h-[7cqw] w-[58%] rounded-[1.5cqw] bg-foreground" />
        <span className="h-[3.5cqw] w-[82%] rounded-[1cqw] bg-foreground/70" />
        <span className="flex gap-[3cqw]">
          <span className="h-[8cqw] w-[22cqw] rounded-full bg-primary/15" />
          <span className="h-[8cqw] w-[18cqw] rounded-full bg-muted" />
          <span className="h-[8cqw] w-[24cqw] rounded-full bg-muted" />
        </span>
        <span className="grid grid-cols-2 gap-[4cqw]">
          <RedactedTile />
          <RedactedTile />
          <RedactedTile />
          <RedactedTile />
        </span>
        <span className="flex flex-col gap-[4cqw] pt-[2cqw]">
          {["w-[70%]", "w-[55%]", "w-[80%]"].map((width) => (
            <span key={width} className="flex items-center gap-[4cqw]">
              <span className="size-[10cqw] shrink-0 rounded-full bg-muted" />
              <span className="flex flex-1 flex-col gap-[2cqw]">
                <span className={cn("h-[3.5cqw] rounded-[1cqw] bg-foreground/70", width)} />
                <span className="h-[3cqw] w-[40%] rounded-[1cqw] bg-foreground/30" />
              </span>
            </span>
          ))}
        </span>
        {/* Tab bar, the first tab selected. */}
        <span className="mt-auto flex justify-around border-t pt-[4cqw] pb-[9cqw]">
          {[0, 1, 2, 3].map((tab) => (
            <span
              key={tab}
              className={cn("size-[7cqw] rounded-[2cqw]", tab === 0 ? "bg-primary/60" : "bg-muted")}
            />
          ))}
        </span>
      </div>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="-rotate-12 rounded-[3cqw] border-[1.2cqw] border-primary bg-card/90 px-[6cqw] py-[1cqw] font-heading text-[17cqw] leading-none font-bold tracking-wide text-primary shadow-lg shadow-foreground/10">
          {stamp}
        </span>
      </span>
    </div>
  );
}
