import Header from "@/components/common/Header";
import NotificationSettings from "@/components/setting/notification/NotificationSettings";
import { ScrollArea } from "@/components/ui/scroll-area";

const NotificationSettinigPage = () => {
  return (
    <div>
      <Header title="알림 관리" />

      <ScrollArea className="h-[calc(100dvh-120px)]">
        <NotificationSettings />
      </ScrollArea>
    </div>
  );
};

export default NotificationSettinigPage;
