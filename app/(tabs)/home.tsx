import CustomText from "@/components/CustomText";
import FeatureList from "@/components/FeatureList";
import FileUploadModal from "@/components/FileUploadModal";
import HomeScreenHeader from "@/components/HomeScreenHeader";
import UserInfoModal from "@/components/UserInfoModal";
import { useAuth } from "@/context/AuthContext";
import { databases } from "@/lib/appwrite";
import React, { JSX, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(): JSX.Element {
  const { user } = useAuth();
  const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);
  const [showFileUploadModal, setShowFileUploadModal] =
    useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const checkUserProfile = async (): Promise<void> => {
    try {
      const res = await databases.listDocuments(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
        [Query.equal("userId", user?.$id)]
      );

      if (res.total === 0) {
        setShowUserInfoModal(true);
      }

      setCurrentUser(res.documents[0]);
    } catch (err) {
      console.error("Error checking user profile:", err);
    }
  };

  useEffect(() => {
    if (user?.$id) checkUserProfile();
    // Welcome message when screen loads
    // Speech.speak(
    //   `Welcome to your dashboard ${
    //     currentUser?.name || ""
    //   }. Explore available features.`,
    //   { rate: 0.9 }
    // );
    // return () => {
    //   Speech.stop();
    // };
  }, []);

  const openNextModal = () => {
    setShowUserInfoModal(false);
    setShowFileUploadModal(true);
  };

  const userName: string = currentUser?.name || "User";

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <UserInfoModal
        visible={showUserInfoModal}
        onClose={() => setShowUserInfoModal(false)}
        callbackFunc={openNextModal}
      />

      <FileUploadModal
        visible={showFileUploadModal}
        onClose={() => setShowFileUploadModal(false)}
      />

      {/* Header */}
      <HomeScreenHeader userName={userName} />
      <ScrollView
        className="px-6 space-y-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View className="mb-5">
          <CustomText className="text-2xl font-bold  leading-snug">
            Welcome back, {userName}
          </CustomText>
          <CustomText className="text-base text-gray-500 mt-2">
            Your disability is your unique ability:{" "}
          </CustomText>
        </View>

        <FeatureList />
      </ScrollView>
    </SafeAreaView>
  );
}
