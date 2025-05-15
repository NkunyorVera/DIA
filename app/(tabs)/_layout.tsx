import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  const { session } = useAuth();

  return !session ? (
    <Redirect href={"/signin"} />
  ) : (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2A62F3", // Vibrant primary blue
        tabBarInactiveTintColor: "#616161", // Soft secondary gray
        tabBarStyle: {
          backgroundColor: "#FFFFFF", // Clean white background
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0", // Light gray border
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
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "400",
          },
          tabBarIcon: ({ color }) => <TabIcon icon="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "400",
          },
          tabBarIcon: ({ color }) => <TabIcon icon="person" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "400",
          },
          tabBarIcon: ({ color }) => (
            <TabIcon icon="notifications" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "400",
          },
          tabBarIcon: ({ color }) => (
            <TabIcon icon="chatbox-ellipses" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "400",
          },
          tabBarIcon: ({ color }) => <TabIcon icon="settings" color={color} />,
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
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}) {
  return <Ionicons name={icon} size={24} color={color} />;
}
