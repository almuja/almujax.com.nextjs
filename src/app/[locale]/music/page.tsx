import { MusicContent } from "./MusicContent";
import { BreadcrumbStructuredData } from "../../components/BreadcrumbJsonLd";
import { MusicArtistStructuredData } from "../../components/StructuredData";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const t = getDictionary(validLocale);

  return {
    title: t.music.title,
    description: t.music.description,
    keywords: [...t.seo.keywords, "album", "single", "release", "streaming", "playlist"],
    alternates: {
      canonical: `https://itsmawja.com/${validLocale}/music`,
      languages: {
        en: "https://itsmawja.com/en/music",
        ar: "https://itsmawja.com/ar/music",
        fr: "https://itsmawja.com/fr/music",
      },
    },
    openGraph: {
      title: t.music.title,
      description: t.music.description,
      url: `https://itsmawja.com/${validLocale}/music`,
      type: "music.playlist",
      images: ["https://itsmawja.com/img/profile.png"],
      siteName: "itsmawja.com",
    },
    twitter: {
      card: "summary_large_image",
      title: t.music.title,
      description: t.music.description,
      images: ["https://itsmawja.com/img/profile.png"],
      site: "@itsmawja",
      creator: "@itsmawja",
    },
    other: {
      "geo.region": "FR",
      "geo.placename": "France",
      "geo.position": "46.603354;1.888334",
      ICBM: "46.603354, 1.888334",
      "DC.creator": "Mujahid Siyam",
      "DC.subject": "Music, Arabic Rap, Sudanese Rap, Playlists, Streaming",
      music: "arabic rap, sudanese rap, hip hop",
    },
  };
}

export default async function MusicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const dict = getDictionary(validLocale);

  return (
    <>
      <MusicArtistStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: validLocale === "ar" ? "الرئيسية" : "Home", url: `https://itsmawja.com/${validLocale}` },
          { name: dict.music.heading, url: `https://itsmawja.com/${validLocale}/music` },
        ]}
      />
      <MusicContent locale={validLocale} t={dict.music} />
    </>
  );
}
