// components/FeatureCard.tsx
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FeatureCardProps {
  title: string;
  bgColor: string;
  iconColor: string;
  mainIcon: keyof typeof MaterialCommunityIcons.glyphMap;
  subIcon: keyof typeof FontAwesome.glyphMap;
}

export default function FeatureCard({
  title,
  bgColor,
  iconColor,
  mainIcon,
  subIcon,
}: FeatureCardProps) {
  return (
    <TouchableOpacity
      className="rounded-2xl p-4 flex-row justify-between items-center mb-4"
      style={{ backgroundColor: bgColor }}
    >
      <View className="flex-1 items-center">
        <View className="w-16 h-16 rounded-full bg-white mb-2 justify-center items-center">
          <MaterialCommunityIcons name={mainIcon} size={32} color={iconColor} />
        </View>
        <Text className="text-text-primary font-bold text-lg">{title}</Text>
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
      />
    </TouchableOpacity>
  );
}
