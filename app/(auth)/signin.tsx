// app/(auth)/signin.tsx
import AuthInput from "@/components/AuthInput";
import CustomText from "@/components/CustomText";
import GoBack from "@/components/GoBack";
import MicButton from "@/components/MicButton";
import SubmitButton from "@/components/SubmitButton";
import { useAuth } from "@/context/AuthContext";
import { signin } from "@/lib/authService";
import { appGuide, stopGuide } from "@/lib/speech";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function SignInScreen() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { updateUserAndSession } = useAuth();
  const handleSignin = () =>
    signin(
      user,
      () => {
        updateUserAndSession();
        Toast.show({ type: "success", text1: "Signed in successfully" });
      },
      (message) => {
        Toast.show({ type: "error", text1: "Login Failed", text2: message });
      },
      setLoading
    );

  useEffect(() => {
    appGuide(
      "Welcome to the login screen. Please enter your email and password to continue."
    );
    return () => {
      stopGuide();
    };
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    appGuide(fieldName);
  };

  return (
    <>
      <GoBack to="/" />
      <View className="flex items-center">
        <MicButton message="Welcome to the login screen. Please enter your email and password to continue." />
        <CustomText className="text-2xl text-purple-600 font-semibold mt-2 mb-4">
          Login
        </CustomText>
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

      <SubmitButton
        label="Login"
        loading={loading}
        handleClick={handleSignin}
      />

      <CustomText className="mt-3 font-sans text-gray-600">
        Don't have an account?
        <Link
          className="text-purple-600 underline"
          href="/signup"
          onAccessibilityTap={() => appGuide("Sign up link")}
        >
          {" "}
          Sign Up
        </Link>
      </CustomText>
    </>
  );
}
