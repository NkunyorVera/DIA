import { Platform } from "react-native";
import { Account, Client, Databases } from "react-native-appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("682231310004b3e2de3a")
  .setPlatform("com.bakop.disabilityaid");

switch (Platform.OS) {
  case "android":
    client.setPlatform("disabilityaid");
    break;
}

const account = new Account(client);
const databases = new Databases(client);

export { account, client, databases };
