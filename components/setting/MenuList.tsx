"use client";

import { useLogout } from "@/hooks/useLogout";
import { Switch } from "../ui/switch";
import { useAuthStore } from "@/store/authStore";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";

const MenuList = () => {
  const { user } = useAuthStore();
  const { onLogout } = useLogout();
  const { onDeleteAccount } = useDeleteAccount();
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white select-none flex flex-col justify-center gap-2 text-16_M rounded-xl">
        <div className="p-4 cursor-pointer">알림 관리</div>
        <div className="p-4 cursor-pointer">약관 및 정책</div>
        <div className="p-4 flex items-center justify-between">
          <label htmlFor="dark-mode" className="cursor-pointer">
            다크 모드로 전환
          </label>
          <Switch id="dark-mode" className="cursor-pointer" />
        </div>
      </div>

      {user && (
        <div className="text-14_M text-gray-400 flex justify-center gap-4">
          <span className="underline cursor-pointer" onClick={onLogout}>
            로그아웃
          </span>
          <span className="underline cursor-pointer" onClick={onDeleteAccount}>
            회원탈퇴
          </span>
        </div>
      )}
    </div>
  );
};

export default MenuList;
