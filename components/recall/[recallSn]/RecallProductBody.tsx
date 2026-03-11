import { RecallType } from "@/types/recall.type";
import Link from "next/link";
import { ReactNode } from "react";

interface RecallProductBodyProps {
  recallDetail: RecallType;
}

const RecallProductBody = ({ recallDetail }: RecallProductBodyProps) => {
  if (
    recallDetail.cntntsId === "0101" ||
    recallDetail.cntntsId === "0203" ||
    recallDetail.cntntsId === "0403"
  )
    return <IndustrialProductBody {...recallDetail} />; // 공산품, 축산물(항목이 없음), 먹는물(항목이 없음)
  if (recallDetail.cntntsId === "0301") return <AutomobileProductBody {...recallDetail} />; // 자동차
  if (
    recallDetail.cntntsId === "0204" ||
    recallDetail.cntntsId === "0205" ||
    recallDetail.cntntsId === "0206"
  )
    return <MedicineProductBody {...recallDetail} />; //의약품, 의약외품, 화장품
  if (recallDetail.cntntsId === "0207") return <MedicalDeviceProductBody {...recallDetail} />; // 의료기기
  if (recallDetail.cntntsId === "0208") return <HygieneProductBody {...recallDetail} />; // 위생용품
  if (recallDetail.cntntsId === "0405") return <DailyRadiationProductBody {...recallDetail} />; // 생활방사선제품
  if (recallDetail.cntntsId === "0401") return <ConsumerChemicalProductBody {...recallDetail} />; // 생활화학제품
};

const IndustrialProductBody = ({
  recallSe,
  recallPublictBgnde,
  recallPublictEndde,
  injryCauseResult,
  cnsmrGhvrTips,
  recallProcssInfo,
  etcInfo,
  infoOriginInstt,
  infoOriginInsttUrl
}: RecallType) => {
  const injryArray = injryCauseResult
    ?.split(/(?=ㅇ )/)
    .flatMap((s) => s.split(/(?=- )/))
    .map((s) => s.trim())
    .filter(Boolean);

  const tipsArray = cnsmrGhvrTips
    ?.split(/(?=ㅇ)/)
    .map((s) => s.trim())
    .filter(Boolean);

  const tableData: { title: string; description: string | null | string[] }[] = [
    { title: "리콜구분", description: recallSe },
    {
      title: "리콜 공표기간",
      description: `${recallPublictBgnde || ""} ~ ${recallPublictEndde || ""}`
    },
    { title: "출처", description: infoOriginInstt },
    { title: "위해원인 및 결과", description: injryArray || [] }
  ];

  return (
    <div className="p-4 bg-white flex flex-col gap-5">
      <BodyBaseSection title="리콜이유">
        <BodyBaseTable data={tableData} />
      </BodyBaseSection>

      <BodyBaseSection title="소비자 행동요령">
        <div className="text-14_M flex flex-col gap-1">
          {tipsArray && tipsArray.length > 0 ? tipsArray.map((v) => <p key={v}>{v}</p>) : "-"}
        </div>
      </BodyBaseSection>

      <BodyBaseSection title="리콜 절차">
        <p className="text-14_M">{recallProcssInfo || "-"}</p>
      </BodyBaseSection>

      <BodyBaseSection title="기타 정보">
        <p className="text-14_M">{etcInfo || "-"}</p>
      </BodyBaseSection>

      <BodyBaseSection title="정보 제공 기관">
        <div className="flex flex-col gap-1">
          <p className="text-14_M">{infoOriginInstt || "-"}</p>
          {infoOriginInsttUrl && (
            <Link href={infoOriginInsttUrl} target="_blank" className="text-14_M underline">
              {infoOriginInsttUrl}
            </Link>
          )}
        </div>
      </BodyBaseSection>
    </div>
  );
};

const AutomobileProductBody = ({
  recallSe,
  recallPublictBgnde,
  recallPublictEndde,
  infoOriginInstt,
  shrtcomCn,
  recallBgnde,
  recallEndde,
  recallEntrpsInfo,
  etcInfo,
  infoOriginInsttUrl
}: RecallType) => {
  const tableData: { title: string; description: string | null | string[] }[] = [
    { title: "리콜구분", description: recallSe },
    {
      title: "리콜 공표기간",
      description: `${recallPublictBgnde || ""} ~ ${recallPublictEndde || ""}`
    },
    { title: "출처", description: infoOriginInstt },
    { title: "결함의 내용", description: shrtcomCn }
  ];

  return (
    <div className="p-4 bg-white flex flex-col gap-5">
      <BodyBaseSection title="리콜이유">
        <BodyBaseTable data={tableData} />
      </BodyBaseSection>

      <BodyBaseSection title="리콜 기간">
        <p className="text-14_M">{`${recallBgnde || ""} ~ ${recallEndde || ""}`}</p>
      </BodyBaseSection>
      <BodyBaseSection title="문의처, 업체주소">
        <p className="text-14_M">{recallEntrpsInfo || "-"}</p>
      </BodyBaseSection>
      <BodyBaseSection title="기타 정보">
        <p className="text-14_M" dangerouslySetInnerHTML={{ __html: etcInfo || "-" }} />
      </BodyBaseSection>

      <BodyBaseSection title="정보 제공 기관">
        <div className="flex flex-col gap-1">
          <p className="text-14_M">{infoOriginInstt || "-"}</p>
          {infoOriginInsttUrl && (
            <Link href={infoOriginInsttUrl} target="_blank" className="text-14_M underline">
              {infoOriginInsttUrl}
            </Link>
          )}
        </div>
      </BodyBaseSection>
    </div>
  );
};

