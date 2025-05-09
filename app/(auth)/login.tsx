// screens/LoginScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import AuthInput from "@/components/AuthInput";
import { useAuth } from "@/context/AuthContext";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";

export default function LoginScreen() {
  const { user, handleChange, login } = useAuth();

  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="w-full bg-white items-center mb-4 p-10 rounded-lg shadow-lg">
        <View className="items-center mb-4">
          <Ionicons name="log-in-outline" size={28} color="#A855F7" />
          <Text className="text-2xl text-purple-600 font-semibold mt-2">
            LOGIN
          </Text>
        </View>

        <AuthInput
          icon="mail-outline"
          placeholder="Enter email"
          value={user.email}
          onChangeText={(val: string) => handleChange("email", val)}
        />
        <AuthInput
          icon="lock-closed-outline"
          placeholder="Enter password"
          value={user.password}
          onChangeText={(val: string) => handleChange("password", val)}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-purple-600 py-3 rounded-full items-center mb-4 w-full"
          onPress={() => {
            login();
            navigate("/(tabs)");
          }}
        >
          <Text className="text-white font-semibold">Login</Text>
        </TouchableOpacity>

        <Text className="text-center text-sm">
          Don't have an account?{" "}
          <Link className="text-purple-600 underline" href="/register">
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}
