import Header from "@/components/common/Header";
import SuspenseWithErrorBoundary from "@/components/common/SuspenseWithErrorBoundary";
import RecallProductInfo, {
  RecallProductInfoLoadingFallback
} from "@/components/recall/[recallSn]/RecallProductInfo";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecallDetailPageProps {
  params: Promise<{ recallSn: string }>;
}

const RecallDetailPage = async ({ params }: RecallDetailPageProps) => {
  const { recallSn } = await params;

  return (
    <div>
      <Header />
      <ScrollArea className="h-[calc(100dvh-120px)] bg-gray-100">
        <SuspenseWithErrorBoundary loadingFallback={<RecallProductInfoLoadingFallback />}>
          <RecallProductInfo recallSn={recallSn} />
        </SuspenseWithErrorBoundary>
      </ScrollArea>
    </div>
  );
};

export default RecallDetailPage;