const MedicineProductBody = ({
  recallSe,
  recallPublictBgnde,
  recallPublictEndde,
  infoOriginInstt,
  shrtcomCn,
  infoOriginInsttUrl,
  recallEntrpsInfo
}: RecallType) => {
  const tableData: { title: string; description: string | null | string[] }[] = [
    { title: "리콜구분", description: recallSe },
    {
      title: "리콜 공표기간",
      description: `${recallPublictBgnde || ""} ~ ${recallPublictEndde || ""}`
    },
    { title: "출처", description: infoOriginInstt },
    { title: "결함의 내용", description: shrtcomCn }
  ];

  return (
    <div className="p-4 bg-white flex flex-col gap-5">
      <BodyBaseSection title="리콜이유">
        <BodyBaseTable data={tableData} />
      </BodyBaseSection>

      <BodyBaseSection title="문의처, 업체주소">
        <p className="text-14_M">{recallEntrpsInfo}</p>
      </BodyBaseSection>

      <BodyBaseSection title="정보 제공 기관">
        <div className="flex flex-col gap-1">
          <p className="text-14_M">{infoOriginInstt || "-"}</p>
          {infoOriginInsttUrl && (
            <Link href={infoOriginInsttUrl} target="_blank" className="text-14_M underline">
              {infoOriginInsttUrl}
            </Link>
          )}
        </div>
      </BodyBaseSection>
    </div>
  );
};

const MedicalDeviceProductBody = ({
  recallSe,
  hrmflGrad,
  recallPublictBgnde,
  recallPublictEndde,
  infoOriginInstt,
  recallBgnde,
  recallEndde,
  recallEntrpsInfo,
  infoOriginInsttUrl
}: RecallType) => {
  const tableData: { title: string; description: string | null | string[] }[] = [
    { title: "리콜구분", description: recallSe },
    { title: "위해성", description: hrmflGrad },
    {
      title: "리콜 공표기간",
      description: `${recallPublictBgnde || ""} ~ ${recallPublictEndde || ""}`
    },
    { title: "출처", description: infoOriginInstt }
  ];

  return (
    <div className="p-4 bg-white flex flex-col gap-5">
      <BodyBaseSection title="리콜이유">
        <BodyBaseTable data={tableData} />
      </BodyBaseSection>

      <BodyBaseSection title="리콜 기간">
        <p className="text-14_M">{`${recallBgnde || ""} ~ ${recallEndde || ""}`}</p>
      </BodyBaseSection>

      <BodyBaseSection title="문의처, 업체주소">
        <p className="text-14_M">{recallEntrpsInfo}</p>
      </BodyBaseSection>

      <BodyBaseSection title="정보 제공 기관">
        <div className="flex flex-col gap-1">
          <p className="text-14_M">{infoOriginInstt || "-"}</p>
          {infoOriginInsttUrl && (
            <Link href={infoOriginInsttUrl} target="_blank" className="text-14_M underline">
              {infoOriginInsttUrl}
            </Link>
          )}
        </div>
      </BodyBaseSection>
    </div>
  );
};

const HygieneProductBody = ({
  recallSe,
  injryCauseResult,
  recallPublictBgnde,
  recallPublictEndde,
  infoOriginInstt,
  recallBgnde,
  recallEndde,
  recallEntrpsInfo,
  infoOriginInsttUrl,
  cnsmrGhvrTips
}: RecallType) => {
  const tableData: { title: string; description: string | null | string[] }[] = [
    { title: "리콜구분", description: recallSe },
    {
      title: "리콜 공표기간",
      description: `${recallPublictBgnde || ""} ~ ${recallPublictEndde || ""}`
    },
    { title: "출처", description: infoOriginInstt },
    { title: "위해원인 및 결과", description: injryCauseResult }
  ];

  return (
    <div className="p-4 bg-white flex flex-col gap-5">
      <BodyBaseSection title="리콜이유">
        <BodyBaseTable data={tableData} />
      </BodyBaseSection>

      <BodyBaseSection title="소비자 행동요령">
        <p className="text-14_M">{cnsmrGhvrTips}</p>
      </BodyBaseSection>

      <BodyBaseSection title="리콜 기간">
        <p className="text-14_M">{`${recallBgnde || ""} ~ ${recallEndde || ""}`}</p>
      </BodyBaseSection>

      <BodyBaseSection title="문의처, 업체주소">
        <p className="text-14_M whitespace-pre-line">{recallEntrpsInfo}</p>
      </BodyBaseSection>

      <BodyBaseSection title="정보 제공 기관">
        <div className="flex flex-col gap-1">
          <p className="text-14_M">{infoOriginInstt || "-"}</p>
          {infoOriginInsttUrl && (
            <Link href={infoOriginInsttUrl} target="_blank" className="text-14_M underline">
              {infoOriginInsttUrl}
            </Link>
          )}
        </div>
      </BodyBaseSection>
    </div>
  );
};

