"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export default function KakaoCallback() {
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
        .then(() => authApi.getMe()) // 로그인 후 유저 정보 가져오기
        .then((user) => {
          setUser(user);
          router.replace(redirectUrl); // 로그인 후 메인 또는 이전 페이지로 이동
        });
    }
  }, [code, redirectUrl, router, setUser]);

  return <></>;
}
