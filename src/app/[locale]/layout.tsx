import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DirManager from "../components/DirManager";
import HreflangLinks from "../components/HreflangLinks";

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
      template: validLocale === "ar"
        ? `%s | موجا (موجة) — مجاهد صيام`
        : `%s | Mawja (Mujahid Siyam)`,
      default: dict.site.defaultTitle,
    },
    description: dict.site.description,
    keywords: [...dict.seo.keywords],
    authors: [{ name: "Mujahid Siyam", url: "https://itsmawja.com" }],
    alternates: {
      canonical: `https://itsmawja.com/${validLocale}`,
    },
    openGraph: {
      title: dict.site.defaultTitle,
      description: dict.site.description,
      type: "website",
      locale: validLocale === "ar" ? "ar_SA" : validLocale === "fr" ? "fr_FR" : "en_US",
      siteName: "itsmawja.com",
      images: [
        {
          url: "https://itsmawja.com/img/profile.png",
          width: 1200,
          height: 630,
          alt: "Mawja (Mujahid Siyam)",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.defaultTitle,
      description: dict.site.description,
      images: ["https://itsmawja.com/img/profile.png"],
      site: "@itsmawja",
      creator: "@itsmawja",
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
  const dict = getDictionary(validLocale);
  const authorName = validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam";

  return (
    <>
      <DirManager locale={validLocale} />
      <HreflangLinks locale={validLocale} />
      <Header locale={validLocale} dict={{ blog: { authorBio: dict.blog.authorBio } }} nav={dict.nav} />
      <main className="flex-1 pt-14">{children}</main>
      <Footer locale={validLocale} footer={dict.footer} authorBio={dict.blog.authorBio} authorName={authorName} />
    </>
  );
}
