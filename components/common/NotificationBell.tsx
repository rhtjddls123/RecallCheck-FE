"use client";

import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNotificationStore } from "@/store/notificationStore";
import { useAuthStore } from "@/store/authStore";
import NotificationList from "./NotificationList";

const NotificationBell = () => {
  const { user } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  if (!user) return <div></div>;

  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative">
          <Bell className="w-6 h-6 cursor-pointer" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-red-500">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <NotificationList />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
