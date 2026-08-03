import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  PersonStructuredData,
  PerformingArtistStructuredData,
  SoftwareApplicationStructuredData,
  MusicArtistStructuredData,
  OrganizationStructuredData,
  WebSiteStructuredData,
} from "./components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://itsmawja.com"),
  manifest: "/manifest.json",
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
    verification: {
      google: "ADD_YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN",
      yandex: "ADD_YOUR_YANDEX_WEBMASTER_TOKEN",
    },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    languages: {
      en: "https://itsmawja.com/en",
      ar: "https://itsmawja.com/ar",
      fr: "https://itsmawja.com/fr",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement.classList;var s=localStorage.getItem('mawja-theme');if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.add('dark')}else{d.remove('dark')}}catch(e){}`,
          }}
        />
        <PersonStructuredData />
        <PerformingArtistStructuredData />
        <SoftwareApplicationStructuredData />
        <MusicArtistStructuredData />
        <OrganizationStructuredData />
        <WebSiteStructuredData />
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="France" />
        <meta name="geo.position" content="46.603354;1.888334" />
        <meta name="ICBM" content="46.603354, 1.888334" />
        <meta name="language" content="English, Arabic, French" />
        <meta name="content-language" content="en, ar, fr" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="itsmawja.com RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="itsmawja.com Atom Feed"
          href="/atom.xml"
        />
        <link
          rel="alternate"
          type="text/plain"
          title="LLMs.txt — Context for AI systems"
          href="/llms.txt"
        />
        <link
          rel="alternate"
          type="text/plain"
          title="Full content for AI indexing"
          href="/llms-full.txt"
        />
        <link rel="me" href="https://github.com/itsmawja" />
        <link rel="me" href="https://linkedin.com/in/itsmawja" />
        <link rel="me" href="https://x.com/itsmawja" />
        <link rel="me" href="https://twitter.com/itsmawja" />
        <link rel="me" href="https://instagram.com/itsmawja" />
        <link rel="me" href="https://dev.to/itsmawja" />
        <link rel="me" href="https://reddit.com/user/itsmawja" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
