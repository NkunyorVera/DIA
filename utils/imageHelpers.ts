import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

// Toast helper
export const showToast = (
  type: "success" | "error",
  text1: string,
  text2: string
) => {
  Toast.show({ type, text1, text2, position: "top" });
};

// Image picker options
export const IMAGE_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.8,
};

// Pick image from gallery
export const pickImageFromGallery = async (): Promise<string | null> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    showToast(
      "error",
      "Permission required",
      "Please enable photo library access in settings"
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync(IMAGE_OPTIONS);

  if (!result.canceled && result.assets[0]?.uri) {
    return result.assets[0].uri;
  }

  return null;
};

// Prepare image file blob for upload
export const prepareFileBlob = async (uri: string) => {
  const fileInfo = await FileSystem.getInfoAsync(uri);
  if (!fileInfo.exists) throw new Error("File not found");

  const fileName = uri.split("/").pop() || `image_${Date.now()}.jpg`;
  const fileType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";

  return {
    uri,
    name: fileName,
    type: fileType,
    size: fileInfo.size,
  };
};
