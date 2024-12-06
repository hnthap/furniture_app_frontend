import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MediumButton, TextInputRow, TinyText } from "../components/auth";
import { COLORS, SERVER_ENDPOINT, SIZES } from "../constants";

type RegisterProps = NativeStackScreenProps<ParamListBase, "Register">;

export default function Register({ navigation }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    // TODO: register
    const url = `${SERVER_ENDPOINT}/api/register`;
    try {
    const response = await axios.post(url, {
      username,
      email,
      location,
      password,
    });
      Alert.alert("Register Success", "You will be redirected to Login");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInputRow title="Username" text={username} onChange={setUsername} />
        <TextInputRow title="Email" text={email} onChange={setEmail} />
        <TextInputRow title="Location" text={location} onChange={setLocation} />
        <TextInputRow
          title="Password"
          text={password}
          onChange={setPassword}
          secureTextEntry={true}
        />
        <MediumButton title="Continue" onPress={register} />
        <TinyText
          text="Have an account? Login here!"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.xxLarge,
    color: COLORS.primary,
    marginBottom: SIZES.xxLarge,
  },
});
