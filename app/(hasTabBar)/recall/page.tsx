import Header from "@/components/common/Header";
import SearchInput from "@/components/common/SearchInput";
import RecallFilterList from "@/components/recall/RecallFilterList";
import { ScrollArea } from "@/components/ui/scroll-area";

const RecallPage = () => {
  return (
    <div>
      <Header />

      <ScrollArea className="h-[calc(100dvh-120px)] bg-gray-100">
        <div className="flex flex-col gap-2.5">
          <section className="px-4 py-1.25 bg-white">
            <SearchInput />
          </section>

          {/* 필터 영역 */}
          <section className="flex gap-2 justify-end">
            <RecallFilterList />
          </section>

          {/* 아이템 목록 영역 */}
          <section></section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecallPage;
