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
  if (
    recallDetail.cntntsId === "0101" ||
    recallDetail.cntntsId === "0203" ||
    recallDetail.cntntsId === "0403"
  )
    return <IndustrialProductHeader {...recallDetail} />; // 공산품, 축산물(항목이 없음), 먹는물(항목이 없음)
  if (recallDetail.cntntsId === "0301") return <AutomobileProductHeader {...recallDetail} />; // 자동차
  if (
    recallDetail.cntntsId === "0204" ||
    recallDetail.cntntsId === "0205" ||
    recallDetail.cntntsId === "0206"
  )
    return <MedicineProductHeader {...recallDetail} />; // 의약품, 의약외품, 화장품
  if (recallDetail.cntntsId === "0207") return <MedicalDeviceProductHeader {...recallDetail} />; // 의료기기
  if (recallDetail.cntntsId === "0208") return <HygieneProductHeader {...recallDetail} />; // 위생용품
  if (recallDetail.cntntsId === "0405") return <DailyRadiationProductHeader {...recallDetail} />; // 생활방사선제품
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

const MedicineProductHeader = ({
  productNm,
  cntntsId,
  makr,
  mnfcturPd,
  mnfcturNoInfo
}: RecallType) => {
  const tableData: { title: string; description: string | null }[] = [
    { title: "카테고리", description: RECALL_CATEGORY_MAP[cntntsId] },
    { title: "제조사", description: makr },
    { title: "제조연월일", description: mnfcturPd },
    { title: "제조번호", description: mnfcturNoInfo }
  ];
  return (
    <div className="p-4 flex flex-col gap-5 bg-white">
      <h2 className="text-18_B text-gray-800">{productNm}</h2>
      <HeaderBaseTable data={tableData} />
    </div>
  );
};

const MedicalDeviceProductHeader = ({
  productNm,
  cntntsId,
  makr,
  modlNmInfo,
  mnfcturNoInfo,
  mdlpClNo,
  prmisnNo
}: RecallType) => {
  const modlNmInfoArray = modlNmInfo?.split("§") || [];
  const mnfcturNoInfoArray = mnfcturNoInfo?.split("§") || [];

  const merged = modlNmInfoArray.map((modl, i) => {
    const mnfctur = mnfcturNoInfoArray[i]?.trim();
    return mnfctur ? `${modl.trim()} / ${mnfctur}` : modl.trim();
  });

  const tableData: { title: string; description: string | null | string[] }[] = [
    { title: "카테고리", description: RECALL_CATEGORY_MAP[cntntsId] },
    { title: "제조사", description: makr },
    { title: "모델명 / 제조번호", description: merged },
    { title: "분류번호", description: mdlpClNo },
    { title: "입허가번호", description: prmisnNo }
  ];
  return (
    <div className="p-4 flex flex-col gap-5 bg-white">
      <h2 className="text-18_B text-gray-800">{productNm}</h2>
      <HeaderBaseTable data={tableData} />
    </div>
  );
};

const HygieneProductHeader = ({
  productNm,
  cntntsId,
  makr,
  mnfcturPd,
  bsnmNm,
  modlNmInfo,
  recallImgUrls
}: RecallType) => {
  const tableData: { title: string; description: string | null }[] = [
    { title: "카테고리", description: RECALL_CATEGORY_MAP[cntntsId] },
    { title: "사업자명", description: bsnmNm },
    { title: "제조사", description: makr },
    { title: "제조연월일", description: mnfcturPd },
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

const DailyRadiationProductHeader = ({
  productNm,
  cntntsId,
  makr,
  mnfcturPd,
  modlNmInfo,
  mainSleoffic,
  recallImgUrls
}: RecallType) => {
  const tableData: { title: string; description: string | null }[] = [
    { title: "카테고리", description: RECALL_CATEGORY_MAP[cntntsId] },
    { title: "제조사", description: makr },
    { title: "제조연월일", description: mnfcturPd },
    { title: "모델명", description: modlNmInfo },
    { title: "주요판매처", description: mainSleoffic }
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

const HeaderBaseTable = ({
  data
}: {
  data: { title: string; description: string | null | string[] }[];
}) => {
  return (
    <table className="w-full border-collapse">
      <tbody>
        {data.map((v) => (
          <tr key={v.title} className="border-t border-gray-200">
            <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-30 text-14_B">{v.title}</td>
            <td className="py-2 text-gray-700 text-12_M break-all flex flex-col gap-1">
              {Array.isArray(v.description)
                ? v.description.length > 0
                  ? v.description.map((item) => <p key={item}>{item}</p>)
                  : "-"
                : v.description || "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecallProductHeader;
