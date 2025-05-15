import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  const { session } = useAuth();
  if (session) {
    return <Redirect href={"/(tabs)"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
