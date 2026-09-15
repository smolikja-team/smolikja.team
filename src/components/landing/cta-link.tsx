import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/**
 * The primary action as a link. Wraps the generated button styles with the
 * 48 px hit area and 16 px text the landing page uses for its main controls
 * (the design target for primary mobile controls) without editing the
 * generated primitive.
 */
export function CtaLink({
  href,
  children,
  variant = "default",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        buttonVariants({ variant, size: "lg" }),
        "h-12 rounded-xl px-6 text-base",
        className,
      )}
    >
      {children}
    </a>
  );
}
