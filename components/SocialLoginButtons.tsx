import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";

export default function SocialLoginButtons({
  onGoogle,
  onFacebook,
}: {
  onGoogle: () => void;
  onFacebook: () => void;
}) {
  return (
    <View className="gap-3 w-full">
      <TouchableOpacity
        className="bg-white border border-gray-300 py-3 rounded-full flex-row items-center justify-center"
        onPress={onGoogle}
      >
        <Ionicons
          name="logo-google"
          size={20}
          color="#EA4335"
          className="mr-2"
        />
        <CustomText className="text-base font-medium">
          Sign in with Google
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-primary py-3 rounded-full flex-row items-center justify-center"
        onPress={onFacebook}
      >
        <Ionicons
          name="logo-facebook"
          size={20}
          color="#fff"
          className="mr-2"
        />
        <CustomText className="text-white text-base font-medium">
          Sign in with Facebook
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}
