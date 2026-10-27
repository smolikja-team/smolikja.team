import { cn } from "@/lib/utils";

/**
 * The free introductory consultation as a plain statement next to the primary
 * action: set in the brand colour and a heavier weight so it stands out,
 * without a box that could be mistaken for a button.
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
    <p className={cn("text-pretty text-primary", className)}>
      <strong className="font-semibold">{lead}</strong>
      {detail ? <> · {detail}</> : null}
    </p>
  );
}
