import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import "./globals.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />

      {/* Background view behind status bar */}
      <View style={{ height: 40, backgroundColor: "#2563EB" }} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </AuthProvider>
  );
}
