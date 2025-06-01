import { AppwriteException, ID } from "react-native-appwrite";
import { databases, storage } from "../lib/appwrite"; // adjust the path as needed

export const createUserProfile = async ({
  userId,
  email,
  name,
  phone,
  address,
  disability,
}: {
  userId: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  disability: string;
}) => {
  return await databases.createDocument(
    process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
    userId,
    {
      userId,
      email,
      name,
      address,
      disability,
      phone,
    }
  );
};

export const updateFileUrl = async (
  userId: string,
  imageId: string,
  fieldName: string
): Promise<void> => {
  try {
    await databases.updateDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      userId,
      { [fieldName]: imageId }
    );
  } catch (error) {
    console.error("Error updating user profile with image:", error);
  }
};

export const uploadFile = async (
  file: {
    uri: string;
    name: string;
    type: string;
    size: number;
  },
  onError: (error: string) => void,
  onSuccess: () => void
): Promise<string | undefined> => {
  try {
    const uploaded = await storage.createFile(
      process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!,
      ID.unique(),
      file
    );
    onSuccess();
    return uploaded?.$id;
  } catch (error) {
    if (error instanceof AppwriteException)
      onError(`Failed to upload image: ${error.message}`);
  }
};
