import AuthInput from "@/components/AuthInput";
import { useAuth, UserType } from "@/context/AuthContext";
import { account } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { AppwriteException } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { updateUserAndSession } = useAuth();
  const signin = async ({ email, password }: UserType) => {
    try {
      setLoading(true);
      await account.createEmailPasswordSession(email, password);

      await account.get();
      updateUserAndSession();
      Alert.alert("Success", "Signin successfull");
    } catch (error) {
      if (error instanceof AppwriteException) {
        Alert.alert("Error", ` ${error.cause || error.message}`);
      }
      Alert.alert("Error", "Error signing in");
    } finally {
      setLoading(false);
    }
  };

  const sayGuide = () => {
    const welcomeMessage =
      "Welcome to the login screen. Please enter your email and password to continue.";
    Speech.speak(welcomeMessage, { rate: 0.9 });
  };
  // Announce screen on load
  useEffect(() => {
    const welcomeMessage =
      "Welcome to the login screen. Please enter your email and password to continue.";
    Speech.speak(welcomeMessage, { rate: 0.9 });
    return () => {
      Speech.stop();
    };
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    Speech.speak(fieldName, { rate: 0.9 });
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-purple-50">
      <View className="flex-1 justify-center">
        <View className="flex-1 justify-center items-center p-6">
          <View className="w-full bg-white/90 items-center mb-4 p-8 rounded-lg shadow-lg">
            <View className="flex items-center">
              <TouchableOpacity
                className="bg-purple-100 p-2 rounded-full"
                onPress={sayGuide}
              >
                <Ionicons name="mic-outline" size={24} color="#9333ea" />
              </TouchableOpacity>
              <Text className="text-2xl text-purple-600 font-semibold mt-2 mb-4">
                Login
              </Text>
            </View>

            <AuthInput
              icon="mail-outline"
              placeholder="Email"
              value={user.email}
              onChangeText={handleInputChange.bind(null, "email")}
              onFocus={() => handleFocus("Email")}
            />
            <AuthInput
              icon="lock-closed-outline"
              placeholder="Password"
              secureTextEntry
              value={user.password}
              onChangeText={handleInputChange.bind(null, "password")}
              onFocus={() => handleFocus("Password")}
            />

            <TouchableOpacity
              className="bg-purple-600 flex items-center justify-center py-3 w-full mt-4 rounded-full shadow-md"
              onPress={() => signin(user)}
              onFocus={() => Speech.speak("Login button", { rate: 0.9 })}
              disabled={loading}
              accessibilityRole="button"
            >
              {loading ? (
                <View className="w-8 h-8 border-4 border-white/50 border-t-white rounded-full animate-spin" />
              ) : (
                <Text className="text-white font-bold text-center">Login</Text>
              )}
            </TouchableOpacity>

            <Text className="mt-3 text-gray-600">
              Don't have an account?
              <Link
                className="text-purple-600 underline"
                href="/signup"
                onAccessibilityTap={() =>
                  Speech.speak("Sign up link", { rate: 0.9 })
                }
              >
                {" "}
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
