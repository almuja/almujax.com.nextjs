import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { type Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  OrganizationStructuredData,
  PersonStructuredData,
  SoftwareApplicationStructuredData,
  WebSiteStructuredData,
} from "../components/StructuredData";
import { ThemeProvider } from "../components/ThemeProvider";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const dict = getDictionary(validLocale);

  return {
    metadataBase: new URL("https://almujax.com"),
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/img/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/img/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/img/favicon.ico",
      apple: "/img/apple-touch-icon.png",
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
    title: {
      template:
        validLocale === "ar"
          ? `%s | الموجا (الموجة) — مجاهد صيام`
          : `%s | Almuja (Mujahid Siyam)`,
      default: dict.site.defaultTitle,
    },
    description: dict.site.description,
    authors: [{ name: "Mujahid Siyam", url: "https://almujax.com" }],
    openGraph: {
      title: dict.site.defaultTitle,
      description: dict.site.description,
      type: "website",
      locale:
        validLocale === "ar"
          ? "ar_SA"
          : validLocale === "fr"
            ? "fr_FR"
            : "en_US",
      siteName: "Almuja",
      images: [
        {
          url: "https://almujax.com/img/profile-engineer-1200x630.png",
          width: 1200,
          height: 630,
          alt: "Mujahid Siyam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.defaultTitle,
      description: dict.site.description,
      images: ["https://almujax.com/img/profile-engineer-1200x630.png"],
      site: "@almujax",
      creator: "@almujax",
    },
    category: "technology",
    creator: "Mujahid Siyam",
    publisher: "Mujahid Siyam",
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const lang = validLocale === "ar" ? "ar" : validLocale === "fr" ? "fr" : "en";
  const dir = validLocale === "ar" ? "rtl" : "ltr";
  const dict = getDictionary(validLocale);
  const authorName = validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
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
            __html: `try{var d=document.documentElement.classList;var s=localStorage.getItem('almuja-theme');if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.add('dark')}else{d.remove('dark')}}catch(e){}`,
          }}
        />
        <PersonStructuredData />
        <SoftwareApplicationStructuredData />
        <OrganizationStructuredData />
        <WebSiteStructuredData />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="almujax.com RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="almujax.com Atom Feed"
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
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDTS748Z"
            title="Google Tag Manager"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>
          <Header
            locale={validLocale}
            dict={{ blog: { authorBio: dict.blog.authorBio } }}
            nav={dict.nav}
          />
          <main className="flex-1 pt-14">{children}</main>
          <Footer
            locale={validLocale}
            footer={dict.footer}
            authorBio={dict.blog.authorBio}
            authorName={authorName}
          />
        </ThemeProvider>
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
