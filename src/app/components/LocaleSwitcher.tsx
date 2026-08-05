"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

interface LocaleSwitcherProps {
  locale: string;
}

const locales = {
  en: { label: "EN", name: "English", dir: "ltr" },
  ar: { label: "AR", name: "العربية", dir: "rtl" },
  fr: { label: "FR", name: "Français", dir: "ltr" },
};

export default function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(newLocale: string) {
    const info = locales[newLocale as keyof typeof locales] || locales.en;
    document.documentElement.lang =
      newLocale === "ar" ? "ar" : newLocale === "fr" ? "fr" : "en";
    document.documentElement.dir = info.dir;
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && ["en", "ar", "fr"].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push("/" + segments.join("/"));
    setOpen(false);
  }

  const current = locales[locale as keyof typeof locales] || locales.en;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/30 transition-colors"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span>{current.label}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-border bg-card shadow-xl backdrop-blur-xl z-50 overflow-hidden">
          {(Object.keys(locales) as Array<keyof typeof locales>).map((key) => (
            <button
              key={key}
              onClick={() => switchLocale(key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted/30 ${
                key === locale
                  ? "text-primary font-semibold bg-primary/5"
                  : "text-foreground/70"
              }`}
            >
              <span className="text-xs font-bold w-6">
                {locales[key].label}
              </span>
              <span>{locales[key].name}</span>
              {key === locale && (
                <svg
                  className="w-4 h-4 ml-auto text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
