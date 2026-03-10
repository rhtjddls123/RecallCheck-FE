"use client";

import { useAuthStore } from "@/store/authStore";
import ImageWithDefault from "../common/ImageWithDefault";
import { useLogin } from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";

const Profile = () => {
  const { user } = useAuthStore();
  const { onLogin } = useLogin();
  const { onLogout } = useLogout();

  return (
    <>
      {user ? (
        <div className="flex gap-3 items-center p-4 bg-white rounded-xl" onClick={onLogout}>
          <ImageWithDefault
            src={user.profileImage}
            alt="프로필 이미지"
            className="size-15 object-cover rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="text-16_B text-gray-950">{user.nickname}</p>
            <span className="text-12_M text-gray-400">{user.kakaoId}</span>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-between gap-2 p-4 bg-white rounded-xl"
          onClick={onLogin}
        >
          <span className="text-14_M">로그인하시면 서비스 이용이 가능해요.</span>
          <button
            onClick={onLogin}
            className="w-fit border-2 border-blue-300 py-1 px-2 rounded-2xl text-14_M text-blue-300 cursor-pointer hover:text-blue-400 hover:border-blue-400 transition-all duration-150"
          >
            로그인
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
