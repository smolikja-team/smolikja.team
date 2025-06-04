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
  title: "smolikja team",
  description: "Professional mobile app development team specializing in B2B, B2G, and B2C solutions. 4+ years expertise in iOS native and Flutter cross-platform development. Available for greenfield projects, mentoring, and management roles. | Profesionální tým pro vývoj mobilních aplikací specializující se na B2B, B2G a B2C řešení. 4+ let zkušeností s nativním iOS a Flutter cross-platform vývojem.",
  
  // Comprehensive keywords for SEO and AI discovery
  keywords: [
    // English keywords
    "mobile app developer", "iOS developer", "Flutter developer", "cross-platform development",
    "B2B mobile apps", "B2G applications", "B2C solutions", "greenfield applications",
    "iOS native development", "Android development", "web applications",
    "software architecture", "project management", "team mentoring",
    "client communication", "project planning", "resource efficiency",
    "technical leadership", "management role", "Czech Republic developer",
    "smolikja", "smolikja team", "mobile development team",
    
    // Czech keywords
    "vývojář mobilních aplikací", "iOS vývojář", "Flutter vývojář", "multiplatformní vývoj",
    "B2B mobilní aplikace", "B2G aplikace", "B2C řešení", "greenfield projekty",
    "nativní iOS vývoj", "Android vývoj", "webové aplikace",
    "softwarová architektura", "projektové řízení", "mentoring týmu",
    "komunikace s klienty", "plánování projektů", "efektivnost zdrojů",
    "technické vedení", "manažerská role", "český vývojář"
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
      'en': "https://smolikja.team",
      'cs': "https://smolikja.team"
    }
  },
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    title: "smolikja team - Mobile App Development | B2B, B2G, B2C Solutions",
    description: "Professional mobile app development team with 4+ years in iOS native and Flutter cross-platform development. Specializing in B2B, B2G, B2C solutions, greenfield projects, and technical leadership.",
    url: "https://smolikja.team",
    siteName: "smolikja team",
    locale: "en_US",
    alternateLocale: "cs_CZ",
    images: [
      {
        url: "https://smolikja.team/assets/portfolio-web/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "smolikja team - Mobile App Development Portfolio"
      }
    ]
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@smolikja",
    creator: "@smolikja",
    title: "smolikja team - Mobile App Development | iOS & Flutter Expert",
    description: "4+ years of mobile app development experience. B2B, B2G, B2C solutions. iOS native & Flutter cross-platform expertise. Available for projects & management roles.",
    images: ["https://smolikja.team/assets/portfolio-web/twitter-card.jpg"]
  },
  
  // Additional metadata for AI agents and crawlers
  other: {
    // Professional information for AI agents
    "ai:professional-title": "Mobile App Development Team",
    "ai:experience-years": "4",
    "ai:specializations": "iOS Native Development, Flutter Cross-Platform, B2B/B2G/B2C Solutions",
    "ai:technical-skills": "iOS, Swift, Flutter, Dart, Android, JavaScript, TypeScript, Software Architecture, Project Management",
    "ai:soft-skills": "Team Mentoring, Client Communication, Technical Leadership, Project Planning, Resource Management",
    "ai:availability": "Available for freelance, contract, and full-time opportunities",
    "ai:location": "Czech Republic",
    "ai:languages": "English, Czech",
    "ai:career-focus": "Offering both technical expertise and management capabilities",
    
    // Czech professional information
    "ai:professional-title-cs": "Tým pro Vývoj Mobilních Aplikací",
    "ai:specializations-cs": "Nativní iOS Vývoj, Flutter Cross-Platform, B2B/B2G/B2C Řešení",
    "ai:career-focus-cs": "Nabízíme technickou expertízu i manažerské schopnosti",
    
    // Contact and portfolio information
    "contact:email": "contact@smolikja.team",
    "contact:website": "https://smolikja.team",
    "portfolio:type": "Mobile App Development Portfolio",
    "portfolio:projects": "B2B, B2G, B2C Mobile Applications",
    
    // SEO enhancement
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
    
    // Rich snippets data
    "schema:type": "Organization",
    "schema:name": "smolikja team",
    "schema:legalName": "smolikja team",
    "schema:description": "Mobile App Development Team",
    "schema:url": "https://smolikja.team"
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
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Additional language and region support */}
        <link rel="alternate" hrefLang="en" href="https://smolikja.team" />
        <link rel="alternate" hrefLang="cs" href="https://smolikja.team/cs" />
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
              "description": "Professional mobile app development team specializing in B2B, B2G, and B2C solutions with 4+ years of expertise in iOS native and Flutter cross-platform development.",
              "url": "https://smolikja.team",
              "sameAs": [
                "https://smolikja.team",
                "https://github.com/smolikja",
                "https://linkedin.com/in/smolikja"
              ],
              "foundingLocation": {
                "@type": "Country",
                "name": "Czech Republic"
              },
              "knowsAbout": [
                "iOS Development",
                "Flutter Development", 
                "Mobile App Architecture",
                "Cross-platform Development",
                "B2B Solutions",
                "B2G Applications",
                "B2C Mobile Apps",
                "Project Management",
                "Team Leadership"
              ],
              "makesOffer": {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Mobile App Development Services",
                  "description": "Professional mobile app development including iOS native, Flutter cross-platform, B2B/B2G/B2C solutions, project management, and technical leadership"
                }
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Mobile Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "iOS Native Development"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Flutter Cross-Platform Development"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "B2B/B2G/B2C Mobile Solutions"
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
              "name": "smolikja team - Mobile App Development Portfolio",
              "alternateName": "smolikja team",
              "url": "https://smolikja.team",
              "description": "Professional portfolio showcasing mobile app development expertise in B2B, B2G, and B2C solutions. Featuring iOS native and Flutter cross-platform projects.",
              "inLanguage": ["en", "cs"],
              "publisher": {
                "@type": "Organization",
                "name": "smolikja team"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://smolikja.team/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
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
