import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://iammawja.com"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/img/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/img/favicon.ico?v=3",
    apple: "/img/apple-touch-icon.png?v=3",
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
      en: "https://iammawja.com/en",
      ar: "https://iammawja.com/ar",
      fr: "https://iammawja.com/fr",
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
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MDTS748Z');`,
          }}
        />
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
          title="iammawja.com RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="iammawja.com Atom Feed"
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
        <link rel="me" href="https://github.com/iammawja" />
        <link rel="me" href="https://linkedin.com/in/iammawja" />
        <link rel="me" href="https://x.com/iammawja" />
        <link rel="me" href="https://twitter.com/iammawja" />
        <link rel="me" href="https://instagram.com/iammawja" />
        <link rel="me" href="https://dev.to/iammawja" />
        <link rel="me" href="https://reddit.com/user/iammawja" />
        <link rel="me" href="https://youtube.com/@iammawja" />
        <link rel="me" href="https://soundcloud.com/iammawja" />
        <link rel="me" href="https://tiktok.com/@iammawja" />
        <link
          rel="me"
          href="https://open.spotify.com/artist/24n3um6erIOUxobs69qDPX"
        />
        <link
          rel="me"
          href="https://music.apple.com/fr/artist/mawja/6800033494"
        />
        <link rel="me" href="https://music.youtube.com/@mawjaofficial" />
        <link rel="me" href="https://www.deezer.com/en/artist/409144252" />
        <link rel="me" href="https://play.anghami.com/artist/29651679" />
        <link rel="me" href="https://iammawja.bandcamp.com" />
        <link rel="me" href="https://tidal.com/browse/artist/iammawja" />
        <link rel="me" href="https://music.amazon.fr/artists/B0HDMF43R7" />
        <link rel="me" href="https://www.pandora.com/artist/iammawja" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDTS748Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>{children}</ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JPRYP7ED57"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JPRYP7ED57');`}
        </Script>
      </body>
    </html>
  );
}
