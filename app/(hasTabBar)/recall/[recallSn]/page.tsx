import Header from "@/components/common/Header";
import SuspenseWithErrorBoundary from "@/components/common/SuspenseWithErrorBoundary";
import RecallProductInfo, {
  RecallProductInfoLoadingFallback
} from "@/components/recall/[recallSn]/RecallProductInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RecallType } from "@/types/recall.type";

import { Metadata } from "next";

interface Props {
  params: Promise<{ recallSn: string }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { recallSn } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/recall/${recallSn}`);
  const recall = (await res.json()) as RecallType;

  return {
    title: recall.productNm,
    description: recall.shrtcomCn || recall.injryCauseResult || "리콜 상세 정보",
    openGraph: {
      title: recall.productNm,
      description: recall.shrtcomCn || recall.injryCauseResult || "",
      images: recall.recallImgUrls?.[0] ? [{ url: recall.recallImgUrls[0] }] : []
    }
  };
};

interface RecallDetailPageProps {
  params: Promise<{ recallSn: string }>;
}

const RecallDetailPage = async ({ params }: RecallDetailPageProps) => {
  const { recallSn } = await params;

  return (
    <div>
      <Header />
      <ScrollArea className="h-[calc(100dvh-120px)] bg-gray-100 dark:bg-zinc-900">
        <SuspenseWithErrorBoundary loadingFallback={<RecallProductInfoLoadingFallback />}>
          <RecallProductInfo recallSn={recallSn} />
        </SuspenseWithErrorBoundary>
      </ScrollArea>
    </div>
  );
};

export default RecallDetailPage;
