import type { AppLocale } from "@/shared/i18n/constants";

type MessageTree = Record<string, unknown>;

function getLeaf(obj: MessageTree, path: string): string | undefined {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || typeof cur !== "object" || !(p in (cur as object))) {
      return undefined;
    }
    cur = (cur as MessageTree)[p];
  }
  return typeof cur === "string" ? cur : undefined;
}

export function translate(
  messages: MessageTree,
  key: string,
  fallback?: string,
): string {
  return getLeaf(messages, key) ?? fallback ?? key;
}

export function interpolate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    name in vars ? String(vars[name]) : `{${name}}`,
  );
}

export type MessagesByLocale = Record<AppLocale, MessageTree>;
