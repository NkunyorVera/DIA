import * as ImagePicker from "expo-image-picker";
import { AppwriteException, ID } from "react-native-appwrite";
import { databases, storage } from "../lib/appwrite";

// Constants for repeated values
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const STORAGE_ID = process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!;

// Type definitions for better type safety
type UserProfile = {
  userId: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  disability: string;
  photoUrl?: string;
};

type FileUpload = {
  uri: string;
  name: string;
  type: string;
  size: number;
};

/**
 * Handles Appwrite errors consistently
 */
const handleAppwriteError = (error: unknown, defaultMessage: string): never => {
  if (error instanceof AppwriteException) {
    throw new Error(`${defaultMessage}: ${error.message}`);
  }
  throw new Error(defaultMessage);
};

/**
 * Creates a new user profile document
 */
export const createUserProfile = async (profile: UserProfile) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      profile.userId,
      profile
    );
  } catch (error) {
    handleAppwriteError(error, "Failed to create user profile");
  }
};

/**
 * Updates a specific field in user document with a file reference
 */
export const updateFileReference = async (
  userId: string,
  fileId: string,
  fieldName: string
): Promise<void> => {
  try {
    await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, {
      [fieldName]: fileId,
    });
  } catch (error) {
    handleAppwriteError(error, "Failed to update file reference");
  }
};

/**
 * Uploads a file to storage and returns its ID
 */
export const uploadFile = async (file: FileUpload): Promise<string> => {
  try {
    const uploadedFile = await storage.createFile(
      STORAGE_ID,
      ID.unique(),
      file
    );
    return uploadedFile.$id;
  } catch (error) {
    handleAppwriteError(error, "Failed to upload file");
  }
  throw new Error("Failed to upload file: Unknown error");
};

/**
 * Fetches complete user profile information
 */
export const fetchUserInfo = async (userId: string): Promise<UserProfile> => {
  try {
    const res = await databases.getDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userId
    );

    return {
      userId,
      name: res.name || "YOUR BUNL",
      email: res.email || "maysasha@gmail.com",
      phone: res.phone || "+1.415.111.0000",
      address: res.address || "San Francisco, CA",
      disability: res.disability || "",
      photoUrl:
        res.photoUrl || "https://freesvg.org/img/abstract-user-flat-4.png",
    };
  } catch (error) {
    handleAppwriteError(error, "Failed to fetch user profile");
    // The above function always throws, so this line is unreachable.
  }
  throw new Error("Failed to fetch user profile: Unknown error");
};

/**
 * Updates user profile information
 */
export const updateProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> => {
  try {
    await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userId,
      updates
    );
  } catch (error) {
    handleAppwriteError(error, "Failed to update profile");
  }
};

/**
 * Handles profile image upload and updates the profile
 */
export const uploadAndUpdateProfileImage = async (
  userId: string
): Promise<string> => {
  // Request permissions
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Camera roll permission is required to upload images");
  }

  // Launch image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.canceled && result.assets.length > 0) {
    try {
      // Upload the image
      const fileId = await uploadFile({
        uri: result.assets[0].uri,
        name: "profile.jpg",
        type: "image/jpeg",
        size: 0,
      });

      // Get the file view URL
      const imageUrl = storage.getFileView(STORAGE_ID, fileId).href;

      // Update profile with new image URL
      await updateProfile(userId, { photoUrl: imageUrl });

      return imageUrl;
    } catch (error) {
      throw new Error("Image upload and update failed");
    }
  }

  throw new Error("No image selected");
};
