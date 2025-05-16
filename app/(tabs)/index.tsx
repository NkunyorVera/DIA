import FeatureCard from "@/components/FeatureCard";
import ProfileImageModal from "@/components/ProfileImageModal";
import UserInfoModal from "@/components/UserInfoModal";
import { useAuth } from "@/context/AuthContext";
import { databases } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";
import React, { JSX, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(): JSX.Element {
  const { user } = useAuth();
  const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);
  const [showProfileImageModal, setShowProfileImageModal] =
    useState<boolean>(false);

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
    } catch (err) {
      console.error("Error checking user profile:", err);
    }
  };

  useEffect(() => {
    if (user?.$id) checkUserProfile();
  }, [user]);

  const openNextModal = () => {
    setShowUserInfoModal(false);
    setShowProfileImageModal(true);
  };

  const userName: string = user?.name || "User";
  const disability: string = user?.disability || "Your unique ability";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <UserInfoModal
        visible={showUserInfoModal}
        onClose={() => setShowUserInfoModal(false)}
        callbackFunc={openNextModal}
      />

      <ProfileImageModal
        visible={showProfileImageModal}
        onClose={() => setShowProfileImageModal(false)}
      />

      <ScrollView className="px-4 py-6 space-y-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-2">
          <Ionicons name="construct-outline" size={28} color="#9333EA" />
          <Ionicons name="notifications-outline" size={28} color="#9333EA" />
        </View>

        {/* Welcome Text */}
        <View className="mb-6">
          <Text className="text-3xl font-extrabold text-gray-900 leading-snug">
            Welcome,{"\n"}
            {userName}.
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Your disability here is {disability}.
          </Text>
        </View>

        {/* Cards */}
        <View className="gap-2.5 mb-10">
          <FeatureCard
            title="Find Jobs"
            bgColor="#E3ECFE"
            iconColor="#2A62F3"
            mainIcon="briefcase-search"
            subIcon="briefcase"
          />
          <FeatureCard
            title="Health Benefits"
            bgColor="#FFE9D9"
            iconColor="#FF8C42"
            mainIcon="hospital-box"
            subIcon="heartbeat"
          />
          <FeatureCard
            title="Join Communities"
            bgColor="#D3F2D8"
            iconColor="#2E7D32"
            mainIcon="account-group"
            subIcon="users"
          />
          <FeatureCard
            title="Seek Assistance"
            bgColor="#FFF2C3"
            iconColor="#FFC107"
            mainIcon="hand-heart"
            subIcon="question-circle"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
