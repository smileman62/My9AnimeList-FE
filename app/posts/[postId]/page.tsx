import { notFound } from "next/navigation";
import { getTrendPostById } from "@/features/community/data/mock-trend-posts";
import { TrendPostDetail } from "@/features/community/components/trend-post-detail";

type PostDetailPageProps = {
  params: Promise<{ postId: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = await params;
  const id = Number(postId);
  if (!Number.isFinite(id) || id <= 0) {
    notFound();
  }

  const post = getTrendPostById(id);
  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <TrendPostDetail post={post} />
    </main>
  );
}

export function generateStaticParams() {
  return [
    { postId: "101" },
    { postId: "102" },
    { postId: "103" },
    { postId: "104" },
    { postId: "105" },
    { postId: "106" },
  ];
}
