"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useGetFcmState, useSubscribeFcm, useUnsubscribeFcm } from "@/hooks/useFcmToken";
import { BellIcon } from "lucide-react";
import { toast } from "sonner";

const NotificationChannelSection = () => {
  const { data, isPending, isError } = useGetFcmState();
  const { mutate: subscribe } = useSubscribeFcm();
  const { mutate: unsubscribe } = useUnsubscribeFcm();

  if (isPending) return <SkeletonUI />;
  if (isError) return <p className="text-16_B text-red-500 mb-10">에러가 발생하였습니다.</p>;

  const permission = typeof Notification !== "undefined" ? Notification.permission : "denied";
  const isSupported = typeof Notification !== "undefined" && "serviceWorker" in navigator;

  const handleSebscribe = () => {
    if (!isSupported) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      toast.error("지원하지 않는 브라우저입니다", {
        description: (
          <p className="text-red-500">
            {isMobile
              ? "모바일 환경에서는 푸시 알림을 지원하지 않아요"
              : "Chrome 또는 Edge 브라우저를 이용해주세요"}
          </p>
        ),
        duration: 5000
      });
      return;
    }

    if (permission === "denied") {
      toast.error("알림이 차단되어 있습니다", {
        description: (
          <p className="text-red-500">
            브라우저 주소창 자물쇠 아이콘 → 알림 → 허용으로 변경해주세요
          </p>
        ),
        duration: 5000
      });
      return;
    }
    if (data) {
      unsubscribe();
    } else {
      subscribe();
    }
  };

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
          <Switch checked={data} onCheckedChange={handleSebscribe} />
        </div>
      </div>
    </section>
  );
};

const SkeletonUI = () => {
  return (
    <section>
      <Skeleton className="mb-3 h-3 w-16" />

      <div className="rounded-xl border overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-2.5 w-28" />
          </div>
          <Skeleton className="h-5 w-9 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default NotificationChannelSection;
