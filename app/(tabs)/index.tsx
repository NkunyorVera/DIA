import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Adjust path as needed

export default function HomeScreen() {
  const { user } = useAuth();
  const userName = user?.name || "User";
  const disability = user?.disability || "Your unique ability";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 py-6 space-y-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-2">
          <Ionicons name="construct-outline" size={28} color="#9333EA" />
          <Ionicons name="notifications-outline" size={28} color="#9333EA" />
        </View>

        {/* Welcome Text */}
        <View className="mb-6">
          <Text className="text-3xl font-extrabold text-gray-900 leading-snug">
            Welcome,{"\n"}
            {userName}.
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Your disability here is {disability}.
          </Text>
        </View>

        {/* Cards */}
        <View className="gap-4">
          <Card title="Find Jobs" bg="bg-purple-600" icon="briefcase-outline" />
          <Card title="Health Benefits" bg="bg-rose-600" icon="heart-outline" />
          <Card title="Communities" bg="bg-emerald-600" icon="people-outline" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Card({
  title,
  bg,
  icon,
}: {
  title: string;
  bg: string;
  icon: "briefcase-outline" | "heart-outline" | "people-outline";
}) {
  return (
    <View
      className={`rounded-2xl px-5 py-4 ${bg} flex-row items-center justify-between shadow-md`}
    >
      <Image
        source={require("../../assets/images/icon.png")}
        className="w-14 h-14 rounded-full"
      />
      <View className="flex-1 px-4">
        <Text className="text-white text-lg font-semibold mb-1">{title}</Text>
        <Ionicons name={icon} size={20} color="#fff" />
      </View>
      <Ionicons name="mic-outline" size={24} color="#fff" />
    </View>
  );
}
