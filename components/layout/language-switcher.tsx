"use client";

import { useCallback } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import type { AppLocale } from "@/shared/i18n/constants";

export type LocaleCode = "KR" | "EN";

const BUTTON_TO_LOCALE: Record<LocaleCode, AppLocale> = {
  KR: "ko",
  EN: "en",
};

const LOCALE_TO_BUTTON: Record<AppLocale, LocaleCode> = {
  ko: "KR",
  en: "EN",
};

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();
  const activeButton = LOCALE_TO_BUTTON[locale];

  const select = useCallback(
    (code: LocaleCode) => {
      setLocale(BUTTON_TO_LOCALE[code]);
    },
    [setLocale],
  );

  return (
    <div
      className={`inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-700 dark:bg-zinc-900 ${className ?? ""}`}
      role="group"
      aria-label={t("language.label")}
    >
      {(["KR", "EN"] as const).map((code) => {
        const active = activeButton === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => select(code)}
            className={`min-w-11 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
              active
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
            aria-pressed={active}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
