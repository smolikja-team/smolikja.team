import { GiftIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The free introductory consultation as a tinted callout next to the primary
 * action, so the offer stands out instead of reading as small print.
 */
export function FreeConsultationNote({
  lead,
  detail,
  className,
}: {
  lead: string;
  detail?: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex w-fit items-start gap-2.5 rounded-2xl bg-primary/10 px-4 py-2.5 text-pretty text-primary ring-1 ring-primary/20",
        className,
      )}
    >
      <GiftIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <span>
        <strong className="font-semibold">{lead}</strong>
        {detail ? <> · {detail}</> : null}
      </span>
    </p>
  );
}
