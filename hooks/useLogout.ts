import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { unregisterFcmToken } from "./useFcmToken";

export const useLogout = () => {
  const { clearUser } = useAuthStore();

  const handleLogout = async () => {
    if ("serviceWorker" in navigator) {
      await unregisterFcmToken();
    }
    authApi.logout();
    clearUser();
  };

  return { onLogout: handleLogout };
};
