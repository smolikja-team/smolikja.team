"use client";

import { useSyncExternalStore, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { mainNav } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { BrandLogo } from "@/components/icons/brand-logo";

// The header slides in once the hero has mostly scrolled away. The hero is
// observed as an external store so the server renders the hidden state and no
// setState runs inside an effect body.
const HERO_VISIBLE_RATIO = 0.4;
let heroVisible = true;
const listeners = new Set<() => void>();
let observer: IntersectionObserver | null = null;

function observeHero(heroId: string): void {
  const hero = document.getElementById(heroId);
  if (!hero || observer) return;
  observer = new IntersectionObserver(
    ([entry]) => {
      const next = entry.isIntersecting && entry.intersectionRatio > HERO_VISIBLE_RATIO;
      if (next !== heroVisible) {
        heroVisible = next;
        listeners.forEach((listener) => listener());
      }
    },
    { threshold: [0, HERO_VISIBLE_RATIO, 1] },
  );
  observer.observe(hero);
}

function subscribeFor(heroId: string) {
  return (onChange: () => void) => {
    listeners.add(onChange);
    observeHero(heroId);
    return () => {
      listeners.delete(onChange);
      if (listeners.size === 0) {
        observer?.disconnect();
        observer = null;
      }
    };
  };
}

const getSnapshot = () => heroVisible;
const getServerSnapshot = () => true;

export function SiteHeader({
  heroId,
  homeHref,
  copy,
  children,
}: {
  heroId: string;
  homeHref: string;
  copy: Dictionary["nav"];
  /** Server-rendered language switcher. */
  children: ReactNode;
}) {
  const hidden = useSyncExternalStore(subscribeFor(heroId), getSnapshot, getServerSnapshot);

  return (
    <header
      // `inert` removes the hidden header from the tab order and from assistive
      // technology in one go — no per-link tabIndex bookkeeping.
      inert={hidden}
      className={cn(
        "glass-deep fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-out motion-reduce:transition-none",
        hidden && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-4 sm:px-6">
        <a
          href={homeHref}
          aria-label={copy.home}
          className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <BrandLogo className="h-5 w-auto" />
        </a>
        <nav aria-label={copy.aria} className="ml-auto hidden sm:block">
          <ul className="flex items-center gap-1 text-sm">
            {mainNav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="inline-flex h-8 items-center rounded-md px-2.5 whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {copy[item.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto sm:ml-0">{children}</div>
      </div>
    </header>
  );
}
