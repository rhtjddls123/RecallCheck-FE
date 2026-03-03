import { Skeleton } from "../ui/skeleton";

const RecallItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-33">
      <Skeleton className="size-33 rounded-2xl" />

      <div className="flex flex-col gap-2 justify-center px-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-3.5" />
      </div>
    </div>
  );
};

export default RecallItemSkeleton;