const DailyRadiationProductBody = ({
  recallSe,
  injryCauseResult,
  recallPublictBgnde,
  recallPublictEndde,
  infoOriginInstt,
  recallBgnde,
  recallEndde,
  recallEntrpsInfo,
  infoOriginInsttUrl,
  cnsmrGhvrTips,
  shrtcomCn
}: RecallType) => {
  const tableData: { title: string; description: string | null | string[] }[] = [
    { title: "리콜구분", description: recallSe },
    {
      title: "리콜 공표기간",
      description: `${recallPublictBgnde || ""} ~ ${recallPublictEndde || ""}`
    },
    { title: "출처", description: infoOriginInstt },
    { title: "결함의 내용", description: shrtcomCn },
    { title: "위해원인 및 결과", description: injryCauseResult }
  ];

  return (
    <div className="p-4 bg-white flex flex-col gap-5">
      <BodyBaseSection title="리콜이유">
        <BodyBaseTable data={tableData} />
      </BodyBaseSection>

      <BodyBaseSection title="소비자 행동요령">
        <p className="text-14_M">{cnsmrGhvrTips}</p>
      </BodyBaseSection>

      <BodyBaseSection title="리콜 기간">
        <p className="text-14_M">{`${recallBgnde || ""} ~ ${recallEndde || ""}`}</p>
      </BodyBaseSection>

      <BodyBaseSection title="문의처, 업체주소">
        <p className="text-14_M whitespace-pre-line">{recallEntrpsInfo}</p>
      </BodyBaseSection>

      <BodyBaseSection title="정보 제공 기관">
        <div className="flex flex-col gap-1">
          <p className="text-14_M">{infoOriginInstt || "-"}</p>
          {infoOriginInsttUrl && (
            <Link href={infoOriginInsttUrl} target="_blank" className="text-14_M underline">
              {infoOriginInsttUrl}
            </Link>
          )}
        </div>
      </BodyBaseSection>
    </div>
  );
};

const ConsumerChemicalProductBody = ({
  recallSe,
  recallPublictBgnde,
  recallPublictEndde,
  infoOriginInstt,
  recallBgnde,
  recallEndde,
  infoOriginInsttUrl,
  shrtcomCn
}: RecallType) => {
  const tableData: { title: string; description: string | null | string[] }[] = [
    { title: "리콜구분", description: recallSe },
    {
      title: "리콜 공표기간",
      description: `${recallPublictBgnde || ""} ~ ${recallPublictEndde || ""}`
    },
    { title: "출처", description: infoOriginInstt },
    { title: "결함의 내용", description: shrtcomCn }
  ];

  return (
    <div className="p-4 bg-white flex flex-col gap-5">
      <BodyBaseSection title="리콜이유">
        <BodyBaseTable data={tableData} />
      </BodyBaseSection>

      <BodyBaseSection title="리콜 기간">
        <p className="text-14_M">{`${recallBgnde || ""} ~ ${recallEndde || ""}`}</p>
      </BodyBaseSection>

      <BodyBaseSection title="정보 제공 기관">
        <div className="flex flex-col gap-1">
          <p className="text-14_M">{infoOriginInstt || "-"}</p>
          {infoOriginInsttUrl && (
            <Link href={infoOriginInsttUrl} target="_blank" className="text-14_M underline">
              {infoOriginInsttUrl}
            </Link>
          )}
        </div>
      </BodyBaseSection>
    </div>
  );
};

const BodyBaseSection = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-16_B">{title}</h2>
      {children}
    </section>
  );
};

const BodyBaseTable = ({
  data
}: {
  data: { title: string; description: string | null | string[] }[];
}) => {
  return (
    <table className="w-full border-collapse">
      <tbody>
        {data.map((v) => (
          <tr key={v.title} className="border-t border-gray-200">
            <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-32 text-14_B">{v.title}</td>
            {Array.isArray(v.description) ? (
              <td className="py-2 text-gray-700 text-12_M flex flex-col gap-1">
                {v.description.length > 0
                  ? v.description.map((item) => <p key={item}>{item}</p>)
                  : v.description || "-"}
              </td>
            ) : (
              <td
                className="py-2 text-gray-700 text-12_M flex flex-col gap-1"
                dangerouslySetInnerHTML={{ __html: v.description || "-" }}
              />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecallProductBody;
