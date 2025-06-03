import CustomText from "@/components/CustomText";
import FeatureList from "@/components/FeatureList";
import FileUploadModal from "@/components/FileUploadModal";
import HomeScreenHeader from "@/components/HomeScreenHeader";
import UserInfoModal from "@/components/UserInfoModal";
import { useGlobalContext } from "@/context/GlobalProvider";
import React, { JSX, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(): JSX.Element {
  const { user } = useGlobalContext();
  const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);
  const [showFileUploadModal, setShowFileUploadModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (!user.disability) {
      setShowUserInfoModal(true);
    } else if (!user.disabilityCard) {
      setShowFileUploadModal(true);
    }
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
  }, [user]);

  const openNextModal = () => {
    setShowUserInfoModal(false);
    if (!user.disabilityCard) {
      setShowFileUploadModal(true);
    }
  };

  const userName: string = user?.username || "User";

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <UserInfoModal
        visible={showUserInfoModal}
        onClose={openNextModal}
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
