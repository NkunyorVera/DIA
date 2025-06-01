import CustomText from "@/components/CustomText";
import ProfileField from "@/components/ProfileField";
import { useAuth } from "@/context/AuthContext";
import {
  fetchUserInfo,
  updateProfile,
  uploadAndUpdateProfileImage,
} from "@/lib/appwriteService";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  disability: string;
};

export default function ProfileScreen() {
  const { user, signout } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "+1.415.111.0000",
    address: "San Francisco, CA",
    disability: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userData = await fetchUserInfo(user.$id);
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        disability: userData.disability,
      });
      setProfileImage(userData?.photoUrl ?? "");
    } catch (error) {
      console.error("Error loading user data:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load user data",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeProfileImage = async () => {
    try {
      setIsUploadingImage(true);
      const imageUrl = await uploadAndUpdateProfileImage(user.$id);
      setProfileImage(imageUrl);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile image updated successfully",
        position: "top",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update profile image",
        position: "top",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsUpdating(true);
      await updateProfile(user.$id, { ...formData, photoUrl: profileImage });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated successfully",
        position: "top",
      });
      setIsEditing(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update profile",
        position: "top",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    loadUserData(); // Reset form with original data
    setIsEditing(false);
  };

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView edges={[]} className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={isEditing ? handleCancelEdit : () => setIsEditing(true)}
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
          <View style={{ width: 60 }} /> // Spacer for alignment
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
                className="absolute inset-0 flex items-center justify-center"
              />
            ) : profileImage === "" ? (
              <Image
                source={require("@/assets/profile.png")}
                resizeMode="cover"
                className="w-24 h-24 rounded-full border-4 border-purple-300 mb-4"
              />
            ) : (
              <Image
                source={{ uri: profileImage }}
                className="w-24 h-24 rounded-full border-4 border-purple-300 mb-4"
              />
            )}

            {isEditing && (
              <TouchableOpacity
                onPress={handleChangeProfileImage}
                className="absolute bottom-0 right-0 bg-purple-100 rounded-full p-2"
              >
                <Ionicons name="camera-outline" size={20} color="#9333ea" />
              </TouchableOpacity>
            )}
          </View>
          <CustomText className="text-2xl font-bold">
            {formData.name}
          </CustomText>
          <CustomText className="text-gray-500">{formData.email}</CustomText>
        </View>

        <View className="mb-6 gap-4">
          <ProfileField
            label="Name"
            value={formData.name}
            isEditing={isEditing}
            onChangeText={(text) => handleChange("name", text)}
          />
          <ProfileField
            label="Email"
            value={formData.email}
            isEditing={isEditing}
            editable={false} // Email typically shouldn't be editable
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
            onPress={signout}
            className="my-8 border border-red-500 py-3 rounded-xl items-center flex-row justify-center"
          >
            <Feather name="log-out" size={20} color="#DC2626" />
            <CustomText className="ml-2 text-red-600 font-semibold text-base">
              Logout
            </CustomText>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
