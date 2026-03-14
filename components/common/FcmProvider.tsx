"use client";

import { useSse } from "@/hooks/useSse";
import { getApps, initializeApp } from "firebase/app";
import { getMessaging, isSupported, onMessage } from "firebase/messaging";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const FcmProvider = () => {
  useSse();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = async () => {
      const supported = await isSupported();
      if (!supported) return;

      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const messaging = getMessaging(app);
      const unsubscribe = onMessage(messaging, () => {});

      return () => unsubscribe();
    };

    init();
  }, []);

  return null;
};

export default FcmProvider;
