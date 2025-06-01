import { useAuth } from "@/context/AuthContext";
import { createUserProfile } from "@/lib/appwriteService";
import { appGuide, stopGuide } from "@/lib/speech";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-toast-message";
import AuthInput from "./AuthInput";
import CustomText from "./CustomText";
import SubmitButton from "./SubmitButton";

interface UserDetails {
  address: string;
  disability: string;
  phone: string;
}

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  callbackFunc: () => void;
}

const selectInputValues = [
  { label: "Blind", value: "blind" },
  { label: "Deaf", value: "deaf" },
  { label: "Lame", value: "lame" },
  { label: "Amputated", value: "amputated" },
  { label: "Other", value: "other" },
];

const selectInputStyle = {
  fontSize: 16,
  paddingVertical: 12,
  paddingHorizontal: 10,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 4,
  color: "#000",
  fontFamily: "Lexend",
};
export default function UserInfoModal({
  visible,
  onClose,
  callbackFunc,
}: InfoModalProps) {
  const [form, setForm] = useState<UserDetails>({
    phone: "",
    address: "",
    disability: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { user } = useAuth();

  // Announce when modal opens
  useEffect(() => {
    if (visible) {
      appGuide("Please complete your profile information");
    }
    return () => {
      stopGuide();
    };
  }, [visible]);

  const handleChange = (field: keyof UserDetails, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleFocus = (fieldName: string) => {
    appGuide(fieldName);
  };

  const handleSubmit = async () => {
    const { phone, address, disability } = form;

    if (!phone.trim() || !address.trim() || !disability.trim()) {
      appGuide("All fields are required");
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "All fields are required.",
      });
      return;
    }

    setSubmitting(true);

    try {
      await createUserProfile({
        userId: user?.$id!,
        email: user?.email!,
        name: user?.name!,
        phone,
        address,
        disability,
      });

      appGuide("Profile updated successfully");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated successfully!",
      });

      callbackFunc();
    } catch (error) {
      console.error("Error creating user profile:", error);
      appGuide("Failed to update profile");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create user profile.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/40 p-5">
        <View className="bg-white w-full p-8 rounded-xl shadow-lg space-y-4 border border-blue-100">
          <View className="items-center mb-4">
            <Ionicons name="person-circle-outline" size={32} color="#9333ea" />
            <CustomText className="text-xl font-semibold mt-2 text-purple-800">
              Complete Your Profile
            </CustomText>
          </View>

          <AuthInput
            icon="call-outline"
            placeholder="Phone Number"
            value={form.phone}
            onChangeText={(val) => handleChange("phone", val)}
            onFocus={() => handleFocus("Phone Number")}
            keyboardType="phone-pad"
          />
          <AuthInput
            icon="location-outline"
            placeholder="Address"
            value={form.address}
            onChangeText={(val) => handleChange("address", val)}
            onFocus={() => handleFocus("Address")}
          />
          <RNPickerSelect
            placeholder={{ label: "Select Disability Type", value: "" }}
            items={selectInputValues}
            onValueChange={(value) => handleChange("disability", value)}
            style={{
              inputIOS: selectInputStyle,
              inputAndroid: selectInputStyle,
            }}
          />

          <SubmitButton
            loading={submitting}
            handleClick={handleSubmit}
            label="Submit"
          />

          <TouchableOpacity
            className="mt-2"
            onPress={onClose}
            onFocus={() => appGuide("Close button")}
          >
            <CustomText className="text-purple-600 font-sans text-center">
              Close
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
