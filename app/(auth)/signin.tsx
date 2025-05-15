// }

import AuthInput from "@/components/AuthInput";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const [user, setUser] = useState({ email: "", password: "" });
  const { signin } = useAuth();
  const handleInputChange = (name: string, value: string) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="w-full bg-white items-center mb-4 p-8 rounded-lg shadow-lg">
        <Ionicons name="log-in-outline" size={28} color="#FF8C42" />
        <Text className="text-2xl text-secondary font-semibold mt-2 mb-4">
          LOGIN
        </Text>

        <AuthInput
          icon="mail-outline"
          placeholder="Email"
          value={user.email}
          onChangeText={handleInputChange.bind(null, "email")}
        />
        <AuthInput
          icon="lock-closed-outline"
          placeholder="Password"
          secureTextEntry
          value={user.password}
          onChangeText={handleInputChange.bind(null, "password")}
        />

        <TouchableOpacity
          className="bg-secondary py-3 w-full mt-4 rounded-full"
          onPress={() => signin(user)}
        >
          <Text className="text-white font-bold text-center">Login</Text>
        </TouchableOpacity>

        <Text className="mt-3">
          Don't have an account?
          <Link className="text-secondary underline" href="/signup">
            {" "}
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}
