import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale, localeDirections } from "@/i18n/config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const dict = getDictionary(validLocale);

  return {
    title: {
      template: `%s | Mujahid Siyam (Muja / bymuja)`,
      default: dict.site.defaultTitle,
    },
    description: dict.site.description,
    keywords: [...dict.seo.keywords],
    authors: [{ name: "Mujahid Siyam", url: "https://bymuja.com" }],
    alternates: {
      canonical: `https://bymuja.com/${validLocale}`,
      languages: {
        en: "https://bymuja.com/en",
        ar: "https://bymuja.com/ar",
        fr: "https://bymuja.com/fr",
      },
    },
    openGraph: {
      title: dict.site.defaultTitle,
      description: dict.site.description,
      type: "website",
      locale: validLocale === "ar" ? "ar_SA" : validLocale === "fr" ? "fr_FR" : "en_US",
      siteName: "bymuja.com",
      images: [
        {
          url: "https://bymuja.com/img/profile.png",
          width: 1200,
          height: 630,
          alt: "Mujahid Siyam (Muja / bymuja)",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.defaultTitle,
      description: dict.site.description,
      images: ["https://bymuja.com/img/profile.png"],
      site: "@bymuja",
      creator: "@bymuja",
    },
    category: "technology",
    creator: "Mujahid Siyam",
    publisher: "Mujahid Siyam",
    other: {
      "geo.region": "FR",
      "geo.placename": "France",
      "geo.position": "46.603354;1.888334",
      ICBM: "46.603354, 1.888334",
      "DC.creator": "Mujahid Siyam",
      "DC.subject": dict.seo.dcSubject,
      "DC.description": dict.site.description,
      "DC.publisher": "Mujahid Siyam",
      "DC.language": validLocale,
    },
  };
}

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
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const dir = localeDirections[validLocale];
  const htmlLang = validLocale === "ar" ? "ar" : validLocale === "fr" ? "fr" : "en";

  return (
    <>
      <Script id="locale-direction">{`
        document.documentElement.lang = "${htmlLang}";
        document.documentElement.dir = "${dir}";
      `}</Script>
      {locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={loc}
          href={`https://bymuja.com/${loc}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href="https://bymuja.com/en" />
      <Header />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </>
  );
}
