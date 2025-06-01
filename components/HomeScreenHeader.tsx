import { appGuide } from "@/lib/speech";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";

const HomeScreenHeader = ({ userName }: { userName: string }) => {
  return (
    <View className="flex-row justify-between items-center mb-4 p-6">
      {/* Left Side: Logo + Text */}
      <View className="flex-row items-center gap-2.5 justify-center">
        <View className="bg-purple-100 p-0 rounded-full items-center justify-center">
          <Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            style={{ width: 48, height: 48 }}
          />
        </View>
        <CustomText className="text-xl font-bold text-white">
          DisabilityAID
        </CustomText>
      </View>

      {/* Right Side: Mic Button */}
      <TouchableOpacity
        className="bg-purple-100 rounded-full"
        onPress={() =>
          appGuide(
            `Welcome ${userName}. Your disability is your unique ability.`
          )
        }
      >
        <Ionicons name="mic-outline" size={24} color="#9333ea" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreenHeader;
