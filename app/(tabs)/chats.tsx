import CustomText from "@/components/CustomText";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <CustomText className="text-2xl font-bold">Chats</CustomText>
      </View>
    </SafeAreaView>
  );
}
