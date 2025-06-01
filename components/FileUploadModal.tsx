import { useAuth } from "@/context/AuthContext";
import { uploadAndUpdateProfileImage } from "@/lib/appwriteService";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Modal, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomText from "./CustomText";
import SubmitButton from "./SubmitButton";

interface PhotoModalProps {
  visible: boolean;
  onClose: () => void;
  onImageUpdate?: (imageUrl: string) => void;
}

export default function FileUploadModal({
  visible,
  onClose,
  onImageUpdate,
}: PhotoModalProps) {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission required",
          text2: "Please enable photo library access in settings",
          position: "bottom",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8, // Slightly reduced quality for better performance
      });

      if (!result.canceled && result.assets[0]?.uri) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to select image",
        position: "bottom",
      });
    }
  };

  const handleImageSubmit = async () => {
    if (!selectedImage) {
      Toast.show({
        type: "error",
        text1: "No image selected",
        text2: "Please select an image first",
        position: "bottom",
      });
      return;
    }

    try {
      setIsLoading(true);
      const imageUrl = await uploadAndUpdateProfileImage(user.$id);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile image updated!",
        position: "bottom",
      });

      onImageUpdate?.(imageUrl);
      onClose();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Upload failed",
        text2: "Could not update profile image",
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/70 p-5">
        <View className="bg-white w-full max-w-md p-6 rounded-xl space-y-4">
          <CustomText className="text-xl font-bold text-center mb-4">
            Update Profile Photo
          </CustomText>

          {selectedImage && (
            <View className="items-center mb-4">
              <Image
                source={{ uri: selectedImage }}
                className="w-32 h-32 rounded-full border-2 border-purple-200"
                resizeMode="cover"
              />
            </View>
          )}

          <TouchableOpacity
            className="border-2 border-purple-600 py-3 px-6 rounded-full items-center mb-4"
            onPress={pickImage}
            disabled={isLoading}
          >
            <CustomText className="text-purple-600 font-medium">
              {selectedImage ? "Change Image" : "Select Image"}
            </CustomText>
          </TouchableOpacity>

          <SubmitButton
            loading={isLoading}
            handleClick={handleImageSubmit}
            label="Update Profile"
          />

          <TouchableOpacity
            onPress={onClose}
            className="items-center mt-2"
            disabled={isLoading}
          >
            <CustomText className="text-gray-500">Cancel</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
