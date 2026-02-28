import Link from "next/link";

interface SafetyInfoCardProps {
  title: string;
  description: string;
  href: string;
}

const SafetyInfoCard = ({ title, description, href }: SafetyInfoCardProps) => {
  return (
    <Link href={href} className="flex gap-3 justify-center items-center">
      {/* 이미지(추후 교체) */}
      <div className="size-19.25 rounded-2xl bg-blue-400" />

      <div className="flex flex-col gap-1.5 justify-center items-center">
        <h3 className="w-63.5 text-18_B text-gray-950 truncate">{title}</h3>
        <span className="w-63.5 text-12_M text-gray-600 truncate">{description}</span>
      </div>
    </Link>
  );
};

export default SafetyInfoCard;
