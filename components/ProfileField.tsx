import React from "react";
import { TextInput, View } from "react-native";
import CustomText from "./CustomText";

type ProfileFieldProps = {
  label: string;
  value: string;
  isEditing: boolean;
  onChangeText?: (text: string) => void;
  editable?: boolean;
};

function ProfileField({
  label,
  value,
  isEditing,
  onChangeText,
  editable = true,
}: ProfileFieldProps) {
  return (
    <View className="py-3 border-b border-gray-100">
      <CustomText className="text-purple-500 text-sm mb-1">{label}</CustomText>
      {isEditing && editable ? (
        <TextInput
          className="text-gray-800 text-base py-1"
          value={value}
          onChangeText={onChangeText}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor="#9CA3AF"
        />
      ) : (
        <CustomText className="text-gray-600">{value}</CustomText>
      )}
    </View>
  );
}
export default ProfileField;
