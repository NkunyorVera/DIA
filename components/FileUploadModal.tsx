import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Modal, TouchableOpacity, View } from "react-native";

import { useGlobalContext } from "@/context/GlobalProvider";
import { updateUserPhoto, uploadUserPhoto } from "@/lib/appwite_utility";

import {
  pickImageFromGallery,
  prepareFileBlob,
  showToast,
} from "@/utils/imageHelpers";
import CustomText from "./CustomText";
import SubmitButton from "./SubmitButton";

interface PhotoModalProps {
  visible: boolean;
  onClose: () => void;
}

const IMAGE_OPTIONS = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1] as [number, number],
  quality: 0.8,
};

const PERMISSION_ERROR = {
  type: "error",
  text1: "Permission required",
  text2: "Please enable photo library access in settings",
  position: "top",
};

export default function FileUploadModal({ visible, onClose }: PhotoModalProps) {
  const { user, setUser } = useGlobalContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestImage = async () => {
    const uri = await pickImageFromGallery();
    if (uri) setSelectedImage(uri);
  };

  const handleImageSubmit = async () => {
    if (!selectedImage) {
      showToast("error", "No image selected", "Please select an image first");
      return;
    }

    try {
      setIsLoading(true);
      const fileBlob = await prepareFileBlob(selectedImage);

      const res = user.disabilityCard
        ? await updateUserPhoto({
            file: fileBlob,
            userId: user.$id,
            type: "disabilityCard",
            photoUrl: user?.disabilityCard,
          })
        : await uploadUserPhoto({
            file: fileBlob,
            userId: user.$id,
            type: "disabilityCard",
          });

      showToast("success", "Success", "Disability card uploaded successfully");
      setUser(res);
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      showToast(
        "error",
        "Upload failed",
        "Could not update disability card image"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderImagePreview = () => {
    if (!selectedImage) return null;
    return (
      <View className="items-center mb-4">
        <Image
          source={{ uri: selectedImage }}
          className="w-32 h-32 rounded-full border-2 border-purple-200"
          resizeMode="cover"
        />
      </View>
    );
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
            Upload Disability Card Image
          </CustomText>

          {renderImagePreview()}

          <TouchableOpacity
            className="border-2 border-purple-600 py-3 px-6 rounded-full items-center mb-4"
            onPress={requestImage}
            disabled={isLoading}
          >
            <CustomText className="text-purple-600 font-medium">
              {selectedImage ? "Change Image" : "Select Image"}
            </CustomText>
          </TouchableOpacity>

          <SubmitButton
            loading={isLoading}
            handleClick={handleImageSubmit}
            label="Upload Image"
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
