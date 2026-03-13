"use client";

import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";
import { useLogin } from "@/hooks/useLogin";

const LoginFallback = () => {
  const { onLogin } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 h-full">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <LockIcon size={20} className="text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">로그인이 필요한 페이지입니다</p>
      <Button size="sm" onClick={onLogin} className="cursor-pointer">
        로그인
      </Button>
    </div>
  );
};

export default LoginFallback;
