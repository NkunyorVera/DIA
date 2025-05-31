import { AuthRoutes } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function GoBack({
  to,
  className,
}: {
  to: AuthRoutes;
  className?: string;
}) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.replace(to)}
      accessibilityLabel="Back"
      style={{ padding: 10 }}
      className={`flex-row absolute left-0 items-start w-full ${className}`}
    >
      <Ionicons name="arrow-back" size={24} color="#9333ea" />
    </TouchableOpacity>
  );
}
