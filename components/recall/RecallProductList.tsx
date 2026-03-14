import { fetchWithParams } from "@/lib/fetchWithParams";
import RecallItem, { RecallItemSkeleton } from "../common/RecallItem";
import RecallPagination from "./RecallPagination";
import { RecallPaginationResponse } from "@/types/response.type";
import { cookies } from "next/headers";

export const RecallProductListLoadingFallback = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-between h-full flex-1">
      <div className="grid grid-cols-2 gap-4 bg-white">
        {Array.from({ length: 10 }).map((_, i) => (
          <RecallItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

interface RecallProductListProps {
  filters: { [key: string]: string | string[] | undefined };
  isChatbot?: boolean;
}

const RecallProductList = async ({ filters, isChatbot = false }: RecallProductListProps) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/recall${isChatbot ? "/chatbot-search/paginated" : ""}`;
  const res = await fetchWithParams(`${url}`, filters, {
    cache: "no-store",
    headers: { Cookie: cookieHeader }
  });
  const recallData = (await res.json()) as RecallPaginationResponse;

  return (
    <div className="w-full bg-white dark:bg-zinc-800 flex flex-col items-center justify-between h-full flex-1">
      <div className="grid grid-cols-2 gap-4 bg-white dark:bg-zinc-800">
        {recallData.data.map((p) => (
          <RecallItem
            key={p.recallSn}
            href={`/recall/${p.recallSn}`}
            title={p.productNm}
            description={p.makr || p.bsnmNm || ""}
            img={p.recallImgUrls?.[0]}
          />
        ))}
      </div>
      {recallData.data.length === 0 && <p>데이터가 없습니다.</p>}
      <RecallPagination totalPage={recallData.totalPages} />
    </div>
  );
};

export default RecallProductList;
