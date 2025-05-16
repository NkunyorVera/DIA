// components/UserInfoModal.tsx
import { useAuth } from "@/context/AuthContext";
import { databases } from "@/lib/appwrite";
import React, { useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import AuthInput from "./AuthInput";

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

  const handleChange = (field: keyof UserDetails, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const { phone, address, disability } = form;

    if (!phone.trim() || !address.trim() || !disability.trim()) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    setSubmitting(true);
    try {
      await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
        user?.$id,
        {
          userId: user?.$id,
          email: user?.email,
          name: user?.name,
          address,
          disability,
          phone,
        }
      );
      callbackFunc();
    } catch (error) {
      console.error("Error creating user profile:", error);
      Alert.alert("Error", "Failed to create user profile.");
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
        <View className="bg-white w-full p-8 rounded-xl shadow space-y-4">
          <Text className="text-lg font-bold mb-4 text-center">
            Complete Your Profile
          </Text>

          <AuthInput
            icon="call-outline"
            placeholder="Enter phone number"
            value={form.phone}
            onChangeText={(val) => handleChange("phone", val)}
          />
          <AuthInput
            icon="location-outline"
            placeholder="Enter address"
            value={form.address}
            onChangeText={(val) => handleChange("address", val)}
          />
          <AuthInput
            icon="help-circle-outline"
            placeholder="Enter disability"
            value={form.disability}
            onChangeText={(val) => handleChange("disability", val)}
          />

          <TouchableOpacity
            className="bg-secondary py-3 rounded-full mt-4"
            onPress={handleSubmit}
            disabled={submitting}
          >
            <Text className="text-white text-center font-semibold uppercase">
              {submitting ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
