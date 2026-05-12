"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/i18n/i18n-provider";
import type { TrendPost } from "@/features/community/types/community";

type TrendPostCardProps = {
  post: TrendPost;
};

function formatDate(iso: string, localeTag: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(localeTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function TrendPostCard({ post }: TrendPostCardProps) {
  const { locale, t } = useI18n();
  const localeTag = locale === "en" ? "en-US" : "ko-KR";
  const sorted = [...post.animes].sort((a, b) => a.rankPosition - b.rankPosition);

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600">
      <Link href={`/posts/${post.id}`} className="block">
        <div className="grid grid-cols-3 gap-0.5 p-2 sm:gap-1 sm:p-3">
          {sorted.map((slot) => (
            <div
              key={slot.rankPosition}
              className="relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900"
            >
              <Image
                src={slot.thumbnailUrl}
                alt=""
                fill
                sizes="(max-width:640px) 33vw, 120px"
                className="object-cover"
                unoptimized={!slot.thumbnailUrl.includes("cdn.myanimelist.net")}
              />
              <span className="absolute left-1 top-1 flex size-5 items-center justify-center rounded bg-black/70 text-[10px] font-bold text-white">
                {slot.rankPosition}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-100 px-4 py-4 dark:border-zinc-800">
          <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {post.authorName}
            </span>
            <span>{formatDate(post.createdAt, localeTag)}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            <span>
              {t("community.likes")}{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                {post.likeCount.toLocaleString(localeTag)}
              </strong>
            </span>
            <span>
              {t("community.comments")}{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                {post.commentCount.toLocaleString(localeTag)}
              </strong>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
