import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp, getApps } from "firebase/app";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "@/services/notificationService";

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
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission !== "granted") return;

    const { messaging, sw } = await getFirebaseMessaging();
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: sw
    });

    if (!token) return;
    await api.delete("/notification/fcm-token", { data: { token } });
  } catch (error) {
    console.error("FCM 토큰 삭제 실패:", error);
  }
};

export const getCurrentFcmToken = async () => {
  try {
    if (!("serviceWorker" in navigator)) return null;

    const permission = Notification.permission;
    if (permission !== "granted") return null;

    const { messaging, sw } = await getFirebaseMessaging();
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: sw
    });

    return token || null;
  } catch {
    return null;
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

export const useGetFcmState = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["fcmState", user?.id],
    queryFn: async () => notificationApi.checkPushEnabled(),
    enabled: !!user
  });
};

export const useSubscribeFcm = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: () => registerFcmToken(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fcmState", user?.id] });
    }
  });
};
export const useUnsubscribeFcm = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: () => unregisterFcmToken(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fcmState", user?.id] });
    }
  });
};
