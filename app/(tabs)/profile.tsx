import { useAuth } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user, signout } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    disability: user?.disability || "",
  });

  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    // TODO: Call backend (Appwrite/Firebase) to update user info
    Alert.alert("Profile Updated", "Your information has been updated.");
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

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      // TODO: Upload to storage and update user's profile photo URL
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-6">
      <ScrollView className="flex-1 bg-white px-6 py-8">
        {/* Profile Image */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: profileImage }}
            className="w-28 h-28 rounded-full border-4 border-secondary"
          />
          <TouchableOpacity
            onPress={handleChangeProfileImage}
            className="mt-3 px-4 py-2 bg-orange-100 rounded-full"
          >
            <Text className="text-secondary font-medium">
              Change Profile Image
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
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

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleUpdate}
          className="mt-6 bg-primary py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-lg">Save Changes</Text>
        </TouchableOpacity>

        {/* Logout Button */}
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
