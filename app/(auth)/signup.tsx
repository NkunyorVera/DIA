// app/(auth)/signup.tsx
import AuthInput from "@/components/AuthInput";
import CustomText from "@/components/CustomText";
import GoBack from "@/components/GoBack";
import SubmitButton from "@/components/SubmitButton";
import { useAuth } from "@/context/AuthContext";
import { signup } from "@/lib/authService";
import { appGuide, stopGuide } from "@/lib/speech";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function SignUpScreen() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { updateUserAndSession } = useAuth();

  useEffect(() => {
    appGuide("Sign up screen. Please enter your details to create an account.");
    return () => {
      stopGuide();
    };
  }, []);

  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleFocus = (fieldName: string) => {
    appGuide(fieldName);
  };
  const handleSignup = () =>
    signup(
      user,
      () => {
        updateUserAndSession();
        Toast.show({ type: "success", text1: "Account created successfully" });
        navigate("/(tabs)/home");
      },
      (message) => {
        Toast.show({ type: "error", text1: "Signup Failed", text2: message });
      },
      setLoading
    );

  return (
    <>
      <GoBack to="/signin" />
      <View className="items-center mb-4">
        <TouchableOpacity
          className="bg-purple-100 p-2 rounded-full"
          onPress={() =>
            appGuide(
              "Sign up screen. Please enter your details to create an account."
            )
          }
        >
          <Ionicons name="mic-outline" size={24} color="#9333ea" />
        </TouchableOpacity>
        <CustomText className="text-2xl text-purple-600 font-semibold mt-2">
          Create Account
        </CustomText>
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

      <SubmitButton
        handleClick={handleSignup}
        label="Create Account"
        loading={loading}
      />
      <CustomText className="text-center text-gray-600 mt-3">
        Already have an account?{" "}
        <Link
          className="text-purple-600 underline"
          href="/signin"
          onAccessibilityTap={() => appGuide("Login link")}
        >
          Login
        </Link>
      </CustomText>
    </>
  );
}
