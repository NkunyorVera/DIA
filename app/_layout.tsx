import { GlobalProvider } from "@/context/GlobalProvider";
import { setAfricanVoice } from "@/lib/speech";
import { toastConfig } from "@/lib/toast";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import "./globals.css";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = useCallback(async () => {
    await Font.loadAsync({
      "Lexend-Regular": require("../assets/fonts/Lexend/Lexend-Regular.ttf"),
      "Lexend-Bold": require("../assets/fonts/Lexend/Lexend-Bold.ttf"),
      "Lexend-SemiBold": require("../assets/fonts/Lexend/Lexend-SemiBold.ttf"),
      Lexend: require("../assets/fonts/Lexend/Lexend-VariableFont_wght.ttf"),
    });
    setFontsLoaded(true);
  }, []);

  useEffect(() => {
    loadFonts();
    setAfricanVoice();
  }, []);

  if (!fontsLoaded) return null; // or <AppLoading />

  return (
    <GlobalProvider>
      <StatusBar style="light" />

      {/* Background view behind status bar */}
      <View
        style={{ height: 40, backgroundColor: "#9333ea" }}
        className="font-sans"
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <Toast config={toastConfig} />
    </GlobalProvider>
  );
}
