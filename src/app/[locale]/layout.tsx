import type { Metadata } from "next";
import { type Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import DirManager from "../components/DirManager";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HreflangLinks from "../components/HreflangLinks";

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
    title: {
      template:
        validLocale === "ar"
          ? `%s | الموجا (الموجة) — مجاهد صيام`
          : `%s | Almuja (Mujahid Siyam)`,
      default: dict.site.defaultTitle,
    },
    description: dict.site.description,
    keywords: [...dict.seo.keywords],
    authors: [{ name: "Mujahid Siyam", url: "https://almujax.com" }],
    alternates: {
      canonical: `https://almujax.com/${validLocale}`,
    },
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
          url: "https://almujax.com/img/profile.png?v=3",
          width: 1200,
          height: 630,
          alt: "Almuja (Mujahid Siyam)",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.defaultTitle,
      description: dict.site.description,
      images: ["https://almujax.com/img/profile.png?v=3"],
      site: "@almujax",
      creator: "@almujax",
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
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const dict = getDictionary(validLocale);
  const authorName = validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam";

  return (
    <>
      <DirManager locale={validLocale} />
      <HreflangLinks />
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
    </>
  );
}
