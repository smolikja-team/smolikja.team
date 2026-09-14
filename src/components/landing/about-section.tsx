import { DiscordIcon } from "@/components/icons/discord-icon";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";

/** How the team works, next to the one card on the page: the community invite. */
export function AboutSection({ copy }: { copy: Dictionary["about"] }) {
  return (
    <section id="about" className="scroll-mt-14 border-t">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{copy.title}</h2>
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-prose text-lg leading-relaxed text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        <Card className="self-start lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="text-xl">{copy.community.title}</CardTitle>
            <CardDescription className="leading-relaxed text-pretty">
              {copy.community.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-fit bg-brand text-brand-foreground hover:bg-brand/85 focus-visible:ring-brand/50",
              )}
            >
              <DiscordIcon data-icon="inline-start" />
              {copy.community.cta}
            </a>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {copy.community.venueBefore}
              <a
                href={siteConfig.links.venue}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-foreground underline decoration-foreground/30 underline-offset-4 outline-none hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {copy.community.venueLink}
              </a>
              {copy.community.venueAfter}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
