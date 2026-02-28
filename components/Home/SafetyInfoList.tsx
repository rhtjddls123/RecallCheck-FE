import SafetyInfoCard from "./SafetyInfoCard";

const SafetyInfoList = () => {
  return (
    <div className="flex flex-col gap-5">
      {[1, 2, 3].map((v) => (
        <SafetyInfoCard
          key={v}
          href=""
          title="전자파 차단 제품, 진짜 전자파가 차단될까?"
          description="한국소비자원 스마트폰 어쩌구저쩌구"
        />
      ))}
    </div>
  );
};

export default SafetyInfoList;
