import type { Locale } from "./config";
import ar from "./dictionaries/ar";
import en from "./dictionaries/en";
import fr from "./dictionaries/fr";

const dictionaries = { en, ar, fr } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = ReturnType<typeof getDictionary>;
