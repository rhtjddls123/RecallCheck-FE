import { RECALL_CATEGORY_MAP, RECALL_CATEGORY_TYPE } from "@/const/RECALL_CATEGORY_KEY_MAP.const";
import { RecallType } from "@/types/recall.type";
import Link from "next/link";
import ImageWithDefault from "../common/ImageWithDefault";

interface RecallResultCardProps {
  product: RecallType;
  foundInOtherCategory?: string;
}

const RecallResultCard = ({ product, foundInOtherCategory }: RecallResultCardProps) => {
  const category = RECALL_CATEGORY_MAP[product.cntntsId as RECALL_CATEGORY_TYPE];
  const recallDate = {
    from: product.recallBgnde || "",
    to: product.recallEndde || ""
  };
  if (!recallDate.from && !recallDate.to) {
    recallDate.from = product.recallPublictBgnde || "";
    recallDate.to = product.recallPublictEndde || "";
  }

  return (
    <div className="select-none mt-2 rounded-2xl border border-red-100 dark:border-red-900 bg-white dark:bg-zinc-800 shadow-sm overflow-hidden w-72">
      <div className="bg-red-50 dark:bg-red-950 px-4 py-2 flex items-center gap-2 border-b border-red-100 dark:border-red-900">
        <span className="text-xs font-bold text-red-500">⚠️ 리콜 대상</span>
        {foundInOtherCategory && (
          <span className="ml-auto text-xs bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
            {foundInOtherCategory}
          </span>
        )}
      </div>
      <div className="px-4 py-3 space-y-2">
        <div className="flex justify-end">
          <Link
            className="text-11_M underline dark:text-gray-400"
            href={`/recall/${product.recallSn}`}
          >
            상세보기
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="w-[calc(100%-40px)]">
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
              {product.productNm}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 h-4 truncate">
              {product.makr || product.bsnmNm}
            </p>
          </div>
          <ImageWithDefault
            src={product.recallImgUrls?.[0]}
            alt={product.productNm}
            className="size-9 rounded-sm object-cover"
            proxyWidth={36}
            proxyHeight={36}
            proxyFit="cover"
          />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400 dark:text-gray-500">분류</span>
          <span className="text-gray-600 dark:text-gray-400">{category}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400 dark:text-gray-500">리콜일</span>
          <span className="text-gray-600 dark:text-gray-400">{`${recallDate.from} ~ ${recallDate.to}`}</span>
        </div>
        <div className="pt-2 border-t border-gray-100 dark:border-zinc-700">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">리콜 사유</p>
          <p className="text-xs text-red-500 dark:text-red-400 font-medium leading-relaxed truncate h-[19.5px]">
            {product.shrtcomCn || product.injryCauseResult}
          </p>
        </div>
        <div className="pt-2 border-t border-gray-100 dark:border-zinc-700">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">조치 사항</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed truncate h-[19.5px]">
            {product.recallProcssInfo || product.cnsmrGhvrTips}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecallResultCard;
