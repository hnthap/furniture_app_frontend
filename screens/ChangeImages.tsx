import { Ionicons } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImagePickerOptions, MediaTypeOptions } from "expo-image-picker";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import { ButtonRow } from "../components";
import { COLORS, SIZES } from "../constants";
import { pickImage } from "../utils";

type ChangeImagesProps = NativeStackScreenProps<ParamListBase, "Change Images">;

interface ChangeImageProps {
  currentBase64: string | null;
  change: (base64: string | null) => Promise<void>;
  defaultImage: ImageSourcePropType;
  requestReload: () => void;
  type: "avatar" | "cover";
}

export default function ChangeImages({ navigation }: ChangeImagesProps) {
  const { avatarBase64, changeAvatarAsync, changeCoverAsync, coverBase64 } =
    useContext(AuthContext);
  const [needsReload, setNeedsReload] = useState(false);

  useEffect(() => {
    if (needsReload) {
      setNeedsReload(false);
    }
  }, [needsReload]);

  function requestReload() {
    setNeedsReload(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          style={{ paddingLeft: 0 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Avatar</Text>
      </View>
      <ChangeImage
        currentBase64={avatarBase64}
        change={changeAvatarAsync}
        defaultImage={require("../assets/avatar-default.png")}
        requestReload={requestReload}

        type="avatar"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cover</Text>
      </View>
      <ChangeImage
        currentBase64={coverBase64}
        change={changeCoverAsync}
        defaultImage={require("../assets/cover-photo-default.jpg")}
        requestReload={requestReload}
        type="cover"
      />
    </SafeAreaView>
  );
}

function ChangeImage({
  currentBase64,
  change,
  defaultImage,
  requestReload,
  type,
}: ChangeImageProps) {
  const options: ImagePickerOptions = {
    mediaTypes: MediaTypeOptions.Images,
    aspect: [1, 1],
    quality: 1,
    allowsEditing: true,
    base64: true,
  };

  async function reset() {
    await change(null);
    requestReload();
  }

  async function browse() {
    await change(await pickImage(options));
    requestReload();
  }

  // async function capture() {
  //   if (permission) {
  //     if (!permission.granted) {
  //       console.log("Requesting permission");
  //       await requestPermission();
  //     }
  //     if (permission.granted) {
  //       console.log("Permission granted");
  //       await change(await captureImage(options));
  //       requestReload();
  //     } else {
  //       Alert.alert("Failed to get Camera Permission");
  //     }
  //   } else {
  //     console.warn("Permission is being loaded");
  //   }
  // }

  return (
    <>
      <View style={styles.content}>
        <View
          style={type === "avatar" ? styles.avatarWrapper : styles.coverWrapper}
        >
          <Image
            // source={require("../assets/images/profile.jpg")}
            source={
              currentBase64 === null
                ? defaultImage
                : { uri: `data:image/jpeg;base64,${currentBase64}` }
            }
            resizeMode="cover"
            style={[type === "avatar" ? styles.avatarImage : styles.coverImage]}
          />
        </View>
      </View>
      <ButtonRow
        buttons={[
          { title: "RESET", onPress: reset, enabled: currentBase64 !== null },
          { title: "BROWSE", onPress: browse, enabled: true },
          // { title: "CAPTURE", onPress: capture, enabled: true },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.lightWhite,
    position: "relative",
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: SIZES.width - 50,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: "bold",
    fontWeight: "500",
    letterSpacing: 2,
    paddingTop: SIZES.small,
    marginBottom: SIZES.xSmall,
    marginHorizontal: SIZES.large,
  },
  content: {
    marginHorizontal: SIZES.large,
    marginTop: SIZES.small,
  },
  avatarWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  avatarImage: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.secondary,
    borderWidth: 2,
    // marginTop: -90,
    backgroundColor: COLORS.secondary,
  },
  coverWrapper: {},
  coverImage: {
    height: 290,
    width: "100%",
  },
});
