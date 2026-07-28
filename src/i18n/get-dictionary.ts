import type { Locale } from "./config";
import en from "./dictionaries/en";
import ar from "./dictionaries/ar";
import fr from "./dictionaries/fr";

const dictionaries = { en, ar, fr } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = ReturnType<typeof getDictionary>;
