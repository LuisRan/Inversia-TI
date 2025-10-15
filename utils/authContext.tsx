"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  email: string;
  username: string;
  date : string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Cargar sesión guardada en localStorage al iniciar app
  useEffect(() => {
  const savedUser = localStorage.getItem("authUser");
  if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
    try {
      setUser(JSON.parse(savedUser));
    } catch (e) {
      console.error("Error parsing authUser from localStorage:", e);
      localStorage.removeItem("authUser"); // Limpia localStorage si está corrupto
    }
  }
}, []);


  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
