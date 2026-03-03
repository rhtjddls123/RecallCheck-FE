import Header from "@/components/common/Header";
import SearchInput from "@/components/common/SearchInput";
import SuspenseWithErrorBoundary from "@/components/common/SuspenseWithErrorBoundary";
import RecallFilterList from "@/components/recall/RecallFilterList";
import RecallProductList, {
  RecallProductListLoadingFallback
} from "@/components/recall/RecallProductList";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecallPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const RecallPage = async ({ searchParams }: RecallPageProps) => {
  const filters = await searchParams;

  return (
    <div>
      <Header />

      <ScrollArea className="h-[calc(100dvh-120px)] bg-gray-100 [&>div>div]:h-full">
        <div className="flex flex-col gap-2.5 min-h-full">
          <section className="px-4 py-1.25 bg-white">
            <SearchInput />
          </section>

          <section className="flex flex-col items-center flex-1">
            <RecallFilterList />
            <SuspenseWithErrorBoundary
              key={JSON.stringify(filters)}
              loadingFallback={<RecallProductListLoadingFallback />}
            >
              <RecallProductList filters={filters} />
            </SuspenseWithErrorBoundary>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecallPage;
