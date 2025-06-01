import { useAuth } from "@/context/AuthContext";
import { updateFileUrl, uploadFile } from "@/lib/appwriteService";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Modal, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomText from "./CustomText";
import SubmitButton from "./SubmitButton";

interface PhotoModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ProfileImageModal({
  visible,
  onClose,
}: PhotoModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const { user } = useAuth();
  const [loading, setloading] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleProfileImageSubmit = async (file: any): Promise<void> => {
    setloading(true);
    const formattedFile = {
      uri: file.uri,
      name: file.name || "profile.jpg",
      type: file.type || "image/jpeg",
      size: file.size || 0,
    };
    const imageId = await uploadFile(
      formattedFile,
      (error: string) =>
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error,
        }),
      () =>
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile updated successfully!",
        })
    );
    if (imageId) {
      await updateFileUrl(user.$id, imageId, "photoUrl");
    }
    setloading(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/40 p-5">
        <View className="bg-white w-full p-6 rounded-xl shadow space-y-4 items-center">
          <CustomText className="text-lg font-semibold mb-4 text-center">
            Add Disability Card
          </CustomText>

          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
              className="mb-5"
            />
          )}

          <TouchableOpacity
            className="border-2 border-purple-600 py-2.5 px-7 rounded-full mb-1"
            onPress={pickImage}
          >
            <CustomText className="text-purple-600 font-sans">
              Pick Image
            </CustomText>
          </TouchableOpacity>

          <SubmitButton
            loading={false}
            handleClick={() => handleProfileImageSubmit}
            label="Submit"
          />

          <TouchableOpacity onPress={onClose}>
            <CustomText className="text-gray-600 mt-5">Skip</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
