import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  PersonStructuredData,
  WebSiteStructuredData,
} from "./components/StructuredData";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Mujahid Siyam",
    default: "Mujahid Siyam (Muja / bymuja) | Software & AI Engineer",
  },
  description:
    "Mujahid Siyam, also known as Muja (bymuja), is a Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist building AI-first systems and creative technology. Official website of Mujahid Mohamed Ismail Siyam.",
  keywords: [
    "Mujahid Siyam",
    "Muja",
    "bymuja",
    "AI Engineer",
    "Software Engineer",
    "Rust Developer",
    "DevSecOps",
    "Music Artist",
    "AI Tools",
    "Programming",
    "Artificial Intelligence",
    "Open Source",
    "Rust",
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "full-stack developer",
    "Zaroxi Studio",
  ],
  authors: [{ name: "Mujahid Siyam", url: "https://bymuja.com" }],
  metadataBase: new URL("https://bymuja.com"),
  alternates: {
    canonical: "https://bymuja.com",
  },
  openGraph: {
    title: "Mujahid Siyam (Muja / bymuja) | Software & AI Engineer",
    description:
      "Mujahid Siyam, also known as Muja (bymuja), is a Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist building AI-first systems and creative technology.",
    type: "website",
    url: "https://bymuja.com",
    images: [
      {
        url: "https://bymuja.com/img/profile.png",
        width: 1200,
        height: 630,
        alt: "Mujahid Siyam (Muja / bymuja)",
      },
    ],
    siteName: "bymuja.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mujahid Siyam (Muja / bymuja) | Software & AI Engineer",
    description:
      "Mujahid Siyam, aka Muja (bymuja) — Software Engineer, AI Engineer, DevSecOps, and Music Artist.",
    images: ["https://bymuja.com/img/profile.png"],
    site: "@bymuja",
    creator: "@bymuja",
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
  manifest: "/manifest.json",
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  category: "technology",
  creator: "Mujahid Siyam",
  publisher: "Mujahid Siyam",
  verification: {},
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
        <meta
          name="DC.title"
          content="Mujahid Siyam (Muja / bymuja) | Software & AI Engineer"
        />
        <meta name="DC.creator" content="Mujahid Siyam" />
        <meta
          name="DC.subject"
          content="Software Engineering, Artificial Intelligence, AI Engineer, Rust Developer, DevSecOps, Music Artist, Programming"
        />
        <meta
          name="DC.description"
          content="Mujahid Siyam, also known as Muja (bymuja), is a Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist building AI-first systems and creative technology."
        />
        <meta name="DC.publisher" content="Mujahid Siyam" />
        <meta name="DC.date" content="2025" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.language" content="en" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="bymuja.com Blog RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="bymuja.com Blog Atom Feed"
          href="/atom.xml"
        />
        <link
          rel="llm"
          type="text/plain"
          title="LLMs.txt for AI discovery"
          href="/llms.txt"
        />
        <link
          rel="llm-full"
          type="text/plain"
          title="Full content for AI indexing"
          href="/llms-full.txt"
        />
      </head>
      <body className="antialiased font-mono" suppressHydrationWarning>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-[#0a0f1c] dark:via-[#0f172a] dark:to-[#1e1b4b] relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 pt-14">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
