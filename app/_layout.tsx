import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import "./globals.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />

      {/* Background view behind status bar */}
      <View style={{ height: 40, backgroundColor: "#9333ea" }} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <Toast />
    </AuthProvider>
  );
}
