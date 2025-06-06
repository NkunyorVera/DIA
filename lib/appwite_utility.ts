import { ID, Query } from "react-native-appwrite";
import { account, databases, storage } from "./appwrite";
import { FileUpload, UserProfile } from "./types";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const STORAGE_ID = process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!;
const JOBS_ID = process.env.EXPO_PUBLIC_APPWRITE_JOBS_COLLECTION_ID!;
const HEALTH_ID = process.env.EXPO_PUBLIC_APPWRITE_HEALTH_COLLECTION_ID!;

type UploadParamsType = {
  file: FileUpload;
  userId: string;
  type: "avatar" | "disabilityCard";
  photoUrl?: string;
};

export const getCurrentUser =
  async (): Promise<Partial<UserProfile> | null> => {
    try {
      const currentAccount = await account.get();
      if (!currentAccount) throw Error;
      const response = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal("accountId", currentAccount.$id), Query.limit(1)]
      );

      return (response.documents[0] as Partial<UserProfile>) ?? null;
    } catch (error) {
      return null;
    }
  };

export const updateUser = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<UserProfile> => {
  try {
    const res = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userId,
      updates
    );
    return res as unknown as UserProfile;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export async function uploadUserPhoto({
  file,
  userId,
  type,
}: UploadParamsType) {
  try {
    const storageRes = await storage.createFile(STORAGE_ID, ID.unique(), file);
    const storageId = storageRes.$id;
    const url = storage.getFileView(STORAGE_ID, storageId).href;

    const res = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userId,
      {
        [type]: url,
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function updateUserPhoto({
  file,
  userId,
  type,
  photoUrl,
}: UploadParamsType) {
  try {
    const pathArray = photoUrl?.split("/") || [];
    const photoId =
      pathArray[pathArray.findIndex((value) => value === "files") + 1];

    console.log(photoId);

    const photo = await storage.getFile(STORAGE_ID, photoId || "");

    console.log(photo.$id);
    if (!photo) return;

    await storage.deleteFile(STORAGE_ID, photo.$id);

    const storageRes = await storage.createFile(STORAGE_ID, ID.unique(), file);
    const storageId = storageRes.$id;
    const url = storage.getFileView(STORAGE_ID, storageId).href;

    const res = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userId,
      {
        [type]: url,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export const getJobs = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, JOBS_ID);
    return result.documents;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getHealthBenefits = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, HEALTH_ID);
    return result.documents;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getSingleHealthBenefit = async (id: string) => {
  try {
    const result = await databases.getDocument(DATABASE_ID, HEALTH_ID, id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
export const getSingleJob = async (id: string) => {
  try {
    const result = await databases.getDocument(DATABASE_ID, JOBS_ID, id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
