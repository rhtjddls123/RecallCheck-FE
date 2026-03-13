import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { unregisterFcmToken } from "./useFcmToken";

export const useDeleteAccount = () => {
  const { clearUser } = useAuthStore();

  const handleDeleteAccount = async () => {
    if ("serviceWorker" in navigator) {
      await unregisterFcmToken();
    }

    authApi.deleteAccount();
    clearUser();
  };

  return { onDeleteAccount: handleDeleteAccount };
};
