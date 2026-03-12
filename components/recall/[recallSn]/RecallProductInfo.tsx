import { RecallType } from "@/types/recall.type";
import { cookies } from "next/headers";
import RecallProductHeader from "./RecallProductHeader";
import RecallProductBody from "./RecallProductBody";
import { Skeleton } from "@/components/ui/skeleton";

interface RecallProductInfoProps {
  recallSn: string;
}

const RecallProductInfo = async ({ recallSn }: RecallProductInfoProps) => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/recall/${recallSn}`, {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader
    }
  });
  const recallDetail = (await res.json()) as RecallType;

  return (
    <div className="flex flex-col gap-3">
      <RecallProductHeader recallDetail={recallDetail} />
      <RecallProductBody recallDetail={recallDetail} />
    </div>
  );
};

export const RecallProductInfoLoadingFallback = () => {
  return (
    <div className="flex flex-col gap-3 h-[calc(100dvh-120px)]">
      <div className="flex flex-col gap-5 bg-white p-4">
        <Skeleton className="w-full h-10" />

        <div className="w-full flex flex-col gap-1">
          {[1, 2, 3].map((v) => (
            <Skeleton key={v} className="w-full h-7.5" />
          ))}
        </div>

        <div className="w-full flex flex-col gap-1">
          {[1, 2, 3].map((v) => (
            <Skeleton key={v} className="w-full h-7.5" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecallProductInfo;
