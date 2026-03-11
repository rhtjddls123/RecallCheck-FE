import ImageWithDefault from "@/components/common/ImageWithDefault";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { RECALL_CATEGORY_MAP, RECALL_CATEGORY_TYPE } from "@/const/RECALL_CATEGORY_KEY_MAP.const";

interface RecallProductHeaderProps {
  productNm: string; // 제품명
  cntntsId: string; // 메뉴 ID
  stdBrcd: string | null; // 표준 바코드(유통표준코드)
  bsnmNm: string | null; // 사업자명
  modlNmInfo: string | null; // 모델명 정보
  recallImgUrls: string[] | null;
}

const RecallProductHeader = ({
  productNm,
  cntntsId,
  stdBrcd,
  bsnmNm,
  modlNmInfo,
  recallImgUrls
}: RecallProductHeaderProps) => {
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

        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-32 text-14_B">카테고리</td>
              <td className="py-2 text-gray-700 text-12_M">
                {RECALL_CATEGORY_MAP[cntntsId as RECALL_CATEGORY_TYPE]}
              </td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-32 text-14_B">
                유통표준코드
              </td>
              <td className="py-2 text-gray-700 text-12_M">{stdBrcd || "-"}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-32 text-14_B">사업자명</td>
              <td className="py-2 text-gray-700 text-12_M">{bsnmNm || "-"}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-32 text-14_B">모델명</td>
              <td className="py-2 text-gray-700 text-12_M">{modlNmInfo || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecallProductHeader;
