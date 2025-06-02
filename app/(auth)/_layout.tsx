import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <>
      {/* <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="signin"
          options={{
            headerLeft: () => goBack("/"),
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerLeft: () => goBack("/signin"),
          }}
        />
      </Stack> */}

      <SafeAreaView edges={[]} className="flex-1 bg-purple-50">
        <View className="flex-1 justify-center items-center p-6">
          <View className="w-full bg-white/90 items-center mb-4 p-8 rounded-lg shadow-lg relative">
            <Slot />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
