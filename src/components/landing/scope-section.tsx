import { LayoutDashboardIcon, ServerIcon, SmartphoneIcon } from "lucide-react";

import type { Dictionary } from "@/i18n/dictionary";
import { SectionHeading } from "./section-heading";

const items = [
  { id: "app", Icon: SmartphoneIcon },
  { id: "admin", Icon: LayoutDashboardIcon },
  { id: "backend", Icon: ServerIcon },
] as const;

/** The complete product: the app plus the two parts it usually needs. */
export function ScopeSection({ copy }: { copy: Dictionary["scope"] }) {
  return (
    <section className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-16 sm:px-6 sm:py-20">
        <SectionHeading title={copy.title} text={copy.text} />
        {/* One product in three connected parts — a single panel, not three cards. */}
        <ul className="grid grid-cols-[minmax(0,1fr)] divide-y rounded-3xl bg-secondary sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map(({ id, Icon }) => (
            <li key={id} className="flex flex-col gap-3 p-6 sm:p-8">
              <Icon aria-hidden="true" className="size-6 text-primary" />
              <h3 className="text-lg font-semibold">{copy.items[id].title}</h3>
              <p className="leading-relaxed text-pretty text-muted-foreground">
                {copy.items[id].text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
