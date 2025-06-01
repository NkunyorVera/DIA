import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#4BB543" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 13,
        color: "gray",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#FF3B30" }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 13,
        color: "gray",
      }}
    />
  ),
};
