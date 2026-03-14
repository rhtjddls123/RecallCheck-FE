import Header from "@/components/common/Header";
import SearchInput from "@/components/common/SearchInput";
import SuspenseWithErrorBoundary from "@/components/common/SuspenseWithErrorBoundary";
import Banner from "@/components/Home/Banner";
import HomeSectionWrapper from "@/components/Home/HomeSectionWrapper";
import RecentRecallCarousel, {
  RecentRecallCarouselLoadingFallback
} from "@/components/Home/RecentRecallCarousel";
import SafetyInfoList, { SafetyInfoListLoadingFallback } from "@/components/Home/SafetyInfoList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Header />

      {/* 헤더와 TabBar를 제외한 실제 콘텐츠 영역 */}
      <ScrollArea className="h-[calc(100dvh-120px)] bg-gray-100 dark:bg-zinc-900">
        <div className="flex flex-col gap-2.5">
          {/* 검색창 영역 */}
          <section className="px-4 py-1.25 bg-white dark:bg-zinc-800">
            <Suspense fallback={<Skeleton className="w-full h-9" />}>
              <SearchInput />
            </Suspense>
          </section>

          {/* 배너 영역 */}
          <section className="px-4 py-5 bg-white dark:bg-zinc-800">
            <Banner />
          </section>

          {/* 최근 리콜 제품 영역 */}
          <HomeSectionWrapper href="/recall" title="최근 리콜 제품">
            <SuspenseWithErrorBoundary loadingFallback={<RecentRecallCarouselLoadingFallback />}>
              <RecentRecallCarousel />
            </SuspenseWithErrorBoundary>
          </HomeSectionWrapper>

          {/* 안전 정보 영역 */}
          <HomeSectionWrapper title="안전정보">
            <SuspenseWithErrorBoundary loadingFallback={<SafetyInfoListLoadingFallback />}>
              <SafetyInfoList />
            </SuspenseWithErrorBoundary>
          </HomeSectionWrapper>
        </div>
      </ScrollArea>
    </div>
  );
}
