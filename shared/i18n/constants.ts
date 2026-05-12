export const LOCALE_COOKIE_NAME = "app-locale";

export const LOCALE_STORAGE_KEY = "app-locale";

export const APP_LOCALES = ["ko", "en"] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "ko";

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return value === "ko" || value === "en";
}

export function parseLocaleCookie(raw: string | undefined | null): AppLocale {
  return isAppLocale(raw) ? raw : DEFAULT_LOCALE;
}
