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
    description: {
      cs: 'Mobilní aplikace pro iOS a Android určená k ovládání chytré domácnosti. Aplikace je navržena s důrazem na ergonomii, uživatelský zážitek – veškeré ovládací prvky jsou dostupné palcem ruky, která drží telefon, což umožňuje pohodlné ovládání i v situacích, kdy má uživatel k dispozici pouze jednu ruku.',
      en: 'Mobile app for iOS and Android that controls an entire smart home. The interface is designed for ergonomics and one-handed use—every primary action is reachable with the thumb that holds the device.',
    },
    secondaryDescription: {
      cs: 'Aplikace se automaticky konfiguruje dle přihlášeného uživatele a komunikuje s chytrou domácností pomocí zabezpečeného WebSocket protokolu. Uživatel má možnost ovládat osvětlení, žaluzie, vstupní brány, vytápění, podlahové topení, rekuperaci i klimatizaci – včetně nastavení časových plánů.',
      en: 'The experience adapts to the signed-in user and communicates with the smart home via a secured WebSocket protocol. Users can control lights, blinds, gates, heating, floor heating, recuperation, and climate—including scheduled automations.',
    },
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
    description: {
      cs: 'Mobilní aplikace pro iOS a Android navržená pro správce inteligentní stáje určené pro chov skotu. Aplikace umožňuje vzdálené ovládání vybavení stáje a poskytuje notifikace v případě technických problémů nebo nežádoucích stavů.',
      en: 'Mobile app for iOS and Android tailored for managers of a smart cattle stable. It enables remote control of the stable equipment and issues alerts when technical issues or undesirable conditions appear.',
    },
    secondaryDescription: {
      cs: 'Přizpůsobuje se přihlášenému uživateli a komunikuje prostřednictvím zabezpečeného WebSocket protokolu. Uživatel může ovládat ventilátory, plachty a osvětlení stáje. K dispozici je také přehled aktuálních hodnot z čidel a interaktivní grafy vývoje za posledních 24 hodin. V případě potřeby aplikace automaticky upozorní správce prostřednictvím push notifikace.',
      en: 'The UI adapts to the signed-in user and communicates via a secure WebSocket protocol. Users manage fans, tarpaulins, and lighting, and they get real-time sensor readings with interactive 24-hour charts. Critical situations trigger automatic push notifications for the stable manager.',
    },
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
