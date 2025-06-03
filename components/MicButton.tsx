import { appGuide } from "@/lib/speech";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function MicButton({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <TouchableOpacity
      className={`bg-purple-100 p-2 rounded-full ${className}`}
      onPress={() => appGuide(message)}
    >
      <Ionicons name="mic-outline" size={24} color="#9333ea" />
    </TouchableOpacity>
  );
}
