import ActivityTabs from "@/components/activity/ActivityTabs";
import Header from "@/components/common/Header";

const ActivityPage = () => {
  return (
    <div>
      <Header title="최근 활동" />

      <div className="h-[calc(100dvh-120px)]">
        <ActivityTabs />
      </div>
    </div>
  );
};

export default ActivityPage;
