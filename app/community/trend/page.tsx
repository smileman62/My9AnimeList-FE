import { CommunityTrendIntro } from "@/features/community/components/community-trend-intro";
import { CommunityTrendTabs } from "@/features/community/components/community-trend-tabs";

export default function CommunityTrendPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <CommunityTrendIntro />

      <CommunityTrendTabs />
    </main>
  );
}