import ImageWithDefault from "@/components/common/ImageWithDefault";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { RECALL_CATEGORY_MAP } from "@/const/RECALL_CATEGORY_KEY_MAP.const";
import { RecallType } from "@/types/recall.type";

interface RecallProductHeaderProps {
  recallDetail: RecallType;
}

const RecallProductHeader = ({ recallDetail }: RecallProductHeaderProps) => {
  if (recallDetail.cntntsId === "0101") return <IndustrialProductHeader {...recallDetail} />; // 공산품
  if (recallDetail.cntntsId === "0301") return <AutomobileProductHeader {...recallDetail} />; // 자동차
  return;
};

const IndustrialProductHeader = ({
  productNm,
  cntntsId,
  stdBrcd,
  bsnmNm,
  modlNmInfo,
  recallImgUrls
}: RecallType) => {
  const tableData: { title: string; description: string | null }[] = [
    { title: "카테고리", description: RECALL_CATEGORY_MAP[cntntsId] },
    { title: "유통표준코드", description: stdBrcd },
    { title: "사업자명", description: bsnmNm },
    { title: "모델명", description: modlNmInfo }
  ];

  return (
    <div className="p-4 flex flex-col gap-5 bg-white">
      <Carousel>
        <CarouselContent>
          {recallImgUrls && recallImgUrls.length > 0 ? (
            recallImgUrls.map((item) => (
              <CarouselItem key={item}>
                <ImageWithDefault
                  src={item}
                  className="rounded-2xl object-cover max-h-85.75 w-85.75"
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <ImageWithDefault className="rounded-2xl object-cover" />
            </CarouselItem>
          )}
        </CarouselContent>
        {recallImgUrls && recallImgUrls.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>

      <div className="flex flex-col gap-5">
        <h2 className="text-18_B text-gray-800">{productNm}</h2>
        <HeaderBaseTable data={tableData} />
      </div>
    </div>
  );
};

const AutomobileProductHeader = ({
  cntntsId,
  productNm,
  bsnmNm,
  mnfcturPd,
  modlNmInfo
}: RecallType) => {
  const tableData: { title: string; description: string | null }[] = [
    { title: "카테고리", description: RECALL_CATEGORY_MAP[cntntsId] },
    { title: "제조사", description: bsnmNm },
    { title: "제조연월일", description: mnfcturPd },
    { title: "모델명", description: modlNmInfo }
  ];
  return (
    <div className="p-4 flex flex-col gap-5 bg-white">
      <h2 className="text-18_B text-gray-800">{productNm}</h2>
      <HeaderBaseTable data={tableData} />
    </div>
  );
};

const HeaderBaseTable = ({ data }: { data: { title: string; description: string | null }[] }) => {
  return (
    <table className="w-full border-collapse">
      <tbody>
        {data.map((v) => (
          <tr key={v.title} className="border-t border-gray-200">
            <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-32 text-14_B">{v.title}</td>
            <td className="py-2 text-gray-700 text-12_M">{v.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecallProductHeader;
