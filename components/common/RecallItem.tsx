import Link from "next/link";

interface RecallItemProps {
  href: string;
  title: string;
  description: string;
  img: string;
  alt?: string;
}

const RecallItem = ({ description, href, title, alt, img }: RecallItemProps) => {
  return (
    <Link href={href} className="flex flex-col gap-3 w-33">
      <img src={img} alt={alt} className="size-33 rounded-2xl bg-blue-400 object-cover" />

      <div className="flex flex-col gap-2 justify-center px-2">
        <h3 className="text-16_B text-gray-950 w-full truncate">{title}</h3>
        <span className="text-14_M text-gray-600 w-full truncate">{description}</span>
      </div>
    </Link>
  );
};

export default RecallItem;
