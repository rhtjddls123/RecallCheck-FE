import { usePathname, useRouter } from "next/navigation";

export const useLogin = () => {
  const pathname = usePathname();

  const state = encodeURIComponent(pathname);
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=${state}`;

  const router = useRouter();

  const handleKakaoLogin = () => {
    router.push(kakaoAuthUrl);
  };

  return { onLogin: handleKakaoLogin };
};
