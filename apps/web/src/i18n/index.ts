import { ar, type TranslationKeys } from "./ar";

type Language = "ar" | "en";

let currentLang: Language = "ar";

const translations: Record<Language, TranslationKeys> = {
  ar,
  en: ar, // For now, Arabic is the default and only language
};

export function t(path: string): string {
  const keys = path.split(".");
  let result: unknown = translations[currentLang];
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof result === "string" ? result : path;
}

export function setLanguage(lang: Language) {
  currentLang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;
}

export function getLanguage(): Language {
  return currentLang;
}

export { ar };
export type { Language, TranslationKeys };
