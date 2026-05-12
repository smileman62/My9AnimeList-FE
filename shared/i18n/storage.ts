import { LOCALE_COOKIE_NAME, LOCALE_STORAGE_KEY, type AppLocale } from "@/shared/i18n/constants";

const ONE_YEAR_SEC = 60 * 60 * 24 * 365;

export function persistLocaleClient(locale: AppLocale) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // ignore quota / private mode
  }
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale};path=/;max-age=${ONE_YEAR_SEC};SameSite=Lax`;
}

export function readLocaleFromStorage(): AppLocale | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (v === "ko" || v === "en") return v;
  } catch {
    // ignore
  }
  return null;
}
