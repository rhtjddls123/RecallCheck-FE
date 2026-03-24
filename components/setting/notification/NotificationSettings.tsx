"use client";

import NotificationChannelSection from "./NotificationChannelSection";
import NotificationDndSection from "./NotificationDndSection";
import NotificationCategorySection from "./NotificationCategorySection";
import NotificationKeywordSection from "./NotificationKeywordSection";
import { useAuthGuard } from "@/hooks/useAuth";
import LoginFallback from "@/components/common/LoginFallback";

export default function NotificationSettings() {
  const status = useAuthGuard();

  if (status === "unauthorized") return <LoginFallback />;

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-7">
        <h1 className="text-xl font-medium">알림 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          구독 중인 카테고리와 알림 수신 설정을 관리하세요
        </p>
      </div>

      <NotificationCategorySection />
      <NotificationKeywordSection />
      <NotificationDndSection />
      <NotificationChannelSection />
    </div>
  );
}
