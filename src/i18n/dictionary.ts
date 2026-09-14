export type ProjectId = "studanky" | "domov" | "stable" | "auth-flow";

/** Screenshot ids per project — keys of the `alt` text map in the catalogs. */
export type ProjectImageId = {
  studanky: "map" | "spring" | "detail" | "scanner" | "report";
  domov: "dashboard" | "blinder" | "heating" | "time-regime";
  stable:
    | "splashscreen"
    | "stable-picker"
    | "ventilators"
    | "sail-control"
    | "sensors"
    | "light-control";
  "auth-flow": "login" | "registration" | "confirmation";
};

export type ProjectCopy<P extends ProjectId = ProjectId> = {
  title: string;
  summary: string;
  details: string;
  /** Label of the optional outbound link defined in `src/config/projects.ts`. */
  linkLabel?: string;
  images: Record<ProjectImageId[P], string>;
};

/**
 * Shape of a translation catalog. Every `messages/<locale>.json` file must
 * satisfy this type (see `messages/validate.ts`), which guarantees that all
 * locales stay in sync — a missing key is a compile error.
 *
 * Strings containing `{placeholder}` tokens are templates; render them through
 * `format()` from `@/i18n/format`.
 */
export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  og: {
    subtitle: string;
    alt: string;
  };
  manifest: {
    description: string;
  };
  nav: {
    aria: string;
    home: string;
    projects: string;
    about: string;
    contact: string;
  };
  languageSwitcher: {
    label: string;
    cs: string;
    en: string;
  };
  hero: {
    logoAlt: string;
    videoUnsupported: string;
    scrollHint: string;
  };
  statement: {
    title: string;
    text: string;
  };
  projects: {
    title: string;
    galleryLabel: string;
    previous: string;
    next: string;
    items: { [P in ProjectId]: ProjectCopy<P> };
  };
  about: {
    title: string;
    paragraphs: string[];
    community: {
      title: string;
      description: string;
      cta: string;
      venueBefore: string;
      venueLink: string;
      venueAfter: string;
    };
  };
  contact: {
    title: string;
    text: string;
    form: {
      name: string;
      email: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      errorInvalid: string;
      errorServer: string;
      privacyNote: string;
    };
    channels: {
      title: string;
      email: string;
      github: string;
      discord: string;
      openAria: string;
    };
  };
  footer: {
    aria: string;
    copyright: string;
    location: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
};

export type DictionaryCatalog = Dictionary;
