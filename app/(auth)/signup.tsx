// screens/SignUpScreen.tsx
import AuthInput from "@/components/AuthInput";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { signup } = useAuth();

  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="w-full bg-white items-center mb-4 p-10 rounded-lg shadow-lg">
        <View className="items-center mb-4">
          <Ionicons name="mic-outline" size={28} color="#FF8C42" />
          <Text className="text-2xl text-secondary font-semibold mt-2">
            SIGN UP
          </Text>
        </View>

        <AuthInput
          icon="person-outline"
          placeholder="Enter name"
          value={user.name}
          onChangeText={(val: string) => handleChange("name", val)}
        />
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
          className="bg-secondary py-3 rounded-full items-center mb-4 w-full"
          onPress={async () => {
            await signup(user);
            navigate("/(tabs)");
          }}
        >
          <Text className="text-white font-semibold">Submit</Text>
        </TouchableOpacity>

        <Text className="text-center">
          Already have an account?{" "}
          <Link className="text-secondary underline" href="/signin">
            Login
          </Link>
        </Text>
      </View>
    </View>
  );
}
