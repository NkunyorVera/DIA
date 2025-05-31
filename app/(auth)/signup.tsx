import AuthInput from "@/components/AuthInput";
import { useAuth, UserType } from "@/context/AuthContext";
import { account } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import * as Speech from "expo-speech";
import React, { useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { AppwriteException } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const { updateUserAndSession } = useAuth();

  const sayGuide = () => {
    const welcomeMessage =
      "Sign up screen. Please enter your details to create an account.";
    Speech.speak(welcomeMessage, { rate: 0.9 });
  };

  // Announce screen on load
  useEffect(() => {
    const welcomeMessage =
      "Sign up screen. Please enter your details to create an account.";
    Speech.speak(welcomeMessage, { rate: 0.9 });
    return () => {
      Speech.stop();
    };
  }, []);

  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFocus = (fieldName: string) => {
    Speech.speak(fieldName, { rate: 0.9 });
  };

  const signup = async ({ email, password, name }: UserType) => {
    try {
      setLoading(true);
      // Step 1: Create user account
      await account.create("unique()", email, password, name);
      // Step 2: Create email-password session
      await account.createEmailPasswordSession(email, password);

      await account.get();
      updateUserAndSession();
      Alert.alert("Success", "Signup successful");
    } catch (error) {
      if (error instanceof AppwriteException) {
        Alert.alert("Error", ` ${error.cause || error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-purple-50">
      <View className="flex-1 justify-center">
        <View className="flex-1 justify-center items-center p-6">
          <View className="w-full bg-white/90 items-center mb-4 p-8 rounded-lg shadow-lg">
            <View className="items-center mb-4">
              <TouchableOpacity
                className="bg-purple-100 p-2 rounded-full"
                onPress={sayGuide}
              >
                <Ionicons name="mic-outline" size={24} color="#9333ea" />
              </TouchableOpacity>
              <Text className="text-2xl text-purple-600 font-semibold mt-2">
                Create Account
              </Text>
            </View>

            <AuthInput
              icon="person-outline"
              placeholder="Full Name"
              value={user.name}
              onChangeText={(val: string) => handleChange("name", val)}
              onFocus={() => handleFocus("Full Name")}
            />
            <AuthInput
              icon="mail-outline"
              placeholder="Email Address"
              value={user.email}
              onChangeText={(val: string) => handleChange("email", val)}
              onFocus={() => handleFocus("Email")}
            />
            <AuthInput
              icon="lock-closed-outline"
              placeholder="Create Password"
              value={user.password}
              onChangeText={(val: string) => handleChange("password", val)}
              secureTextEntry
              onFocus={() => handleFocus("Password")}
            />

            <TouchableOpacity
              className="bg-purple-600 flex items-center justify-center py-3 rounded-full mb-4 w-full shadow-md"
              onPress={async () => {
                await signup(user);
                navigate("/(tabs)");
              }}
              onFocus={() => Speech.speak("Submit button", { rate: 0.9 })}
              disabled={loading}
            >
              {loading ? (
                <View className="w-8 h-8 border-4 border-white/50 border-t-white rounded-full animate-spin" />
              ) : (
                <Text className="text-white font-bold text-center">
                  Create Account
                </Text>
              )}
            </TouchableOpacity>

            <Text className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                className="text-purple-600 underline"
                href="/signin"
                onPress={() => Speech.speak("Login link", { rate: 0.9 })}
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
