import ActivityTabs from "@/components/activity/ActivityTabs";
import Header from "@/components/common/Header";

const ActivityPage = () => {
  return (
    <div>
      <Header title="최근 활동" />

      <ActivityTabs />
    </div>
  );
};

export default ActivityPage;
