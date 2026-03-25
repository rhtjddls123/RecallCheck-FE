import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import ImageWithDefault from "../common/ImageWithDefault";

interface SafetyInfoCardProps {
  title: string;
  description?: string;
  href: string;
  img: string;
}

const SafetyInfoCard = ({ title, description, img, href }: SafetyInfoCardProps) => {
  return (
    <Link target="_blank" href={href} className="flex gap-3 items-center">
      <ImageWithDefault className="size-19.25 rounded-2xl object-cover" src={img} alt={title} />

      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <h3 className="w-full text-18_B text-gray-950 dark:text-gray-100 truncate">{title}</h3>
        {description && (
          <span className="w-full text-12_M text-gray-600 dark:text-gray-400 truncate">
            {description}
          </span>
        )}
      </div>
    </Link>
  );
};

export const SafetyInfoCardSkeleton = () => {
  return (
    <div className="flex gap-3 items-center">
      <Skeleton className="size-19.25 rounded-2xl" />

      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <Skeleton className="w-full h-4.5" />
        <Skeleton className="w-full h-3" />
      </div>
    </div>
  );
};

export default SafetyInfoCard;
