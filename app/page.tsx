import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-16 sm:py-24">
        <section className="space-y-4 text-center sm:text-left">
          <p className="text-sm font-medium uppercase tracking-wide text-violet-600 dark:text-violet-400">
            Life Anime Nine
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            나만의 탑 9 애니를 만들고, 취향을 나누는 커뮤니티
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            이 서비스는 애니메이션을 검색하고, 딱 9작품만 골라 순위를 매긴 뒤
            게시글로 공유할 수 있는{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              취향 기반 커뮤니티
            </strong>
            입니다. 다른 사람들이 올린 탑 9 목록을 둘러보고 댓글로 이야기할 수
            있어요.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            이렇게 이용해요
          </h2>
          <ol className="list-inside list-decimal space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>마음에 드는 애니를 검색해 최대 9개까지 선택합니다.</li>
            <li>드래그로 순서를 바꿔 1위부터 9위까지 정합니다.</li>
            <li>제목과 설명을 붙여 게시글로 올리면 완료입니다.</li>
          </ol>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            한 게시글에는 반드시 서로 다른 애니 9개가 들어가며, 같은 작품을 중복해
            넣을 수 없습니다.
          </p>
        </section>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/search"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            애니 고르러 가기
          </Link>
          <Link
            href="/community/trend"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            커뮤니티 트렌드 보기
          </Link>
        </div>
      </main>
    </div>
  );
}
