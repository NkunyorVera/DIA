import { useAuth } from "@/context/AuthContext"; // Adjust if the path differs
import { Ionicons } from "@expo/vector-icons"; // Only import Ionicons now
import { Redirect, Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FBBF24", // Tailwind purple-600
        tabBarInactiveTintColor: "#FFFFFF", // Tailwind gray-400
        tabBarStyle: {
          backgroundColor: "#9333EA",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB", // Tailwind gray-200
          height: 60,
          paddingBottom: 6,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabIcon icon="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabIcon icon="person-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabIcon icon="settings-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <TabIcon icon="notifications-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <TabIcon icon="chatbox-ellipses-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// ✅ Reusable tab icon component using only Ionicons now
function TabIcon({
  icon,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap; // Only Ionicons glyph map
  color: string;
}) {
  return <Ionicons name={icon} size={24} color={color} />;
}
