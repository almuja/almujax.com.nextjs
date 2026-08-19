"use client";

import { usePathname } from "next/navigation";

export default function HreflangLinks() {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

  const locales = {
    en: `https://almujax.com/en${pathWithoutLocale}`,
    ar: `https://almujax.com/ar${pathWithoutLocale}`,
    fr: `https://almujax.com/fr${pathWithoutLocale}`,
  };

  return (
    <>
      {Object.entries(locales).map(([loc, href]) => (
        <link key={loc} rel="alternate" hrefLang={loc} href={href} />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`https://almujax.com/en${pathWithoutLocale}`}
      />
    </>
  );
}
