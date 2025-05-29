import { Stack } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigate("/")}
              accessibilityLabel="Back to Sign In"
              style={{ padding: 10 }}
            >
              <Text className="">Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigate("/signin")}
              accessibilityLabel="Back to Sign In"
              style={{ padding: 10 }}
            >
              <Text className="">Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
