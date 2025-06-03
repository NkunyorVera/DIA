// lib/authService.ts
import { account, avatars, databases } from "@/lib/appwrite";
import { AppwriteException, ID } from "react-native-appwrite";

const USERS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) {
      throw new Error("Failed to sign in");
    }

    return session;
  } catch (error) {
    if (error instanceof AppwriteException) {
      throw new Error(`Sign-in failed: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during sign-in");
  }
};

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    // Fix: include ID.unique() as first parameter
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password); // Ensure this works and sets up session

    const newUser = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        email,
        username,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
