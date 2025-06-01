import { appGuide } from "@/lib/speech";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";

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
  const [ellipseIndex, setEllipseIndex] = React.useState(0);
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setEllipseIndex((prev) => (prev + 1) % 3);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);
  return (
    <TouchableOpacity
      className={`bg-purple-600 flex items-center justify-center py-3 w-full mt-4 rounded-full shadow-md ${className}`}
      onPress={handleClick}
      onFocus={() => appGuide(label)}
      disabled={loading}
      accessibilityRole="button"
    >
      {loading ? (
        <View className="flex-row items-center justify-center w-full gap-1.5">
          {[0, 1, 2].map((index) => (
            <CustomText
              key={index}
              className={`text-white text-xl font-bold text-center ${
                index === ellipseIndex ? "opacity-100" : "opacity-50"
              }`}
            >
              •
            </CustomText>
          ))}
        </View>
      ) : (
        <CustomText className="text-white font-semibold text-center">
          {label}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;
