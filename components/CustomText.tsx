import React from "react";
import { Text, TextProps } from "react-native";

// Define your custom props by extending TextProps
interface CustomTextProps extends TextProps {}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  ...props // This will capture all other Text props
}) => {
  return (
    <Text {...props} className={`font-sans ${props.className}`}>
      {children}
    </Text>
  );
};

export default CustomText;
