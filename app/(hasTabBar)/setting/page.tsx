import Header from "@/components/common/Header";
import MenuList from "@/components/setting/MenuList";
import Profile from "@/components/setting/Profile";
import { ScrollArea } from "@/components/ui/scroll-area";

const SettingPage = () => {
  return (
    <div>
      <Header title="설정" />

      <ScrollArea className="h-[calc(100dvh-120px)] bg-gray-50 p-4">
        <div className="flex flex-col gap-4">
          <Profile />
          <MenuList />
        </div>
      </ScrollArea>
    </div>
  );
};

export default SettingPage;
