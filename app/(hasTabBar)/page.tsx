import Header from "@/components/common/Header";
import TabBar from "@/components/common/TabBar";
import Banner from "@/components/Home/Banner";
import HomeSectionWrapper from "@/components/Home/HomeSectionWrapper";
import RecentRecallCarousel from "@/components/Home/RecentRecallCarousel";
import SafetyInfoList from "@/components/Home/SafetyInfoList";
import SearchInput from "@/components/Home/SearchInput";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div>
      <Header />

      {/* 헤더와 TabBar를 제외한 실제 콘텐츠 영역 */}
      <ScrollArea className="h-[calc(100dvh-120px)] bg-gray-100">
        <div className="flex flex-col gap-2.5">
          {/* 검색창 영역 */}
          <section className="px-4 py-1.25 bg-white">
            <SearchInput />
          </section>

          {/* 배너 영역 */}
          <section className="px-4 py-5 bg-white">
            <Banner />
          </section>

          {/* 최근 리콜 제품 영역 */}
          <HomeSectionWrapper href="/recall" title="최근 리콜 제품">
            <RecentRecallCarousel />
          </HomeSectionWrapper>

          {/* 안전 정보 영역 */}
          <HomeSectionWrapper title="안전정보" href="/safetyInfo">
            <SafetyInfoList />
          </HomeSectionWrapper>
        </div>
      </ScrollArea>
    </div>
  );
}
