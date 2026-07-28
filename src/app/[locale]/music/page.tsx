import { MusicContent } from "./MusicContent";
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
    keywords: [...t.seo.keywords],
    alternates: {
      canonical: `https://bymuja.com/${validLocale}/music`,
    },
    openGraph: {
      title: t.music.title,
      description: t.music.description,
      url: `https://bymuja.com/${validLocale}/music`,
      type: "website",
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

  return <MusicContent locale={validLocale} t={dict.music} />;
}
