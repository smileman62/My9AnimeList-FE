"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { AppLocale } from "@/shared/i18n/constants";
import { persistLocaleClient, readLocaleFromStorage } from "@/shared/i18n/storage";
import {
  interpolate,
  translate,
  type MessagesByLocale,
} from "@/shared/i18n/translate";

type I18nContextValue = {
  locale: AppLocale;
  setLocale: (next: AppLocale) => void;
  t: (key: string) => string;
  tx: (key: string, vars: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  initialLocale: AppLocale;
  messages: MessagesByLocale;
  children: ReactNode;
};

export function I18nProvider({
  initialLocale,
  messages,
  children,
}: I18nProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<AppLocale>(initialLocale);

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    const stored = readLocaleFromStorage();
    if (stored && stored !== initialLocale) {
      persistLocaleClient(stored);
      router.refresh();
    }
  }, [initialLocale, router]);

  const setLocale = useCallback(
    (next: AppLocale) => {
      setLocaleState(next);
      persistLocaleClient(next);
      router.refresh();
    },
    [router],
  );

  const tree = messages[locale] as Record<string, unknown>;

  const t = useCallback(
    (key: string) => translate(tree, key),
    [tree],
  );

  const tx = useCallback(
    (key: string, vars: Record<string, string | number>) =>
      interpolate(translate(tree, key), vars),
    [tree],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, tx }),
    [locale, setLocale, t, tx],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
