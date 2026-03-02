import RecallItem from "../common/RecallItem";
import RecallPagination from "./RecallPagination";
import { RecallPaginationResponse } from "@/types/response.type";

interface RecallProductListProps {
  recallData: RecallPaginationResponse;
}

const RecallProductList = ({ recallData }: RecallProductListProps) => {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-between h-full flex-1">
      <div className="grid grid-cols-2 gap-4 bg-white">
        {recallData.data.map((p) => (
          <RecallItem
            key={p.recallSn}
            href={`/recall/${p.recallSn}`}
            title={p.productNm}
            description={p.makr || p.bsnmNm || ""}
            img={p.recallImgUrls?.[0]}
          />
        ))}
      </div>
      {recallData.data.length === 0 && <p>데이터가 없습니다.</p>}
      <RecallPagination totalPage={recallData.totalPages} />
    </div>
  );
};

export default RecallProductList;
