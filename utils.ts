import {
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";
import { Alert } from "react-native";

export async function pickImage(options?: ImagePickerOptions) {
  try {
    const { assets, canceled } = await launchImageLibraryAsync(options);
    if (!canceled && assets.length === 1) {
      return assets[0].base64!;
    }
  } catch (error) {
    Alert.alert("Failed to pick image", `${error}`);
  }
  return null;
}

export async function captureImage(options?: ImagePickerOptions) {
  try {
    const { assets, canceled } = await launchCameraAsync(options);
    if (!canceled && assets.length === 1) {
      return assets[0].base64!;
    }
  } catch (error) {
    Alert.alert("Failed to capture image", `${error}`);
  }
  return null;
}
