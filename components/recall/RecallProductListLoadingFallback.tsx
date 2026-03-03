import RecallItemSkeleton from "../common/RecallItemSkeleton";

const RecallProductListLoadingFallback = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-between h-full flex-1">
      <div className="grid grid-cols-2 gap-4 bg-white">
        {Array.from({ length: 10 }).map((_, i) => (
          <RecallItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default RecallProductListLoadingFallback;
