import ActivityTabs from "@/components/activity/ActivityTabs";
import Header from "@/components/common/Header";

interface ActivityPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ActivityPage = async ({ searchParams }: ActivityPageProps) => {
  const params = await searchParams;

  return (
    <div>
      <Header title="최근 활동" />

      <div className="h-[calc(100dvh-120px)]">
        <ActivityTabs params={params} />
      </div>
    </div>
  );
};

export default ActivityPage;
