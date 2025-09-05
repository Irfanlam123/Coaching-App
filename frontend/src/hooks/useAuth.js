import { useAuthContext } from "../context/AuthContext";

// Simple wrapper to use auth context easily
export default function useAuth() {
  const { user, login, logout } = useAuthContext();
  return { user, login, logout };
}
