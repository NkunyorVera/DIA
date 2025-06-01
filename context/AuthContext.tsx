import { account } from "@/lib/appwrite";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView } from "react-native";
import { AppwriteException } from "react-native-appwrite";

type AuthContextType = {
  loading: boolean;
  session: any;
  user: any;
  updateUserAndSession: () => Promise<void>;
  signout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  loading: true,
  session: null,
  user: null,
  updateUserAndSession: async () => {},
  signout: async () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (session) return; // Prevent re-initialization if session already exists
    const init = async () => {
      try {
        const responseSession = await account.getSession("current");
        if (responseSession) {
          setSession(responseSession);
          const responseUser = await account.get();
          setUser(responseUser);
        }
      } catch (error) {
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const signout = async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      if (error instanceof AppwriteException)
        Alert.alert("Error", ` ${error.message}`);
    } finally {
      setSession(null);
      setUser(null);
    }
  };

  const updateUserAndSession = async () => {
    try {
      setLoading(true);
      const responseSession = await account.getSession("current");
      if (responseSession) {
        setSession(responseSession);
        const responseUser = await account.get();
        setUser(responseUser);
      }
    } catch (error) {
      console.error("Error updating user and session:", error);
      Alert.alert("Error", "Failed to update user and session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loading, session, user, updateUserAndSession, signout }}
    >
      {loading ? (
        <SafeAreaView className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#9333ea" />
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
