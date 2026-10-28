import type { ContactSource } from "@/config/contact";
import type { ExperienceId, WorkImageId } from "@/config/work";

export type { ExperienceId, WorkImageId };

/** The four verbs the offer is built on, in display order (see `serviceOrder`). */
export type ServiceId = "plan" | "build" | "secure" | "grow";

/** A short heading with one or two sentences under it. */
export type TitledText = {
  title: string;
  text: string;
};

export type ServiceCopy = TitledText & {
  points: string[];
};

/** Alt text and the short visible caption of one gallery screen. */
export type WorkImageCopy = {
  alt: string;
  caption: string;
};

/** One kind of project, told without naming the client or the product. */
export type ExperienceCopy = {
  /** Small label above the title: industry or kind of client. */
  sector: string;
  title: string;
  /** One or two sentences with exactly one key phrase marked `**…**`. */
  text: string;
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
    services: string;
    experience: string;
    security: string;
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
    /** Shown under the owner's name above the headline. */
    role: string;
    title: string;
    text: string;
    secondary: string;
    reassurance: string;
    /** The free-consultation statement next to the primary action; `reassurance` is its detail. */
    freeConsultation: string;
    compositionAria: string;
  };
  services: {
    title: string;
    intro: string;
    items: Record<ServiceId, ServiceCopy>;
    /** Link from the "secure" card to the app-security page. */
    securityLink: string;
  };
  work: {
    title: string;
    intro: string;
    galleryLabel: string;
    /**
     * The last device of the gallery: a redacted screen with a stamp, for the
     * projects under NDA that the page cannot show.
     */
    confidential: {
      stamp: string;
      caption: string;
    };
    images: Record<WorkImageId, WorkImageCopy>;
    /** Heading and lead of the experience section (the cards below the gallery). */
    experiencesTitle: string;
    experiencesText: string;
    experiences: Record<ExperienceId, ExperienceCopy>;
  };
  /** The security teaser on the landing page; the full offer is `securityPage`. */
  security: {
    title: string;
    text: string;
    checks: TitledText[];
    link: string;
  };
  approach: {
    title: string;
    intro: string;
    free: TitledText;
    principles: TitledText[];
  };
  about: {
    title: string;
    portraitAlt: string;
    bio: string[];
    ai: {
      title: string;
      workspaceAlt: string;
      paragraphs: string[];
    };
    assurances: {
      title: string;
      items: TitledText[];
    };
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  contact: {
    title: string;
    text: string;
    freeConsultation: string;
    freeConsultationDetail: string;
    /** Next to the owner's avatar: who answers the enquiry. */
    personal: string;
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
    /**
     * The e-mail an enquiry arrives as. It is in the visitor's language
     * because they see it again, quoted under the owner's reply.
     */
    mail: {
      /**
       * By the page the form was sent from; `{name}` is the visitor's name.
       * The shared start lets one inbox filter catch every enquiry, and the
       * name keeps mail apps from threading different enquiries together.
       */
      subjects: Record<ContactSource, string>;
      /** Labels of the lines above the message. */
      name: string;
      email: string;
    };
  };
  /** The app-security page (`securityPath` in `src/config/pages.ts`). */
  securityPage: {
    metaTitle: string;
    metaDescription: string;
    /** Small label above the page heading. */
    eyebrow: string;
    title: string;
    intro: string;
    /** One sourced fact; the source URL lives in `src/config/pages.ts`. */
    evidence: {
      text: string;
      linkLabel: string;
    };
    audience: {
      title: string;
      items: string[];
    };
    services: {
      title: string;
      items: TitledText[];
    };
    process: {
      title: string;
      steps: TitledText[];
    };
    why: {
      title: string;
      items: TitledText[];
    };
    limits: TitledText;
    faq: {
      title: string;
      items: FaqItem[];
    };
    /** Heading and lead of the enquiry form on this page. */
    contact: {
      title: string;
      text: string;
    };
  };
  footer: {
    aria: string;
    navAria: string;
    languageAria: string;
    copyright: string;
    location: string;
    linkedin: string;
    privacy: string;
  };
  /**
   * Legal identity of the operator. `{name}`, `{ico}` and `{address}` come
   * from `operator` in `src/config/legal.ts`; the privacy page inserts the
   * identity where its text says `{operator}`.
   */
  operator: {
    identity: string;
    register: string;
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

export type DictionaryCatalog = Dictionary;
