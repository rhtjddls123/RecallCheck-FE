"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClockIcon, ImageIcon, SearchIcon } from "lucide-react";
import SearchList from "./SearchList";
import { LogTypeEnum } from "@/const/LogTypeEnum.const";
import ViewList from "./ViewList";
import ImageList from "./ImageList";
import { useAuthGuard } from "@/hooks/useAuth";
import LoginFallback from "../common/LoginFallback";

const TABS = [
  { name: "SEARCH", Icon: SearchIcon },
  { name: "VIEW", Icon: ClockIcon },
  { name: "IMAGE", Icon: ImageIcon }
];

const ActivityTabs = () => {
  const status = useAuthGuard();

  if (status === "unauthorized") return <LoginFallback />;

  return (
    <Tabs defaultValue={TABS[0].name} className="px-3">
      <TabsList variant="line">
        {TABS.map((v) => (
          <TabsTrigger key={v.name} value={v.name}>
            <v.Icon className="size-6" />
          </TabsTrigger>
        ))}
      </TabsList>
      <p className="text-16_M rounded-2xl border-[1.5px] border-gray-300 px-4 py-2.5">
        최근 본 콘텐츠를 쉽게 찾아볼 수 있어요!
      </p>

      <TabsContent value="SEARCH">
        <SearchList type={LogTypeEnum.SEARCH} />
      </TabsContent>
      <TabsContent value="VIEW">
        <ViewList type={LogTypeEnum.VIEW} />
      </TabsContent>
      <TabsContent value="IMAGE">
        <ImageList type={LogTypeEnum.IMG} />
      </TabsContent>
    </Tabs>
  );
};

export default ActivityTabs;
