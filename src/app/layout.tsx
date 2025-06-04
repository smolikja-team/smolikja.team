import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Basic metadata
  title: "smolikja team - Vývoj mobilních aplikací | iOS, Android & Flutter",
  description: "Tým pro vývoj mobilních aplikací se specializací na B2B a B2C řešení. Více než 5 let zkušeností s vývojem iOS a Android aplikací, používáme také Flutter pro multiplatformní řešení. K dispozici pro nové projekty, mentoring i vedoucí role. | iOS and Android development team specializing in B2B and B2C solutions. 5+ years experience building mobile apps, we also use Flutter for cross-platform projects.",
  
  // Comprehensive keywords for SEO and AI discovery
  keywords: [
    // Czech keywords (primary market)
    "vývojář mobilních aplikací", "iOS vývojář", "Android vývojář", "Flutter vývojář",
    "multiplatformní vývoj", "vývoj mobilních aplikací Česko",
    "B2B mobilní aplikace", "B2C řešení", "greenfield projekty",
    "nativní iOS vývoj", "nativní Android vývoj", "webové aplikace",
    "softwarová architektura", "projektové řízení", "mentoring týmu",
    "komunikace s klienty", "plánování projektů", "efektivnost zdrojů",
    "technické vedení", "manažerská role", "český vývojář",
    "smolikja", "smolikja team", "mobilní aplikace na míru",
    "outsourcing vývoje aplikací", "freelance vývojář",
    "iOS aplikace na míru", "Android aplikace na míru",
    
    // English keywords (secondary)
    "mobile app developer", "iOS developer", "Android developer", "Flutter developer",
    "cross-platform development", "B2B mobile apps", "B2C solutions", "greenfield applications",
    "iOS native development", "Android native development", "web applications",
    "software architecture", "project management", "team mentoring",
    "client communication", "project planning", "resource efficiency",
    "technical leadership", "management role", "Czech developer",
    "mobile development team", "app development outsourcing"
  ],
  
  // Author and creator information
  authors: [{ 
    name: "smolikja team", 
    url: "https://smolikja.team" 
  }],
  creator: "smolikja team",
  publisher: "smolikja team",
  
  // Technical metadata
  metadataBase: new URL('https://smolikja.team'),
  alternates: {
    canonical: "https://smolikja.team",
    languages: {
      'cs': "https://smolikja.team",
      'en': "https://smolikja.team",
      'x-default': "https://smolikja.team"
    }
  },
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    title: "smolikja team - Vývoj mobilních aplikací | iOS, Android & Flutter",
    description: "Tým pro vývoj iOS a Android aplikací s více než 5 lety zkušeností. Vytváříme mobilní aplikace pro firmy i koncové uživatele, používáme také Flutter pro multiplatformní projekty.",
    url: "https://smolikja.team",
    siteName: "smolikja team",
    locale: "cs_CZ",
    alternateLocale: "en_US",
    images: [
      {
        url: "https://smolikja.team/assets/portfolio-web/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "smolikja team - Vývoj mobilních aplikací"
      }
    ]
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@smolikja",
    creator: "@smolikja",
    title: "smolikja team - Vývoj mobilních aplikací | iOS, Android & Flutter",
    description: "5+ let zkušeností s vývojem mobilních aplikací. Vytváříme iOS a Android aplikace, používáme také Flutter. B2B a B2C projekty.",
    images: ["https://smolikja.team/assets/portfolio-web/twitter-card.jpg"]
  },
  
  // Additional metadata for AI agents and crawlers
  other: {
    // Professional information for AI agents (Czech primary)
    "ai:professional-title": "Tým pro Vývoj Mobilních Aplikací",
    "ai:professional-title-en": "Mobile App Development Team",
    "ai:experience-years": "5",
    "ai:location": "Česká republika",
    "ai:location-en": "Czech Republic",
    "ai:specializations": "iOS a Android Nativní Vývoj, Flutter Cross-Platform, B2B/B2C Aplikace",
    "ai:specializations-en": "iOS and Android Native Development, Flutter Cross-Platform, B2B/B2C Applications",
    "ai:technical-skills": "iOS, Swift, Android, Kotlin, Java, Flutter, Dart, JavaScript, TypeScript, Software Architecture, Project Management",
    "ai:soft-skills": "Team Mentoring, Client Communication, Technical Leadership, Project Planning, Resource Management",
    "ai:availability": "K dispozici pro freelance, kontraktní a full-time příležitosti",
    "ai:availability-en": "Available for freelance, contract, and full-time opportunities",
    "ai:languages": "Čeština, Angličtina",
    "ai:languages-en": "Czech, English",
    "ai:career-focus": "Nabízíme technickou expertízu i manažerské schopnosti pro český i mezinárodní trh",
    "ai:market-focus": "Český trh s možností mezinárodních projektů",
    
    // Contact and portfolio information
    "contact:email": "contact@smolikja.team",
    "contact:website": "https://smolikja.team",
    "contact:location": "Česká republika",
    "portfolio:type": "Portfolio Vývoje Mobilních Aplikací",
    "portfolio:type-en": "Mobile App Development Portfolio",
    "portfolio:projects": "B2B, B2C Mobilní Aplikace",
    "portfolio:market": "Český a mezinárodní trh",
    
    // SEO enhancement
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
    
    // Rich snippets data
    "schema:type": "Organization",
    "schema:name": "smolikja team",
    "schema:legalName": "smolikja team",
    "schema:description": "Tým pro Vývoj Mobilních Aplikací",
    "schema:description-en": "Mobile App Development Team",
    "schema:url": "https://smolikja.team",
    "schema:addressLocality": "Praha",
    "schema:addressCountry": "CZ"
  },
  
  // Robots directive
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  
  // App information
  applicationName: "smolikja team Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Additional language and region support */}
        <link rel="alternate" hrefLang="cs" href="https://smolikja.team" />
        <link rel="alternate" hrefLang="en" href="https://smolikja.team" />
        <link rel="alternate" hrefLang="x-default" href="https://smolikja.team" />
        
        {/* Structured Data for Search Engines and AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "smolikja team",
              "alternateName": "smolikja",
              "description": "Vytváříme mobilní aplikace pro firmy i koncové uživatele. Máme více než 5 let zkušeností s iOS a Android aplikacemi, používáme také Flutter pro multiplatformní řešení.",
              "url": "https://smolikja.team",
              "sameAs": [
                "https://smolikja.team",
                "https://github.com/smolikja-team",
                "https://linkedin.com/in/smolikja"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "CZ"
              },
              "foundingLocation": {
                "@type": "Place",
                "name": "Česká republika"
              },
              "knowsAbout": [
                "Vývoj iOS aplikací",
                "Vývoj Android aplikací",
                "Flutter development",
                "Architektura mobilních aplikací",
                "Multiplatformní vývoj",
                "B2B řešení",
                "B2C mobilní aplikace",
                "Projektové řízení",
                "Technické vedení"
              ],
              "makesOffer": {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Služby Vývoje Mobilních Aplikací",
                  "description": "Vývoj mobilních aplikací - iOS a Android nativní aplikace, Flutter cross-platform řešení, projekty pro firmy i koncové uživatele, technické vedení týmů"
                }
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Služby Mobilního Vývoje",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Nativní iOS Vývoj"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Nativní Android Vývoj"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Flutter Cross-Platform Vývoj"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "B2B/B2C Mobilní Aplikace"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Professional Portfolio/Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "smolikja team - Portfolio Vývoje Mobilních Aplikací",
              "alternateName": "smolikja team",
              "url": "https://smolikja.team",
              "description": "Naše portfolio mobilních aplikací - ukázky iOS a Android projektů, Flutter cross-platform řešení pro firmy i koncové uživatele.",
              "inLanguage": ["cs", "en"],
              "publisher": {
                "@type": "Organization",
                "name": "smolikja team"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
