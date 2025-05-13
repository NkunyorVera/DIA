import FeatureCard from "@/components/FeatureCard";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
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
        <View className="gap-2.5 mb-10">
          <FeatureCard
            title="Find Jobs"
            bgColor="#E3ECFE"
            iconColor="#2A62F3"
            mainIcon="briefcase-search"
            subIcon="briefcase"
          />
          <FeatureCard
            title="Health Benefits"
            bgColor="#FFE9D9"
            iconColor="#FF8C42"
            mainIcon="hospital-box"
            subIcon="heartbeat"
          />
          <FeatureCard
            title="Join Communities"
            bgColor="#D3F2D8"
            iconColor="#2E7D32"
            mainIcon="account-group"
            subIcon="users"
          />
          <FeatureCard
            title="Seek Assistance"
            bgColor="#FFF2C3"
            iconColor="#FFC107"
            mainIcon="hand-heart"
            subIcon="question-circle"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
