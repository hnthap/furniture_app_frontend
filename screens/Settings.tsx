import { Ionicons } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import { COLORS, SERVER_ENDPOINT, SIZES } from "../constants";

type SettingsProps = NativeStackScreenProps<ParamListBase, "Settings">;

export default function Settings({ navigation }: SettingsProps) {
  const { userId, email, location, username, reloadDataAsync } =
    useContext(AuthContext);

  const [saved, setSaved] = useState(true);
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newLocation, setNewLocation] = useState(location);

  function onLeaveUsername() {
    if (newUsername.trim().length === 0) {
      setNewUsername(username);
    }
    setSaved((saved) => saved && username === newUsername);
    console.log('username:', username, '\tsaved:', saved);
  }

  function onLeaveEmail() {
    if (newEmail.trim().length === 0) {
      setNewEmail(email);
    }
    setSaved((saved) => saved && email === newEmail);
    console.log("email:", email, "\tsaved:", saved);
  }

  function onLeaveLocation() {
    if (newLocation.trim().length === 0) {
      setNewLocation(location);
    }
    setSaved((saved) => saved && location === newLocation);
    console.log("location:", location, "\tsaved:", saved);
  }

  async function saveAsync() {
    if (
      !saved &&
      username === newUsername &&
      email === newEmail &&
      location === newLocation
    ) {
      const url = `${SERVER_ENDPOINT}/api/profile/${userId}`;
      try {
        await axios.put(url, {
          username: newUsername,
          email: newEmail,
          location: newLocation,
        });
        Alert.alert(`Saved Successfully`);
        await reloadDataAsync();
        setSaved(true);
      } catch (error) {
        Alert.alert(`failed, reason: ${error}`);
      }
    }
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
        <Text style={styles.title}>Settings</Text>
        {saved ? (
          <></>
        ) : (
          <TouchableOpacity onPress={saveAsync} style={styles.button}>
            <Text style={styles.buttonTitle}>SAVE</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.section}>Username</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder={username}
            value={newUsername}
            onChangeText={setNewUsername}
            onSubmitEditing={onLeaveUsername}
          />
        </View>
        <Text style={styles.section}>E-mail</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder={email}
            value={newEmail}
            onChangeText={setNewEmail}
            onSubmitEditing={onLeaveEmail}
          />
        </View>
        <Text style={styles.section}>Location</Text>
        <View style={styles.textInputWrapper}>
          <Ionicons
            style={styles.locationIcon}
            name="location-outline"
            size={24}
          />
          <TextInput
            style={styles.locationTextInput}
            placeholder={location}
            value={newLocation}
            onChangeText={setNewLocation}
            onSubmitEditing={onLeaveLocation}
          />
        </View>
      </View>
    </SafeAreaView>
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
  button: {
    width: SIZES.width / 2,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    borderRadius: SIZES.medium,
    height: SIZES.large * 2,
    marginRight: SIZES.large,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  buttonTitle: {
    color: COLORS.primary,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    fontFamily: "bold",
    marginHorizontal: SIZES.xSmall,
  },
  content: {
    marginHorizontal: SIZES.large,
    marginTop: SIZES.small,
  },
  section: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
    marginTop: SIZES.small,
  },
  textInputWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.medium,
  },
  textInput: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginRight: SIZES.small,
  },
  locationIcon: {
    marginHorizontal: SIZES.large,
  },
  locationTextInput: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: "green",
    flex: 1,
    marginRight: SIZES.small,
  },
});
