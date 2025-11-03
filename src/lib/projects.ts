import type { Project } from '@/types';

const PORTRAIT_WIDTH = 1170;
const PORTRAIT_HEIGHT = 2532;

export const projects: Project[] = [
  {
    id: 'studanky',
    title: 'Studánky',
    description:
      'Mobilní aplikace pro Android a iOS ve vývoji, která pomáhá komunitě sledovat stav přírodních studánek a plánovat výlety s dostatkem pitné vody.',
    secondaryDescription:
      'Sbírání dat probíhá přes skenování QR kódů umístěných u studánek a krátký dotazník, díky němuž mají uživatelé vždy čerstvé informace o kvalitě i dostupnosti vody. Projekt vítá partnery i spolupracovníky – v případě zájmu mě prosím kontaktujte. Uživatelé mohou také nahlásit závady přímo vlastníkovi studánky.',
    secondaryLink: {
      href: 'mailto:smolikja@protonmail.com',
      label: 'smolikja@protonmail.com',
    },
    images: [
      {
        src: 'https://smolikja.team/assets/projects/studanky/map.png',
        alt: 'Studánky – mapa dostupných pramenů',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/studanky/spring.png',
        alt: 'Studánky – přehled studánek v okolí',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/studanky/detail.png',
        alt: 'Studánky – detailní informace o prameni',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/studanky/scanner.png',
        alt: 'Studánky – skenování QR kódu u studánky',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/studanky/report.png',
        alt: 'Studánky – rychlé hlášení stavu pramene',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
    ],
  },
  {
    id: 'domov',
    title: 'Domov pod palcem',
    description:
      'Mobilní aplikace pro iOS a Android určená k ovládání chytré domácnosti. Aplikace je navržena s důrazem na ergonomii – veškeré ovládací prvky jsou dostupné palcem ruky, která drží telefon, což umožňuje pohodlné ovládání i v situacích, kdy má uživatel k dispozici pouze jednu ruku.',
    secondaryDescription:
      'Aplikace se automaticky konfiguruje dle přihlášeného uživatele a komunikuje s chytrou domácností pomocí zabezpečeného WebSocket protokolu. Uživatel má možnost ovládat osvětlení, žaluzie, vstupní brány, vytápění, podlahové topení, rekuperaci i klimatizaci – včetně nastavení časových plánů.',
    images: [
      {
        src: 'https://smolikja.team/assets/projects/domov/dashboard.png',
        alt: 'Domov pod palcem – úvodní dashboard',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/domov/blinder.png',
        alt: 'Domov pod palcem – ovládání žaluzií',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/domov/heating.png',
        alt: 'Domov pod palcem – nastavení vytápění',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/domov/time-regime.png',
        alt: 'Domov pod palcem – plánování časových režimů',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
    ],
  },
  {
    id: 'stable',
    title: 'Inteligentní stáj',
    description:
      'Mobilní aplikace pro iOS a Android navržená pro správce inteligentní stáje určené pro chov skotu. Aplikace umožňuje vzdálené ovládání vybavení stáje a poskytuje notifikace v případě technických problémů nebo nežádoucích stavů.',
    secondaryDescription:
      'Přizpůsobuje se přihlášenému uživateli a komunikuje prostřednictvím zabezpečeného WebSocket protokolu. Uživatel může ovládat ventilátory, plachty a osvětlení stáje. K dispozici je také přehled aktuálních hodnot z čidel a interaktivní grafy vývoje za posledních 24 hodin. V případě potřeby aplikace automaticky upozorní správce prostřednictvím push notifikace.',
    images: [
      {
        src: 'https://smolikja.team/assets/projects/stable/splashscreen.png',
        alt: 'Inteligentní stáj – úvodní obrazovka',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/stable/stable-picker.png',
        alt: 'Inteligentní stáj – výběr stáje',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/stable/ventilators.png',
        alt: 'Inteligentní stáj – ovládání ventilátorů',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/stable/sail-control.png',
        alt: 'Inteligentní stáj – ovládání plachet',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/stable/sensors.png',
        alt: 'Inteligentní stáj – přehled senzorů',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/stable/light-control.png',
        alt: 'Inteligentní stáj – ovládání osvětlení',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
    ],
  },
  {
    id: 'auth-flow',
    title: 'Firebase Auth Flow pro Flutter',
    description:
      'Open-source Flutter package s uživatelským rozhraním pro přihlášení a registraci k Firebase pomocí e-mailové adresy.',
    secondaryDescription:
      'Balíček nabízí kompletní přihlašovací flow připravenou k integraci do mobilní aplikace. Dostupný veřejně zde:',
    secondaryLink: {
      href: 'https://github.com/smolikja-team/firebase-auth-flow',
      label: 'https://github.com/smolikja-team/firebase-auth-flow',
    },
    images: [
      {
        src: 'https://smolikja.team/assets/projects/auth-flow/login.png',
        alt: 'Firebase Auth Flow – přihlašovací obrazovka',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/auth-flow/registration.png',
        alt: 'Firebase Auth Flow – registrační formulář',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
      {
        src: 'https://smolikja.team/assets/projects/auth-flow/confirmation.png',
        alt: 'Firebase Auth Flow – potvrzení registrace',
        width: PORTRAIT_WIDTH,
        height: PORTRAIT_HEIGHT,
      },
    ],
  },
];
