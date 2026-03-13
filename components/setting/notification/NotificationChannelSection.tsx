"use client";

import { Switch } from "@/components/ui/switch";
import { BellIcon } from "lucide-react";
import { useState } from "react";

const NotificationChannelSection = () => {
  const [channel, setChannel] = useState(false);

  return (
    <section>
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        알림 채널
      </p>

      <div className="rounded-xl border divide-y overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-base">
            <BellIcon />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">푸시 알림</p>
            <p className="text-xs text-muted-foreground mt-0.5">웹 푸시 알림 전송</p>
          </div>
          <Switch checked={channel} onCheckedChange={() => setChannel((prev) => !prev)} />
        </div>
      </div>
    </section>
  );
};

export default NotificationChannelSection;
