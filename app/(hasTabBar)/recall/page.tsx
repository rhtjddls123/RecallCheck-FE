import Header from "@/components/common/Header";
import SearchInput from "@/components/common/SearchInput";
import RecallFilterList from "@/components/recall/RecallFilterList";
import RecallProductList from "@/components/recall/RecallProductList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchWithParams } from "@/lib/fetchWithParams";
import { RecallPaginationResponse } from "@/types/response.type";

interface RecallPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const RecallPage = async ({ searchParams }: RecallPageProps) => {
  const filters = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetchWithParams(`${baseUrl}/recall`, filters, {
    cache: "no-store"
  });
  const recallData = (await res.json()) as RecallPaginationResponse;

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
            <RecallProductList recallData={recallData} />
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecallPage;
