import { create } from "zustand";
import { persist } from "zustand/middleware";
import authService from "../../service/authService";
import type { User } from "../../service/authService"; 

export type Rol = "Administrador" | "Coordinador" | "Autoridad" | "Docente";

interface AuthState {
  user: User | null; // 👈 ahora usamos el tipo del servicio real
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  login: (userData: User) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: (userData) => {
        set({ user: userData, isAuthenticated: true, error: null });
      },

      logout: () => {
        authService.logout(); // limpia y redirige
        set({ user: null, isAuthenticated: false });
      },

      loadUserFromStorage: () => {
        const user = authService.getCurrentUser();
        if (user) set({ user, isAuthenticated: true });
      },
    }),
    {
      name: "auth-storage", 
    }
  )
);
