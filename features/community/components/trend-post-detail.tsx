"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/i18n/i18n-provider";
import { getMockComments } from "@/features/community/data/mock-post-comments";
import type { TrendPost } from "@/features/community/types/community";

type TrendPostDetailProps = {
  post: TrendPost;
};

function formatDateTime(iso: string, localeTag: string) {
  return new Date(iso).toLocaleString(localeTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TrendPostDetail({ post }: TrendPostDetailProps) {
  const { locale, t, tx } = useI18n();
  const localeTag = locale === "en" ? "en-US" : "ko-KR";
  const comments = getMockComments(post.id);
  const sorted = [...post.animes].sort((a, b) => a.rankPosition - b.rankPosition);

  return (
    <div className="w-full">
      <div className="mb-6">
        <Link
          href="/community/trend"
          className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {t("community.detailBack")}
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {post.authorName}
          </span>
          <span className="text-zinc-400 dark:text-zinc-600">·</span>
          <span>{post.authorHandle}</span>
          <span className="text-zinc-400 dark:text-zinc-600">·</span>
          <time dateTime={post.createdAt}>
            {formatDateTime(post.createdAt, localeTag)}
          </time>
        </div>
        <div className="mt-3 flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
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

      <div className="mb-10 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
        {sorted.map((slot) => (
          <div
            key={slot.rankPosition}
            className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Image
              src={slot.thumbnailUrl}
              alt=""
              fill
              sizes="(max-width:640px) 33vw, 200px"
              className="object-cover"
              unoptimized={!slot.thumbnailUrl.includes("cdn.myanimelist.net")}
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent p-2 pt-8">
              <p className="line-clamp-2 text-center text-[10px] font-semibold text-white sm:text-xs">
                <span className="mr-1 opacity-90">{slot.rankPosition}.</span>
                {slot.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="whitespace-pre-wrap text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {post.content}
        </p>
      </div>

      <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          {tx("community.commentsHeading", { count: comments.length })}
        </h2>
        {comments.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            {t("community.commentsEmpty")}
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {comments.map((c) => (
              <li
                key={c.id}
                className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {c.authorName}
                  </span>
                  <time
                    className="text-xs text-zinc-500 dark:text-zinc-400"
                    dateTime={c.createdAt}
                  >
                    {formatDateTime(c.createdAt, localeTag)}
                  </time>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
