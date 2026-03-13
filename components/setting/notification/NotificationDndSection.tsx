"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useGetQuietTime, useSetQuietTime } from "@/hooks/useFcmToken";
import { GetQuietTimeResponse } from "@/types/response.type";
import { MoonIcon, SunIcon } from "lucide-react";
import { useRef } from "react";

const NotificationDndSection = () => {
  const { data, isPending, isError } = useGetQuietTime();

  if (isPending) return <SkeletonUI />;
  if (isError) return <p>에러가 발생하였습니다.</p>;

  return <NotificationDndForm data={data} />;
};

const NotificationDndForm = ({ data }: { data: GetQuietTimeResponse }) => {
  const { mutateAsync: setQuiteTimeMutate, isPending: isSetQuiteTimePending } = useSetQuietTime();
  const startRef = useRef(data.quietStart);
  const endRef = useRef(data.quietEnd);

  const dndEnabled = !!data.quietStart && !!data.quietEnd;

  const handleToggle = async () => {
    if (isSetQuiteTimePending) return;

    if (dndEnabled) setQuiteTimeMutate({ quietStart: null, quietEnd: null });
    else setQuiteTimeMutate({ quietStart: "22:00", quietEnd: "07:00" });
  };

  const dndDescription = dndEnabled
    ? `${data.quietStart} ~ ${data.quietEnd} 동안 알림을 받지 않아요`
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
          <Switch checked={dndEnabled} onCheckedChange={handleToggle} />
        </div>

        {dndEnabled && (
          <>
            <Separator />
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm">
                <MoonIcon />
              </div>
              <Label className="flex-1 text-sm font-normal">시작 시간</Label>
              <Input
                type="time"
                defaultValue={data.quietStart!}
                onChange={(e) => {
                  startRef.current = e.target.value;
                }}
                onBlur={() =>
                  setQuiteTimeMutate({ quietStart: startRef.current, quietEnd: endRef.current })
                }
                className="w-31 text-center text-sm"
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
                defaultValue={data.quietEnd!}
                onChange={(e) => {
                  endRef.current = e.target.value;
                }}
                onBlur={() =>
                  setQuiteTimeMutate({ quietStart: startRef.current, quietEnd: endRef.current })
                }
                className="w-31 text-center text-sm"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const SkeletonUI = () => {
  return (
    <section className="mb-8">
      <Skeleton className="mb-3 h-3 w-16" />

      <div className="rounded-xl border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-2.5 w-40" />
          </div>
          <Skeleton className="h-5 w-9 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default NotificationDndSection;
