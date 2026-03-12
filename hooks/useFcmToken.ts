import { useEffect } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp, getApps } from "firebase/app";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const useFcmToken = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;
    if (typeof window === "undefined") return; // SSR 방지
    if (!("serviceWorker" in navigator)) return; // 지원 여부 확인

    const registerFcm = async () => {
      try {
        // 알림 권한 요청
        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;

        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
        const messaging = getMessaging(app);

        // FCM 토큰 발급
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          )
        });

        if (!token) return;

        // 서버에 토큰 전송
        await api.post("/notification/fcm-token", { token });
      } catch (error) {
        console.error("FCM 토큰 등록 실패:", error);
      }
    };

    void registerFcm();
  }, [user?.id]);
};
