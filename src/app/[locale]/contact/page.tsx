import { type Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import ContactForm from "./ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const dict = getDictionary(validLocale);

  return <ContactForm locale={validLocale} t={dict.contact} />;
}
