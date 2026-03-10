"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

function KakaoCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const redirectUrl = state ? decodeURIComponent(state) : "/";

  useEffect(() => {
    if (code) {
      authApi
        .kakaoLogin(code)
        .then(() => authApi.getMe())
        .then((user) => {
          setUser(user);
          router.replace(redirectUrl);
        });
    }
  }, [code, redirectUrl, router, setUser]);

  return <></>;
}

export default function KakaoCallback() {
  return (
    <Suspense fallback={null}>
      <KakaoCallbackInner />
    </Suspense>
  );
}
