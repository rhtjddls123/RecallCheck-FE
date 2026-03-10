"use client";

import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { ReactNode, useEffect } from "react";

interface AuthProvicerProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProvicerProps) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    authApi
      .getMe()
      .then((user) => setUser(user))
      .catch(() => {});
  }, [setUser]);

  return <>{children}</>;
};

export default AuthProvider;
