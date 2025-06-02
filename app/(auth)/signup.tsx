// app/(auth)/signup.tsx
import AuthInput from "@/components/AuthInput";
import CustomText from "@/components/CustomText";
import GoBack from "@/components/GoBack";
import SubmitButton from "@/components/SubmitButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createUser } from "@/lib/appwrite-auth";
import { appGuide, stopGuide } from "@/lib/speech";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function SignUpScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  useEffect(() => {
    appGuide("Sign up screen. Please enter your details to create an account.");
    return () => {
      stopGuide();
    };
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFocus = (fieldName: string) => {
    appGuide(fieldName);
  };
  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields.",
      });
      return;
    }

    setLoading(true);

    try {
      const newUser = await createUser(form.email, form.password, form.name);
      if (newUser) {
        setUser(newUser);
        setIsLoggedIn(true);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Account created successfully!",
        });
        router.replace("/home");
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to create account.",
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message || "An unexpected error occurred.",
        });
    } finally {
      setLoading(false);
    }
  };
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
        value={form.name}
        onChangeText={(val: string) => handleChange("name", val)}
        onFocus={() => handleFocus("Full Name")}
      />
      <AuthInput
        icon="mail-outline"
        placeholder="Email Address"
        value={form.email}
        onChangeText={(val: string) => handleChange("email", val)}
        onFocus={() => handleFocus("Email")}
      />
      <AuthInput
        icon="lock-closed-outline"
        placeholder="Create Password"
        value={form.password}
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
