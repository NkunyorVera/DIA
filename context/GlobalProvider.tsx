import { getCurrentUser } from "@/lib/appwite_utility";
import { UserProfile } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";

type GlobalContextType = {
  user: UserProfile | any;
  isLoading: boolean;
  isLoggedIn: boolean;
  setUser: (value: Partial<UserProfile> | any) => void;
  setIsLoggedIn: (value: boolean) => void;
};

const GlobalContext = createContext<GlobalContextType>({
  user: null,
  isLoading: true,
  isLoggedIn: false,
  setUser: () => {},
  setIsLoggedIn: () => {},
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setUser(res);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch current user:", error);
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoading, isLoggedIn, user, setUser, setIsLoggedIn }}
    >
      {isLoading ? (
        <SafeAreaView className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#9333ea" />
        </SafeAreaView>
      ) : (
        children
      )}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, GlobalProvider, useGlobalContext };
