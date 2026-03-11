import Link from "next/link";

interface RecallProductBodyProps {
  recallSe: string | null; // 리콜 구분
  recallPublictBgnde: string | null; // 리콜 공표 시작일
  recallPublictEndde: string | null; // 리콜 공표 만료일
  injryCauseResult: string | null; // 위해 원인

  cnsmrGhvrTips: string | null; // 소비자 행동 요령

  recallProcssInfo: string | null; // 리콜 절차
  etcInfo: string | null; // 기타 정보

  infoOriginInstt: string | null; // 정보 출처 기관
  infoOriginInsttUrl: string | null; // 정보 출처 URL
}

const RecallProductBody = ({
  recallSe,
  recallPublictBgnde,
  recallPublictEndde,
  injryCauseResult,
  cnsmrGhvrTips,
  recallProcssInfo,
  etcInfo,
  infoOriginInstt,
  infoOriginInsttUrl
}: RecallProductBodyProps) => {
  const injryArray = injryCauseResult
    ?.split(/(?=ㅇ )/)
    .flatMap((s) => s.split(/(?=- )/))
    .map((s) => s.trim())
    .filter(Boolean);

  const tipsArray = cnsmrGhvrTips
    ?.split(/(?=ㅇ)/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="p-4 bg-white flex flex-col gap-5">
      <section className="flex flex-col gap-3">
        <h2 className="text-16_B">리콜이유</h2>

        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-32 text-14_B">리콜구분</td>
              <td className="py-2 text-gray-700 text-12_M">{recallSe || "-"}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-32 text-14_B">
                리콜 공표기간
              </td>
              <td className="py-2 text-gray-700 text-12_M">{`${recallPublictBgnde || ""} ~ ${recallPublictEndde || ""}`}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-32 text-14_B">출처</td>
              <td className="py-2 text-gray-700 text-12_M">{infoOriginInstt || "-"}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 pr-4 text-gray-700 whitespace-nowrap w-32 text-14_B">
                위해원인 및 결과
              </td>

              <td className="py-2 text-gray-700 text-12_M flex flex-col gap-1">
                {injryArray && injryArray.length > 0
                  ? injryArray.map((v) => <p key={v}>{v}</p>)
                  : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-16_B">소비자 행동요령</h2>
        <div className="text-14_M flex flex-col gap-1">
          {tipsArray && tipsArray.length > 0 ? tipsArray.map((v) => <p key={v}>{v}</p>) : "-"}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-16_B">리콜 절차</h2>
        <p className="text-14_M">{recallProcssInfo || "-"}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-16_B">기타 정보</h2>
        <p className="text-14_M">{etcInfo || "-"}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-16_B">정보 제공 기관</h2>
        <div className="flex flex-col gap-1">
          <p className="text-14_M">{infoOriginInstt || "-"}</p>
          {infoOriginInsttUrl && (
            <Link href={infoOriginInsttUrl} target="_blank" className="text-14_M underline">
              {infoOriginInsttUrl}
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecallProductBody;
