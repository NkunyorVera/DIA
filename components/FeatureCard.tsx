// components/FeatureCard.tsx
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";

interface FeatureCardProps {
  title: string;
  bgColor: string;
  iconColor: string;
  mainIcon: keyof typeof MaterialCommunityIcons.glyphMap;
  subIcon: keyof typeof FontAwesome.glyphMap;
  onNavigate?: () => void;
  onSpeak?: () => void; // Function to handle speech, default no-op
}

export default function FeatureCard({
  title,
  bgColor,
  iconColor,
  mainIcon,
  subIcon,
  onNavigate,
  onSpeak, // Default no-op function
}: FeatureCardProps) {
  // Use the ref prop if needed for navigation or other purposes

  return (
    <TouchableOpacity
      className="rounded-2xl p-4 flex-row justify-between items-center mb-4"
      style={{ backgroundColor: bgColor }}
      onPress={onNavigate}
    >
      <View className="flex-1 items-center">
        <View className="w-16 h-16 rounded-full bg-white mb-2 justify-center items-center">
          <MaterialCommunityIcons name={mainIcon} size={32} color={bgColor} />
        </View>
        <CustomText className="text-white font-bold text-lg">
          {title}
        </CustomText>
        <FontAwesome
          name={subIcon}
          size={20}
          color={iconColor}
          className="mt-2"
        />
      </View>
      <Ionicons
        name="mic"
        size={24}
        color={iconColor}
        className="absolute top-4 right-4"
        onPress={onSpeak || (() => {})} // Call the speak function if provided, else do nothing
      />
    </TouchableOpacity>
  );
}
