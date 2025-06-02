import CustomText from "@/components/CustomText";
import { signOut } from "@/lib/appwrite-auth";
import React from "react";
import { Button, View } from "react-native";

export default function SettingScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <CustomText className="text-2xl font-bold">Setting</CustomText>
      <CustomText className="text-lg mt-2">
        This is the setting screen.
      </CustomText>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
}
