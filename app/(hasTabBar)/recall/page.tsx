import Header from "@/components/common/Header";
import SearchInput from "@/components/common/SearchInput";
import { ScrollArea } from "@/components/ui/scroll-area";

const RecallPage = () => {
  return (
    <div>
      <Header />

      <ScrollArea className="h-[calc(100dvh-120px)] bg-gray-100">
        <section className="px-4 py-1.25 bg-white">
          <SearchInput />
        </section>
      </ScrollArea>
    </div>
  );
};

export default RecallPage;
