import { useAuth } from "@/context/AuthContext";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign close icon from react-native-vector-icons
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import AuthInput from "./AuthInput";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function UserInfoModal({ visible, onClose, onSubmit }: Props) {
  const { user, handleChange } = useAuth();

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
      className=""
    >
      <View className="flex-1 justify-center items-center bg-black/40 absolute inset-0 bg-opacity-50 p-5">
        <View className="bg-white w-full p-8 rounded-xl shadow space-y-4">
          <View className="flex-row justify-end w-full mb-4">
            <TouchableOpacity onPress={onClose} className="p-2 w-max">
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text className="text-lg font-bold mb-4 text-center">
            Complete Your Profile
          </Text>

          <View className="gap-4 mb-5">
            <AuthInput
              icon="location-outline"
              placeholder="Enter Location"
              value={user.location}
              onChangeText={(val: string) => handleChange("location", val)}
            />
            <AuthInput
              icon="help-circle-outline"
              placeholder="Enter Disability"
              value={user.disability}
              onChangeText={(val: string) => handleChange("disability", val)}
            />
            <AuthInput
              icon="call-outline"
              placeholder="Enter phone number"
              value={user.phoneNumber}
              onChangeText={(val: string) => handleChange("phoneNumber", val)}
            />
          </View>

          <TouchableOpacity
            className="bg-secondary py-3 rounded-full"
            onPress={onSubmit}
          >
            <Text className="text-white uppercase text-center font-semibold">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
