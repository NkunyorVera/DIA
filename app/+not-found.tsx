import CustomText from "@/components/CustomText";
import React from "react";
import { View } from "react-native";

export default function NotFound() {
  return (
    <View className="flex-1 items-center justify-center">
      <CustomText className="text-2xl font-bold">404</CustomText>
      <CustomText>NotFound</CustomText>
    </View>
  );
}
