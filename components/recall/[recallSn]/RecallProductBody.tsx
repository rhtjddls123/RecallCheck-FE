import { RecallType } from "@/types/recall.type";
import Link from "next/link";
import { ReactNode } from "react";

interface RecallProductBodyProps {
  recallDetail: RecallType;
}

const RecallProductBody = ({ recallDetail }: RecallProductBodyProps) => {
  if (recallDetail.cntntsId === "0101") return <IndustrialProductBody {...recallDetail} />; // 공산품
  if (recallDetail.cntntsId === "0301") return <AutomobileProductBody {...recallDetail} />; // 자동차

  return;
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
