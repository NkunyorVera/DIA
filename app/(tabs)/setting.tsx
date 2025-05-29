import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Button, Text, View } from "react-native";

export default function SettingScreen() {
  const { signout } = useAuth();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Setting</Text>
      <Text className="text-lg mt-2">This is the setting screen.</Text>
      <Button title="Logout" onPress={signout} />
    </View>
  );
}
