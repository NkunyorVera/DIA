import CustomText from "@/components/CustomText";
import FileUploadModal from "@/components/FileUploadModal";
import ProfileField from "@/components/ProfileField";
import { useGlobalContext } from "@/context/GlobalProvider";
import {
  updateUser,
  updateUserPhoto,
  uploadUserPhoto,
} from "@/lib/appwite_utility";
import { signOut } from "@/lib/appwrite-auth";
import {
  pickImageFromGallery,
  prepareFileBlob,
  showToast,
} from "@/utils/imageHelpers";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { AppwriteException } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  username: string;
  email: string;
  phone: string;
  address: string;
  disability: string;
};

export default function ProfileScreen() {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [formData, setFormData] = useState<FormData>({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    disability: user?.disability || "",
  });
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  const handleChangeAvatar = async () => {
    try {
      setIsUploadingImage(true);
      const uri = await pickImageFromGallery();
      if (!uri) return;
      setAvatar(uri);

      if (!uri) {
        showToast("error", "No image selected", "Please select an image first");
        return;
      }

      const fileBlob = await prepareFileBlob(uri);
      const res = user?.profile
        ? await updateUserPhoto({
            file: fileBlob,
            userId: user.$id,
            type: "avatar",
            photoUrl: user?.avatar,
          })
        : await uploadUserPhoto({
            file: fileBlob,
            userId: user.$id,
            type: "avatar",
          });

      setUser(res);
      showToast(
        "success",
        "Profile Updated",
        "Your profile image has been updated."
      );
    } catch (error) {
      console.error(error);
      showToast("error", "Upload failed", "Could not update profile image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsUpdating(true);
      await updateUser(user.$id, { ...formData });
      showToast("success", "Success", "Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      showToast("error", "Error", "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      if (error instanceof AppwriteException) {
        showToast("error", "Error", "Failed to sign out");
      }
    }
  };

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={
            isEditing ? () => setIsEditing(false) : () => setIsEditing(true)
          }
        >
          <CustomText className="text-purple-600 font-medium">
            {isEditing ? "Cancel" : "Edit Profile"}
          </CustomText>
        </TouchableOpacity>

        <CustomText className="text-lg font-bold">Profile</CustomText>

        {isEditing ? (
          <TouchableOpacity onPress={handleSaveProfile} disabled={isUpdating}>
            {isUpdating ? (
              <ActivityIndicator size="small" color="#9333ea" />
            ) : (
              <CustomText className="text-purple-600 font-medium">
                Save
              </CustomText>
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 60 }} />
        )}
      </View>

      <ScrollView
        className="flex-1 bg-white px-12 py-4"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-8 relative">
          <View className="relative rounded-full bg-purple-200 w-24 h-24">
            {isUploadingImage ? (
              <ActivityIndicator
                size="small"
                color="#9333ea"
                className="absolute inset-0"
              />
            ) : avatar ? (
              <Image
                source={{ uri: avatar }}
                className="w-24 h-24 rounded-full border-4 border-purple-300 mb-4"
              />
            ) : (
              <Image
                source={require("@/assets/profile.png")}
                className="w-24 h-24 rounded-full border-4 border-purple-300 mb-4"
              />
            )}

            {isEditing && (
              <TouchableOpacity
                onPress={handleChangeAvatar}
                className="absolute bottom-0 right-0 bg-purple-100 rounded-full p-2"
              >
                <Ionicons name="camera-outline" size={20} color="#9333ea" />
              </TouchableOpacity>
            )}
          </View>

          <CustomText className="text-2xl font-bold">
            {user.username}
          </CustomText>
          <CustomText className="text-gray-500">{user.email}</CustomText>
        </View>

        <View className="mb-6 gap-4">
          <ProfileField
            label="Name"
            value={formData.username}
            isEditing={isEditing}
            onChangeText={(text) => handleChange("username", text)}
          />
          <ProfileField
            label="Email"
            value={formData.email}
            isEditing={isEditing}
            editable={false}
          />
          <ProfileField
            label="Phone"
            value={formData.phone}
            isEditing={isEditing}
            onChangeText={(text) => handleChange("phone", text)}
          />
          <ProfileField
            label="Address"
            value={formData.address}
            isEditing={isEditing}
            onChangeText={(text) => handleChange("address", text)}
          />
          <ProfileField
            label="Disability"
            value={formData.disability}
            isEditing={isEditing}
            onChangeText={(text) => handleChange("disability", text)}
          />
        </View>

        {!isEditing && (
          <TouchableOpacity
            onPress={handleSignOut}
            className="my-8 border border-red-500 py-3 rounded-xl items-center flex-row justify-center"
          >
            <Feather name="log-out" size={20} color="#DC2626" />
            <CustomText className="ml-2 text-red-600 font-semibold text-base">
              Logout
            </CustomText>
          </TouchableOpacity>
        )}

        {isEditing && (
          <TouchableOpacity
            onPress={() => setShowFileUploadModal(true)}
            className="my-8 border border-purple-500 py-3 rounded-xl items-center flex-row justify-center"
          >
            <Feather name="file-plus" size={20} color="#9333ea" />
            <CustomText className="ml-2 text-purple-600 font-semibold text-base">
              Upload Disability Card
            </CustomText>
          </TouchableOpacity>
        )}
      </ScrollView>

      <FileUploadModal
        visible={showFileUploadModal}
        onClose={() => setShowFileUploadModal(false)}
      />
    </SafeAreaView>
  );
}
