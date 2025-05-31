// lib/authService.ts
import { account } from "@/lib/appwrite";
import { UserType } from "@/lib/types";
import { AppwriteException } from "react-native-appwrite";
import { logIfDev, validateInputs } from "./utils";

export const signin = async (
  user: UserType,
  onSuccess: () => void,
  onError: (message: string) => void,
  setLoading: (loading: boolean) => void
) => {
  const validationError = validateInputs(user);
  if (validationError) return onError(validationError);

  try {
    setLoading(true);
    await account.createEmailPasswordSession(user.email, user.password);
    const accountData = await account.get();
    logIfDev("Signed in account data:", accountData);
    onSuccess();
  } catch (error) {
    const message =
      error instanceof AppwriteException
        ? error.message || "Authentication error"
        : "Error signing in";
    logIfDev("Sign in error:", error);
    onError(message);
  } finally {
    setLoading(false);
  }
};

export const signup = async (
  user: UserType,
  onSuccess: () => void,
  onError: (message: string) => void,
  setLoading: (loading: boolean) => void
) => {
  const validationError = validateInputs(user);
  if (validationError) return onError(validationError);

  try {
    setLoading(true);
    await account.create("unique()", user.email, user.password, user.name);
    await account.createEmailPasswordSession(user.email, user.password);
    await account.get();
    logIfDev("Account created successfully");
    onSuccess();
  } catch (error) {
    const message =
      error instanceof AppwriteException
        ? error.message || "Signup error"
        : "Error creating account";
    logIfDev("Signup error:", error);
    onError(message);
  } finally {
    setLoading(false);
  }
};
