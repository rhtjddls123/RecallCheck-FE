"use client";

import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

interface AuthProvicerProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProvicerProps) => {
  useAuth();

  return <>{children}</>;
};

export default AuthProvider;
