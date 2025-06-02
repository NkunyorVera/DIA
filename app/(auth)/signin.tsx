// app/(auth)/signin.tsx
import AuthInput from "@/components/AuthInput";
import CustomText from "@/components/CustomText";
import GoBack from "@/components/GoBack";
import MicButton from "@/components/MicButton";
import SubmitButton from "@/components/SubmitButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getCurrentUser } from "@/lib/appwite_utility";
import { signIn } from "@/lib/appwrite-auth";
import { appGuide, stopGuide } from "@/lib/speech";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function SignInScreen() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const handleSignin = async () => {
    if (!form.email || !form.password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields.",
      });
      return;
    }
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    appGuide(
      "Welcome to the login screen. Please enter your email and password to continue."
    );
    return () => {
      stopGuide();
    };
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
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
        value={form.email}
        onChangeText={handleInputChange.bind(null, "email")}
        onFocus={() => handleFocus("Email")}
      />
      <AuthInput
        icon="lock-closed-outline"
        placeholder="Password"
        secureTextEntry
        value={form.password}
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
