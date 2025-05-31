import { useAuth } from "@/context/AuthContext";
import { databases } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
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

  // Announce when modal opens
  useEffect(() => {
    if (visible) {
      Speech.speak("Please complete your profile information", { rate: 0.9 });
    }
    return () => {
      Speech.stop();
    };
  }, [visible]);

  const handleChange = (field: keyof UserDetails, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleFocus = (fieldName: string) => {
    Speech.speak(fieldName, { rate: 0.9 });
  };

  const handleSubmit = async () => {
    const { phone, address, disability } = form;

    if (!phone.trim() || !address.trim() || !disability.trim()) {
      Alert.alert("Validation Error", "All fields are required.");
      Speech.speak("All fields are required", { rate: 0.9 });
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
      Speech.speak("Profile updated successfully", { rate: 0.9 });
      callbackFunc();
    } catch (error) {
      console.error("Error creating user profile:", error);
      Speech.speak("Failed to update profile", { rate: 0.9 });
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
        <View className="bg-white w-full p-8 rounded-xl shadow-lg space-y-4 border border-blue-100">
          <View className="items-center mb-4">
            <Ionicons name="person-circle-outline" size={32} color="#9333ea" />
            <Text className="text-xl font-bold mt-2 text-purple-800">
              Complete Your Profile
            </Text>
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
            placeholder={{
              label: "Select Disability Type",
              value: "",
            }}
            items={[
              { label: "Visual Impairment", value: "visual" },
              { label: "Hearing Impairment", value: "hearing" },
              { label: "Mobility Impairment", value: "mobility" },
              { label: "Cognitive Impairment", value: "cognitive" },
              { label: "Other", value: "other" },
            ]}
            onValueChange={(value) => handleChange("disability", value)}
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                color: "#000",
              },
              inputAndroid: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                color: "#000",
              },
            }}
          />

          <TouchableOpacity
            className="bg-purple-600 py-3 rounded-full mt-4 shadow-md"
            onPress={handleSubmit}
            disabled={submitting}
            onFocus={() => Speech.speak("Submit button", { rate: 0.9 })}
          >
            <Text className="text-white text-center font-semibold">
              {submitting ? (
                <Text className="flex-row items-center justify-center">
                  <Ionicons
                    name="refresh"
                    size={16}
                    color="white"
                    className="mr-2"
                  />
                  Submitting...
                </Text>
              ) : (
                "Submit"
              )}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-2"
            onPress={onClose}
            onFocus={() => Speech.speak("Close button", { rate: 0.9 })}
          >
            <Text className="text-purple-600 text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
