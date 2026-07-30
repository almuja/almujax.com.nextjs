import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  PersonStructuredData,
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
  verification: {},
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
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonStructuredData />
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
        <link rel="llm" type="text/plain" title="LLMs.txt" href="/llms.txt" />
        <link rel="llm-full" type="text/plain" title="Full content" href="/llms-full.txt" />
      </head>
      <body className="antialiased font-mono" suppressHydrationWarning>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-[#0a0f1c] dark:via-[#0f172a] dark:to-[#1e1b4b] relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
