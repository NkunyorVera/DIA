import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  onFocus?: () => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
};

export default function AuthInput({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  onFocus,
  keyboardType = "default",
}: Props) {
  const isPasswordField = placeholder.toLowerCase().includes("password");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="flex-row items-center border-b border-gray-400 mb-4 px-2">
      <Ionicons name={icon} size={18} color="#6B7280" className="mr-2" />
      <TextInput
        placeholder={placeholder}
        className="flex-1 py-2 text-base text-gray-800"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPasswordField && !isPasswordVisible}
        onFocus={onFocus}
        keyboardType={keyboardType}
      />
      {isPasswordField && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={18}
            color="#6B7280"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
