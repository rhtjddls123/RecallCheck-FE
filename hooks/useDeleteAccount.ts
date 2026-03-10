import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export const useDeleteAccount = () => {
  const { clearUser } = useAuthStore();

  const handleDeleteAccount = () => {
    authApi.deleteAccount();
    clearUser();
  };

  return { onDeleteAccount: handleDeleteAccount };
};
