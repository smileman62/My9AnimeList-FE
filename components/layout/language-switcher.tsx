"use client";

import { useCallback, useState } from "react";

export type LocaleCode = "KR" | "EN";

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [locale, setLocale] = useState<LocaleCode>("KR");

  const select = useCallback((next: LocaleCode) => {
    setLocale(next);
    // i18n 라우팅 연동 시 여기서 전환 로직을 확장하면 됩니다.
  }, []);

  return (
    <div
      className={`inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-700 dark:bg-zinc-900 ${className ?? ""}`}
      role="group"
      aria-label="언어 선택"
    >
      {(["KR", "EN"] as const).map((code) => {
        const active = locale === code;
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
