import { useAuth } from "@/context/AuthContext";
import { databases, storage } from "@/lib/appwrite";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ID } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, signout } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    disability: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const res = await databases.getDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
        user.$id
      );
      setFormData({
        name: res.name || "",
        email: res.email || "",
        phone: res.phone || "",
        address: res.address || "",
        disability: res.disability || "",
      });

      setProfileImage(
        res.photoUrl || "https://freesvg.org/img/abstract-user-flat-4.png"
      );
    } catch (err) {
      Alert.alert("Error", "Failed to load user info.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async () => {
    try {
      await databases.updateDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,

        user.$id,
        {
          ...formData,
          photoUrl: profileImage,
        }
      );
      Alert.alert("Success", "Profile updated successfully.");
    } catch (err) {
      Alert.alert("Error", "Failed to update profile.");
      console.error(err);
    }
  };

  const handleChangeProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need permission to access media.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      try {
        const file = await storage.createFile(
          process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!,
          ID.unique(),
          {
            uri: result.assets[0].uri,
            name: "profile.jpg",
            type: "image/jpeg",
            size: 0,
          }
        );
        const imageUrl = storage.getFileView(
          process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!,
          file.$id
        ).href;
        setProfileImage(imageUrl);
      } catch (err) {
        Alert.alert("Upload Error", "Could not upload image.");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
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
      <ScrollView className="flex-1 bg-white px-6 py-4">
        <View className="items-center mb-6">
          <Image
            source={{ uri: profileImage }}
            className="w-28 h-28 rounded-full border-4 border-purple-300"
          />
          <TouchableOpacity
            onPress={handleChangeProfileImage}
            className="mt-3 px-4 py-2 bg-purple-100 rounded-full"
          >
            <Text className="text-purple-600 font-medium">
              Change Profile Image
            </Text>
          </TouchableOpacity>
        </View>

        <View className="space-y-4">
          <InputField
            label="Name"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <InputField
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            editable={false}
          />
          <InputField
            label="Phone"
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
          />
          <InputField
            label="Address"
            value={formData.address}
            onChangeText={(text) => handleChange("address", text)}
          />
          <InputField
            label="Disability"
            value={formData.disability}
            onChangeText={(text) => handleChange("disability", text)}
          />
        </View>

        <TouchableOpacity
          onPress={handleUpdate}
          className="mt-6 bg-purple-600 py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-lg">Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={signout}
          className="mt-4 bg-red-100 py-3 rounded-xl items-center flex-row justify-center"
        >
          <Feather name="log-out" size={20} color="#DC2626" />
          <Text className="ml-2 text-red-600 font-semibold text-base">
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  editable = true,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
}) {
  return (
    <View>
      <Text className="text-sm text-gray-500 mb-1">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder={`Enter your ${label.toLowerCase()}`}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}
