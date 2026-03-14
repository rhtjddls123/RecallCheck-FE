import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import ImageWithDefault from "./ImageWithDefault";

export const RecallItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-33">
      <Skeleton className="size-33 rounded-2xl dark:bg-zinc-700" />

      <div className="flex flex-col gap-2 justify-center px-2">
        <Skeleton className="w-full h-4 dark:bg-zinc-700" />
        <Skeleton className="w-full h-3.5 dark:bg-zinc-700" />
      </div>
    </div>
  );
};

interface RecallItemProps {
  href: string;
  title: string;
  description: string;
  img?: string;
  alt?: string;
}

const RecallItem = ({ description, href, title, alt, img }: RecallItemProps) => {
  return (
    <Link href={href} className="flex flex-col gap-3 w-33">
      <ImageWithDefault src={img} alt={alt} className="size-33 rounded-2xl object-cover" />

      <div className="flex flex-col gap-2 justify-center px-2">
        <h3 className="select-none text-16_B text-gray-950 dark:text-gray-100 w-full truncate">
          {title}
        </h3>
        <span className="select-none text-14_M text-gray-600 dark:text-gray-400 w-full truncate">
          {description}
        </span>
      </div>
    </Link>
  );
};

export default RecallItem;
