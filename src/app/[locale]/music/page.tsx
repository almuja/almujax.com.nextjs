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
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const t = getDictionary(validLocale);

  return {
    title: t.music.title,
    description: t.music.description,
    keywords: [
      ...t.seo.keywords,
      "rapper",
      "mawja",
      "iammawja",
      "album",
      "single",
      "release",
      "streaming",
      "playlist",
      "Mawja rapper",
      "Sudanese rapper",
      "Arabic rapper",
    ],
    alternates: {
      canonical: `https://iammawja.com/${validLocale}/music`,
      languages: {
        en: "https://iammawja.com/en/music",
        ar: "https://iammawja.com/ar/music",
        fr: "https://iammawja.com/fr/music",
      },
    },
    openGraph: {
      title: t.music.title,
      description: t.music.description,
      url: `https://iammawja.com/${validLocale}/music`,
      type: "music.playlist",
      images: ["https://iammawja.com/img/profile.png?v=3"],
      siteName: "Mawja",
    },
    twitter: {
      card: "summary_large_image",
      title: t.music.title,
      description: t.music.description,
      images: ["https://iammawja.com/img/profile.png?v=3"],
      site: "@iammawja",
      creator: "@iammawja",
    },
    other: {
      "geo.region": "FR",
      "geo.placename": "France",
      "geo.position": "46.603354;1.888334",
      ICBM: "46.603354, 1.888334",
      "DC.creator": "Mujahid Siyam",
      "DC.subject":
        "Music, Rapper, Sudanese Rapper, Arabic Rap, Middle Eastern Rap, Sudanese Rap, African Rap, Hip Hop, Playlists, Streaming",
      music:
        "rapper, arabic rap, middle eastern rap, sudanese rap, african rap, hip hop",
    },
  };
}

export default async function MusicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const dict = getDictionary(validLocale);

  return (
    <>
      <MusicArtistStructuredData />
      <BreadcrumbStructuredData
        items={[
          {
            name: validLocale === "ar" ? "الرئيسية" : "Home",
            url: `https://iammawja.com/${validLocale}`,
          },
          {
            name: dict.music.heading,
            url: `https://iammawja.com/${validLocale}/music`,
          },
        ]}
      />
      <MusicContent locale={validLocale} t={dict.music} />
    </>
  );
}
