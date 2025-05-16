import { useAuth } from "@/context/AuthContext";
import { databases, storage } from "@/lib/appwrite";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppwriteException, ID } from "react-native-appwrite";

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

  const updateUserProfileWithImage = async (imageId: string): Promise<void> => {
    try {
      await databases.updateDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
        user.$id,
        { photoUrl: imageId }
      );
    } catch (error) {
      console.error("Error updating user profile with image:", error);
    }
  };

  const uploadProfileImage = async (file: {
    uri: string;
    name: string;
    type: string;
    size: number;
  }): Promise<string | undefined> => {
    try {
      const uploaded = await storage.createFile(
        process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!,
        ID.unique(),
        file
      );
      return uploaded?.$id;
    } catch (error) {
      if (error instanceof AppwriteException)
        Alert.alert("Error", `Error uploading image: ${error?.message}`);
    }
  };

  const handleProfileImageSubmit = async (file: any): Promise<void> => {
    const formattedFile = {
      uri: file.uri,
      name: file.name || "profile.jpg",
      type: file.type || "image/jpeg",
      size: file.size || 0,
    };
    const imageId = await uploadProfileImage(formattedFile);
    if (imageId) {
      await updateUserProfileWithImage(imageId);
    }

    onClose();
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
          <Text className="text-lg font-bold mb-4 text-center">
            Choose Profile Image (Optional)
          </Text>

          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}

          <TouchableOpacity
            className="bg-primary py-2 px-5 rounded-full mb-5"
            onPress={pickImage}
          >
            <Text className="text-white">Pick Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-secondary py-2 px-5 rounded-full"
            onPress={handleProfileImageSubmit}
          >
            <Text className="text-white">Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text className="text-gray-600 mt-2">Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
