"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";

interface DndSettings {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

const NotificationDndSection = () => {
  const [dnd, setDnd] = useState<DndSettings>({
    enabled: false,
    startTime: "22:00",
    endTime: "07:00"
  });

  const dndDescription = dnd.enabled
    ? `${dnd.startTime} ~ ${dnd.endTime} 동안 알림을 받지 않아요`
    : "설정된 시간에 알림을 받지 않아요";

  return (
    <section className="mb-8">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        방해금지 시간
      </p>

      <div className="rounded-xl border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div>
            <p className="text-sm font-medium">방해금지 모드</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{dndDescription}</p>
          </div>
          <Switch
            checked={dnd.enabled}
            onCheckedChange={(v) => setDnd((prev) => ({ ...prev, enabled: v }))}
          />
        </div>

        {dnd.enabled && (
          <>
            <Separator />
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm">
                <MoonIcon />
              </div>
              <Label className="flex-1 text-sm font-normal">시작 시간</Label>
              <Input
                type="time"
                value={dnd.startTime}
                onChange={(e) => setDnd((prev) => ({ ...prev, startTime: e.target.value }))}
                className="w-28 text-center text-sm"
              />
            </div>

            <Separator />
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm">
                <SunIcon />
              </div>
              <Label className="flex-1 text-sm font-normal">종료 시간</Label>
              <Input
                type="time"
                value={dnd.endTime}
                onChange={(e) => setDnd((prev) => ({ ...prev, endTime: e.target.value }))}
                className="w-28 text-center text-sm"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NotificationDndSection;
