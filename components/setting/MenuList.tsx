"use client";

import { useLogout } from "@/hooks/useLogout";
import { Switch } from "../ui/switch";
import { useAuthStore } from "@/store/authStore";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import TermsPolicyModal from "./TermsPolicyModal";
import ConfirmModal from "../common/ConfirmModal";
import Link from "next/link";

const MenuList = () => {
  const { user } = useAuthStore();
  const { onLogout } = useLogout();
  const { onDeleteAccount } = useDeleteAccount();
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white select-none flex flex-col justify-center gap-2 text-16_M rounded-xl">
        <Link href={"/setting/notification"} className="p-4 cursor-pointer">
          알림 관리
        </Link>
        <TermsPolicyModal />
        <div className="p-4 flex items-center justify-between">
          <label htmlFor="dark-mode" className="cursor-pointer">
            다크 모드로 전환
          </label>
          <Switch id="dark-mode" className="cursor-pointer" />
        </div>
      </div>

      {user && (
        <div className="text-14_M text-gray-400 flex justify-center gap-4">
          <ConfirmModal title="로그아웃" description="로그아웃 하시겠습니까?" onConfirm={onLogout}>
            <span className="underline cursor-pointer">로그아웃</span>
          </ConfirmModal>
          <ConfirmModal
            title="회원탈퇴"
            description={
              <>
                <span>정말 탈퇴하시겠습니까?</span>
                <br />
                <span>
                  탈퇴 시 모든 개인정보(검색 기록, 방문 기록)는 즉시 삭제되며 복구할 수 없습니다.
                </span>
              </>
            }
            onConfirm={onDeleteAccount}
          >
            <span className="underline cursor-pointer">회원탈퇴</span>
          </ConfirmModal>
        </div>
      )}
    </div>
  );
};

export default MenuList;
