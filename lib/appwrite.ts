import { Platform } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite";

const appwriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "682231310004b3e2de3a",
  package: {
    android: "com.bakop.disabilityaid",
    ios: "com.bakop.disabilityaid",
  },
};

const client = new Client()
  .setEndpoint(
    process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || appwriteConfig.endpoint
  )
  .setProject(
    process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || appwriteConfig.projectId
  );

switch (Platform.OS) {
  case "ios":
    client.setPlatform(
      process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID || appwriteConfig.package.ios
    );
    break;
  case "android":
    client.setPlatform(
      process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_ID ||
        appwriteConfig.package.android
    );
    break;
}

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { account, avatars, client, databases, storage };
