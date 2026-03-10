import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export const useLogout = () => {
  const { clearUser } = useAuthStore();

  const handleLogout = () => {
    authApi.logout();
    clearUser();
  };

  return { onLogout: handleLogout };
};
