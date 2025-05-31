import { appGuide } from "@/lib/speech";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  loading: boolean;
  label: string;
  className?: string;
  handleClick?: () => void;
}

const SubmitButton: React.FC<Props> = ({
  handleClick,
  className,
  label,
  loading,
}) => {
  return (
    <TouchableOpacity
      className={`bg-purple-600 flex items-center justify-center py-3 w-full mt-4 rounded-full shadow-md ${className}`}
      onPress={handleClick}
      onFocus={() => appGuide(label)}
      disabled={loading}
      accessibilityRole="button"
    >
      {loading ? (
        <View className="w-8 h-8 border-4 border-white/50 border-t-white rounded-full animate-spin" />
      ) : (
        <Text className="text-white font-bold text-center">{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;
