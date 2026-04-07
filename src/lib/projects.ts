import type { Project } from '@/types';

const PORTRAIT_WIDTH = 1170;
const PORTRAIT_HEIGHT = 2532;

export const projects: Project[] = [
  {
    id: 'studanky',
    title: {
      cs: 'Studánky',
      en: 'Studánky',
    },
    eyebrow: {
      cs: 'Vlastní produkt ve vývoji',
      en: 'In-house product in development',
    },
    description: {
      cs: 'Mobilní aplikace pro iOS a Android ve vývoji, která pomáhá lidem sledovat stav přírodních studánek a plánovat výlety s dostatkem vody.',
      en: 'Mobile app for iOS and Android (in development) that helps people monitor natural springs and plan trips with reliable access to fresh water.',
    },
    secondaryDescription: {
      cs: 'Sbírání dat probíhá přes skenování QR kódů umístěných u studánek a krátký dotazník, díky němuž mají uživatelé vždy čerstvé subjektivní informace o kvalitě i dostupnosti vody. Uživatelé mohou hlásit závady a poškození přímo vlastníkovi studánky. Projekt vítá partnery i spolupracovníky – v případě zájmu nás prosím kontaktujte.',
      en: 'Data collection runs through scanning QR codes placed at the springs and a short questionnaire, giving users fresh, subjective insight into water quality and availability. Users can report issues directly to the spring owner. The project welcomes partners and collaborators—get in touch if you are interested.',
    },
    secondaryLink: {
      href: 'mailto:smolikja@protonmail.com',
      label: {
        cs: 'smolikja@protonmail.com',
        en: 'smolikja@protonmail.com',
      },
    },
    tags: [
      {
        cs: 'iOS + Android',
        en: 'iOS + Android',
      },
      {
        cs: 'Mapy a terénní data',
        en: 'Mapping & field data',
      },
      {
        cs: 'QR workflow',
        en: 'QR workflow',
      },
    ],
    facts: [
      {
        label: {
          cs: 'Fáze',
          en: 'Stage',
        },
        value: {
          cs: 'Ve vývoji',
          en: 'In development',
        },
      },
      {
        label: {
          cs: 'Vstup dat',
          en: 'Data input',
        },
        value: {
          cs: 'QR reporty v terénu',
          en: 'QR field reports',
        },
      },
      {
        label: {
          cs: 'Zaměření',
          en: 'Focus',
        },
        value: {
          cs: 'Voda a plánování tras',
          en: 'Water access and route planning',
        },
      },
    ],
    images: [
      {
        src: 'https://smolikja.team/assets/projects/studanky/map.png',
        alt: {
          cs: 'Studánky – mapa dostupných pramenů',
          en: 'Studánky – map of available springs',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/studanky/spring.png',
        alt: {
          cs: 'Studánky – přehled studánek v okolí',
          en: 'Studánky – overview of springs nearby',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/studanky/detail.png',
        alt: {
          cs: 'Studánky – detailní informace o prameni',
          en: 'Studánky – detailed spring information',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/studanky/scanner.png',
        alt: {
          cs: 'Studánky – skenování QR kódu u studánky',
          en: 'Studánky – QR code scanning at the spring',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/studanky/report.png',
        alt: {
          cs: 'Studánky – rychlé hlášení stavu pramene',
          en: 'Studánky – quick spring status report',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
    ],
  },
  {
    id: 'domov',
    title: {
      cs: 'Domov pod palcem',
      en: 'Domov pod palcem',
    },
    eyebrow: {
      cs: 'Klientský smart home produkt',
      en: 'Client smart-home product',
    },
    description: {
      cs: 'Mobilní aplikace pro iOS a Android určená k ovládání chytré domácnosti. Aplikace je navržena s důrazem na ergonomii, uživatelský zážitek – veškeré ovládací prvky jsou dostupné palcem ruky, která drží telefon, což umožňuje pohodlné ovládání i v situacích, kdy má uživatel k dispozici pouze jednu ruku.',
      en: 'Mobile app for iOS and Android that controls an entire smart home. The interface is designed for ergonomics and one-handed use—every primary action is reachable with the thumb that holds the device.',
    },
    secondaryDescription: {
      cs: 'Aplikace se automaticky konfiguruje dle přihlášeného uživatele a komunikuje s chytrou domácností pomocí zabezpečeného WebSocket protokolu. Uživatel má možnost ovládat osvětlení, žaluzie, vstupní brány, vytápění, podlahové topení, rekuperaci i klimatizaci – včetně nastavení časových plánů.',
      en: 'The experience adapts to the signed-in user and communicates with the smart home via a secured WebSocket protocol. Users can control lights, blinds, gates, heating, floor heating, recuperation, and climate—including scheduled automations.',
    },
    tags: [
      {
        cs: 'One-handed UX',
        en: 'One-handed UX',
      },
      {
        cs: 'Bezpečný WebSocket',
        en: 'Secure WebSocket',
      },
      {
        cs: 'Smart home dashboardy',
        en: 'Smart-home dashboards',
      },
    ],
    facts: [
      {
        label: {
          cs: 'Platforma',
          en: 'Platform',
        },
        value: {
          cs: 'iOS + Android',
          en: 'iOS + Android',
        },
      },
      {
        label: {
          cs: 'Kontext',
          en: 'Context',
        },
        value: {
          cs: 'Ovládání domácnosti',
          en: 'Home control',
        },
      },
      {
        label: {
          cs: 'Princip UX',
          en: 'UX principle',
        },
        value: {
          cs: 'Vše dostupné palcem',
          en: 'Thumb-reachable actions',
        },
      },
    ],
    images: [
      {
        src: 'https://smolikja.team/assets/projects/domov/dashboard.png',
        alt: {
          cs: 'Domov pod palcem – úvodní dashboard',
          en: 'Domov pod palcem – home dashboard',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/domov/blinder.png',
        alt: {
          cs: 'Domov pod palcem – ovládání žaluzií',
          en: 'Domov pod palcem – blind controls',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/domov/heating.png',
        alt: {
          cs: 'Domov pod palcem – nastavení vytápění',
          en: 'Domov pod palcem – heating configuration',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/domov/time-regime.png',
        alt: {
          cs: 'Domov pod palcem – plánování časových režimů',
          en: 'Domov pod palcem – scheduling automation',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
    ],
  },
  {
    id: 'stable',
    title: {
      cs: 'Inteligentní stáj',
      en: 'Smart Stable',
    },
    eyebrow: {
      cs: 'IoT a provozní rozhraní',
      en: 'IoT and operational interface',
    },
    description: {
      cs: 'Mobilní aplikace pro iOS a Android navržená pro správce inteligentní stáje určené pro chov skotu. Aplikace umožňuje vzdálené ovládání vybavení stáje a poskytuje notifikace v případě technických problémů nebo nežádoucích stavů.',
      en: 'Mobile app for iOS and Android tailored for managers of a smart cattle stable. It enables remote control of the stable equipment and issues alerts when technical issues or undesirable conditions appear.',
    },
    secondaryDescription: {
      cs: 'Přizpůsobuje se přihlášenému uživateli a komunikuje prostřednictvím zabezpečeného WebSocket protokolu. Uživatel může ovládat ventilátory, plachty a osvětlení stáje. K dispozici je také přehled aktuálních hodnot z čidel a interaktivní grafy vývoje za posledních 24 hodin. V případě potřeby aplikace automaticky upozorní správce prostřednictvím push notifikace.',
      en: 'The UI adapts to the signed-in user and communicates via a secure WebSocket protocol. Users manage fans, tarpaulins, and lighting, and they get real-time sensor readings with interactive 24-hour charts. Critical situations trigger automatic push notifications for the stable manager.',
    },
    tags: [
      {
        cs: 'Realtime monitoring',
        en: 'Realtime monitoring',
      },
      {
        cs: 'Push alerty',
        en: 'Push alerts',
      },
      {
        cs: 'IoT dashboardy',
        en: 'IoT dashboards',
      },
    ],
    facts: [
      {
        label: {
          cs: 'Platforma',
          en: 'Platform',
        },
        value: {
          cs: 'iOS + Android',
          en: 'iOS + Android',
        },
      },
      {
        label: {
          cs: 'Provoz',
          en: 'Environment',
        },
        value: {
          cs: 'Chov skotu',
          en: 'Cattle operations',
        },
      },
      {
        label: {
          cs: 'Data',
          en: 'Data',
        },
        value: {
          cs: '24h senzory a grafy',
          en: '24h sensors and charts',
        },
      },
    ],
    images: [
      {
        src: 'https://smolikja.team/assets/projects/stable/splashscreen.png',
        alt: {
          cs: 'Inteligentní stáj – úvodní obrazovka',
          en: 'Smart Stable – welcome screen',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/stable/stable-picker.png',
        alt: {
          cs: 'Inteligentní stáj – výběr stáje',
          en: 'Smart Stable – stable selector',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/stable/ventilators.png',
        alt: {
          cs: 'Inteligentní stáj – ovládání ventilátorů',
          en: 'Smart Stable – fan controls',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/stable/sail-control.png',
        alt: {
          cs: 'Inteligentní stáj – ovládání plachet',
          en: 'Smart Stable – tarpaulin controls',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/stable/sensors.png',
        alt: {
          cs: 'Inteligentní stáj – přehled senzorů',
          en: 'Smart Stable – sensor overview',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/stable/light-control.png',
        alt: {
          cs: 'Inteligentní stáj – ovládání osvětlení',
          en: 'Smart Stable – lighting controls',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
    ],
  },
  {
    id: 'auth-flow',
    title: {
      cs: 'Flutter Auth Flow',
      en: 'Flutter Auth Flow',
    },
    eyebrow: {
      cs: 'Open-source toolkit',
      en: 'Open-source toolkit',
    },
    description: {
      cs: 'Open source Flutter balíček s přizpůsobitelným autentizačním rozhraním napojeným na libovolný backend.',
      en: 'Open-source Flutter package with a configurable authentication UI that connects to any backend.',
    },
    secondaryDescription: {
      cs: 'Hlavní body: přihlášení a registrace, ověření e-mailu, reset hesla, lokalizace CS/EN. Kód je veřejný zde:',
      en: 'Highlights: login and sign-up, email verification, password reset, and CS/EN localisation. The code is available here:',
    },
    secondaryLink: {
      href: 'https://github.com/smolikja/flutter-auth-flow',
      label: {
        cs: 'https://github.com/smolikja/flutter-auth-flow',
        en: 'https://github.com/smolikja/flutter-auth-flow',
      },
    },
    tags: [
      {
        cs: 'Flutter',
        en: 'Flutter',
      },
      {
        cs: 'Auth flow',
        en: 'Auth flow',
      },
      {
        cs: 'CS/EN lokalizace',
        en: 'CS/EN localisation',
      },
    ],
    facts: [
      {
        label: {
          cs: 'Typ',
          en: 'Type',
        },
        value: {
          cs: 'OSS balíček',
          en: 'OSS package',
        },
      },
      {
        label: {
          cs: 'Framework',
          en: 'Framework',
        },
        value: {
          cs: 'Flutter',
          en: 'Flutter',
        },
      },
      {
        label: {
          cs: 'Moduly',
          en: 'Modules',
        },
        value: {
          cs: 'Login, registrace, reset',
          en: 'Login, sign-up, reset',
        },
      },
    ],
    images: [
      {
        src: 'https://smolikja.team/assets/projects/auth-flow/login.png',
        alt: {
          cs: 'Flutter Auth Flow – přihlašovací obrazovka',
          en: 'Flutter Auth Flow – login screen',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/auth-flow/registration.png',
        alt: {
          cs: 'Flutter Auth Flow – registrační formulář',
          en: 'Flutter Auth Flow – registration form',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/auth-flow/confirmation.png',
        alt: {
          cs: 'Flutter Auth Flow – potvrzení registrace',
          en: 'Flutter Auth Flow – registration confirmation',
        },
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
    ],
  },
];
