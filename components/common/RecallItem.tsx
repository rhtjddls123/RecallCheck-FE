import Link from "next/link";

interface RecallItemProps {
  href: string;
  title: string;
  description: string;
}

const RecallItem = ({ description, href, title }: RecallItemProps) => {
  return (
    <Link href={href} className="flex flex-col gap-3 w-33">
      <div className="size-33 rounded-2xl bg-blue-400">{/* 이미지 영역(교체예정) */}</div>

      <div className="flex flex-col gap-2 items-center justify-center">
        <h3 className="text-16_B text-gray-950 w-25 text-center truncate">{title}</h3>
        <span className="text-14_M text-gray-600 w-25 text-center truncate">{description}</span>
      </div>
    </Link>
  );
};

export default RecallItem;
