export type ProjectId = "domov" | "stable" | "studanky";

/** Screenshot ids per project — keys of the `alt` text map in the catalogs. */
export type ProjectImageId = {
  domov: "heating" | "blinder" | "time-regime" | "dashboard";
  stable: "sensors" | "ventilators" | "sail-control" | "light-control" | "stable-picker";
  studanky: "map" | "spring" | "detail" | "report" | "scanner";
};

export type ProjectStatus = "delivered" | "in-development";

/**
 * One application delivery, told from the customer's side: the situation,
 * what the team delivered, one meaningful product decision and the current,
 * verifiable outcome. The credit line and status label are shared strings.
 */
export type ProjectCopy<P extends ProjectId = ProjectId> = {
  title: string;
  /** One line under the title: who the app is for. */
  tagline: string;
  problem: string;
  delivered: string;
  decision: string;
  result: string;
  images: Record<ProjectImageId[P], string>;
};

export type ProcessStage = {
  title: string;
  text: string;
  outputs: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PrivacySection = {
  title: string;
  paragraphs: string[];
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
    process: string;
    about: string;
    /** The one primary action, identical everywhere it appears. */
    cta: string;
    menuOpen: string;
    menuClose: string;
    menuTitle: string;
  };
  languageSwitcher: {
    label: string;
    cs: string;
    en: string;
  };
  hero: {
    title: string;
    text: string;
    secondary: string;
    reassurance: string;
    freeConsultation: string;
    /** Small factual caption under the product composition (both screens). */
    caption: string;
    /** Caption for small screens, where only the large screen is shown. */
    captionSmall: string;
    compositionAria: string;
  };
  projects: {
    title: string;
    /** Short passage identifying the customer's situation, above the stories. */
    fit: string;
    credit: string;
    /** Accessible name of one carousel slide; `{index}` and `{count}` templates. */
    slideLabel: string;
    galleryLabel: string;
    previous: string;
    next: string;
    status: Record<ProjectStatus, string>;
    items: { [P in ProjectId]: ProjectCopy<P> };
  };
  process: {
    title: string;
    intro: string;
    handover: string;
    free: {
      title: string;
      text: string;
    };
    outputsLabel: string;
    stages: ProcessStage[];
  };
  scope: {
    title: string;
    text: string;
    items: {
      app: { title: string; text: string };
      admin: { title: string; text: string };
      backend: { title: string; text: string };
    };
  };
  team: {
    title: string;
    paragraphs: string[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  contact: {
    title: string;
    text: string;
    freeConsultation: string;
    form: {
      name: string;
      email: string;
      message: string;
      messageHint: string;
      submit: string;
      submitting: string;
      successTitle: string;
      success: string;
      errorSummary: string;
      errors: {
        name: string;
        email: string;
        message: string;
        server: string;
      };
      privacyNote: string;
      privacyLink: string;
    };
    direct: {
      label: string;
    };
  };
  footer: {
    aria: string;
    navAria: string;
    languageAria: string;
    copyright: string;
    location: string;
    privacy: string;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    effectiveFrom: string;
    sections: PrivacySection[];
    backHome: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
};

/** `ProjectCopy` for a project whose id is only known as the `ProjectId` union. */
export type AnyProjectCopy = Omit<ProjectCopy, "images"> & { images: Record<string, string> };

export type DictionaryCatalog = Dictionary;
