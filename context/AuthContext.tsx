import React, { createContext, ReactNode, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  location: string;
  disability: string;
}

interface AuthContextType {
  user: User;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  login: () => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => void;
  handleChange: (field: keyof User, value: string) => void;
}

const defaultUser: User = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  location: "",
  disability: "",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    // Simulate login success
    setIsLoggedIn(true);
    return true;
  };

  const loginWithGoogle = async () => {
    // TODO: Replace with actual Google login logic
    console.log("Google login placeholder");
    setUser({
      ...defaultUser,
      name: "Google User",
      email: "google@example.com",
    });
    setIsLoggedIn(true);
  };

  const loginWithFacebook = async () => {
    // TODO: Replace with actual Facebook login logic
    console.log("Facebook login placeholder");
    setUser({
      ...defaultUser,
      name: "Facebook User",
      email: "facebook@example.com",
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(defaultUser);
    setIsLoggedIn(false);
  };

  const handleChange = (field: keyof User, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser,
        login,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        handleChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
