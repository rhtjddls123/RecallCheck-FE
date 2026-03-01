import Header from "@/components/common/Header";
import SearchInput from "@/components/common/SearchInput";
import RecallFilterList from "@/components/recall/RecallFilterList";
import RecallProductList from "@/components/recall/RecallProductList";
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

          <section className="flex flex-col items-center">
            <RecallFilterList />
            <RecallProductList />
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecallPage;
