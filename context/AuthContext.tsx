import { account } from "@/lib/appwrite";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView, Text } from "react-native";
import { AppwriteException } from "react-native-appwrite";

type UserType = {
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  password: string;
  disability?: string;
};

type AuthContextType = {
  loading: boolean;
  session: any;
  user: any;
  signin: (param: UserType) => Promise<void>;
  signout: () => Promise<void>;
  signup: (param: UserType) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  loading: true,
  session: null,
  user: null,
  signin: async () => {},
  signout: async () => {},
  signup: async () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const responseSession = await account.getSession("current");
        if (responseSession) {
          setSession(responseSession);
          const responseUser = await account.get();
          setUser(responseUser);
        }
      } catch (error) {
        Alert.alert("Error", "Error fetching session or user");
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const signin = async ({ email, password }: UserType) => {
    try {
      setLoading(true);
      const responseSession = await account.createEmailPasswordSession(
        email,
        password
      );
      setSession(responseSession);
      const responseUser = await account.get();
      setUser(responseUser);
      Alert.alert("Success", "Signin successfull");
    } catch (error) {
      Alert.alert("Error", "Error signing in");
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ email, password, name }: UserType) => {
    try {
      setLoading(true);
      // Step 1: Create user account
      await account.create("unique()", email, password, name);
      // Step 2: Automatically log in after registration
      const responseSession = await account.createEmailPasswordSession(
        email,
        password
      );
      setSession(responseSession);

      // Step 3: Fetch user info
      const responseUser = await account.get();
      setUser(responseUser);
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <AuthContext.Provider
      value={{ loading, session, user, signin, signout, signup }}
    >
      {loading ? (
        <SafeAreaView className="flex-1 items-center justify-center">
          <Text className="text-2xl text-primary font-bold">Loading...</Text>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
