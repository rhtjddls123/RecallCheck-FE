import { RecentSafetyInfoType } from "@/types/safetyInfo.type";
import SafetyInfoCard from "./SafetyInfoCard";

const SafetyInfoList = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/safety-info/recent?take=3`, {
    next: { revalidate: 60 * 10 } // 10분마다 재검증
  });
  const safetyInfos = (await res.json()) as RecentSafetyInfoType[];

  return (
    <div className="flex flex-col gap-5">
      {safetyInfos.map((safetyInfo) => (
        <SafetyInfoCard
          key={safetyInfo.id}
          href={safetyInfo.infoUrl}
          title={safetyInfo.title}
          img={safetyInfo.tmnlImgUrl || "/defaultImg.jpeg"}
          description="소비자24"
        />
      ))}
    </div>
  );
};

export default SafetyInfoList;
