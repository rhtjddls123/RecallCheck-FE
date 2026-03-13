import { getMessaging, getToken, deleteToken } from "firebase/messaging";
import { initializeApp, getApps } from "firebase/app";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const getFirebaseMessaging = async () => {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const messaging = getMessaging(app);
  const sw = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
  return { messaging, sw };
};

export const registerFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const { messaging, sw } = await getFirebaseMessaging();
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: sw
    });

    if (!token) return;
    await api.post("/notification/fcm-token", { token });
  } catch (error) {
    console.error("FCM 토큰 등록 실패:", error);
  }
};

export const unregisterFcmToken = async () => {
  try {
    const { messaging, sw } = await getFirebaseMessaging();
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: sw
    });

    if (!token) return;
    await api.delete("/notification/fcm-token", { data: { token } });
    await deleteToken(messaging); // Firebase에서도 삭제
  } catch (error) {
    console.error("FCM 토큰 삭제 실패:", error);
  }
};

// 훅 (자동 등록용)
export const useFcmToken = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    void registerFcmToken();
  }, [user?.id]);
};
