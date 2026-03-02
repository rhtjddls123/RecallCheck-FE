import RecallItem from "../common/RecallItem";
import RecallPagination from "./RecallPagination";
import { RecallPaginationResponse } from "@/types/response.type";

interface RecallProductListProps {
  recallData: RecallPaginationResponse;
}

const RecallProductList = ({ recallData }: RecallProductListProps) => {
  return (
    <div className="w-full bg-white flex flex-col items-center">
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
      <RecallPagination totalPage={6} />
    </div>
  );
};

export default RecallProductList;
