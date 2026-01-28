import React, { createContext, useContext, useState } from "react";
import type { User } from "../types/auth"; // 타입 import 확인

// Context 타입
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Provider 컴포넌트
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [user, setUser] = useState<User | null>(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userName = localStorage.getItem("userName");
      const userRole = localStorage.getItem("userRole");

      if (accessToken && userName && refreshToken && userRole) {
        return { accessToken, refreshToken, userName, userRole };
      }
      return null;
    } catch {
      return null;
    }
  });

  const login = (userData: User) => {
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    localStorage.setItem("userName", userData.userName);
    localStorage.setItem("userRole", userData.userRole || "USER");
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};