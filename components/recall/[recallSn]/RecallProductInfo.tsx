import { RecallType } from "@/types/recall.type";
import { cookies } from "next/headers";
import RecallProductHeader from "./RecallProductHeader";
import RecallProductBody from "./RecallProductBody";

interface RecallProductInfoProps {
  recallSn: string;
}

const RecallProductInfo = async ({ recallSn }: RecallProductInfoProps) => {
  const cookieStore = await cookies();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/recall/${recallSn}`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString()
    }
  });
  const recallDetail = (await res.json()) as RecallType;

  return (
    <div className="flex flex-col gap-3">
      <RecallProductHeader {...recallDetail} />
      <RecallProductBody {...recallDetail} />
    </div>
  );
};

export default RecallProductInfo;
