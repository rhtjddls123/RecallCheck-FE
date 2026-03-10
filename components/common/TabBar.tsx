import { ClockIcon, HomeIcon, ListIcon, MessageCircleMoreIcon, SettingsIcon } from "lucide-react";
import NavLink from "./NavLink";

const NAV_ITEM = [
  { href: "/", name: "홈", Icon: HomeIcon },
  { href: "/chat", name: "챗봇", Icon: MessageCircleMoreIcon },
  { href: "/recall", name: "리콜제품", Icon: ListIcon },
  { href: "/activity", name: "최근 활동", Icon: ClockIcon },
  { href: "/setting", name: "설정", Icon: SettingsIcon }
];

const TabBar = () => {
  return (
    <div className="flex justify-between items-center w-full h-19">
      {NAV_ITEM.map((item) => (
        <NavLink
          key={item.name}
          href={item.href}
          className="size-11 flex flex-col items-center gap-1.5 justify-center"
          activeClassName="text-blue-300"
          end
        >
          <item.Icon className="size-6" />
          <span className="text-12_M h-3.5">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default TabBar;
