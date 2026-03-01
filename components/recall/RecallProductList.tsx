"use client";
import RecallItem from "../common/RecallItem";
import RecallPagination from "./RecallPagination";

const RecallProductList = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center">
      <div className="grid grid-cols-2 gap-4 bg-white">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
          <RecallItem key={v} href="" title="테스트" description="테스트" img="/defaultImg.jpeg" />
        ))}
      </div>
      <RecallPagination totalPage={6} />
    </div>
  );
};

export default RecallProductList;
