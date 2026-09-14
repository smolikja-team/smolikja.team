import { MailIcon } from "lucide-react";

import { DiscordIcon } from "@/components/icons/discord-icon";
import { GithubIcon } from "@/components/icons/github-icon";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { format } from "@/i18n/format";

const channels = [
  { id: "email", href: `mailto:${siteConfig.email}`, Icon: MailIcon, external: false },
  { id: "github", href: siteConfig.links.github, Icon: GithubIcon, external: true },
  { id: "discord", href: siteConfig.links.discord, Icon: DiscordIcon, external: true },
] as const;

/** Direct ways to reach the team, listed next to the contact form. */
export function ContactChannels({ copy }: { copy: Dictionary["contact"]["channels"] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">{copy.title}</h3>
      <ul className="flex flex-col gap-1">
        {channels.map(({ id, href, Icon, external }) => (
          <li key={id}>
            <a
              href={href}
              aria-label={format(copy.openAria, { label: copy[id] })}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="-mx-2 inline-flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Icon aria-hidden="true" className="size-5" />
              <span className="font-medium">{copy[id]}</span>
              <span className="truncate text-sm text-muted-foreground">
                {id === "email" ? siteConfig.email : href.replace(/^https:\/\//, "")}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
