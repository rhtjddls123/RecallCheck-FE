"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { registerFcmToken, unregisterFcmToken } from "@/hooks/useFcmToken";
import { notificationApi } from "@/services/notificationService";

function KakaoCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();
  const { settingUnread } = useNotificationStore();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const redirectUrl = state ? decodeURIComponent(state) : "/";

  useEffect(() => {
    if (code) {
      authApi
        .kakaoLogin(code)
        .then(() => authApi.getMe())
        .then(async (user) => {
          setUser(user);
          settingUnread(user.unreadCount);

          if ("serviceWorker" in navigator) {
            const isPushEnabled = await notificationApi.checkPushEnabled();

            if (!isPushEnabled) {
              await unregisterFcmToken();
              await registerFcmToken();
            }
          }

          router.replace(redirectUrl);
        });
    }
  }, [code, redirectUrl, router, setUser, settingUnread]);

  return <></>;
}

export default function KakaoCallback() {
  return (
    <Suspense fallback={null}>
      <KakaoCallbackInner />
    </Suspense>
  );
}
