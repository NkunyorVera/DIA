import React from "react";
import { Text, TextProps } from "react-native";

// Define your custom props by extending TextProps
interface CustomTextProps extends TextProps {
  // Add any additional custom props you want here
  className?: string; // Example custom prop
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  ...props // This will capture all other Text props
}) => {
  return (
    <Text {...props} className="font-sans">
      {children}
    </Text>
  );
};

export default CustomText;
