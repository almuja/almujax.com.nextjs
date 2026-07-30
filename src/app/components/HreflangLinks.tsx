"use client";

import { usePathname } from "next/navigation";

interface HreflangLinksProps {
  locale: string;
}

export default function HreflangLinks({ locale }: HreflangLinksProps) {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

  const locales = {
    en: "https://itsmawja.com/en" + pathWithoutLocale,
    ar: "https://itsmawja.com/ar" + pathWithoutLocale,
    fr: "https://itsmawja.com/fr" + pathWithoutLocale,
  };

  return (
    <>
      {Object.entries(locales).map(([loc, href]) => (
        <link key={loc} rel="alternate" hrefLang={loc} href={href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={"https://itsmawja.com/en" + pathWithoutLocale} />
    </>
  );
}
