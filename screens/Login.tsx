import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import { MediumButton, TextInputRow, TinyText } from "../components/auth";
import { COLORS, SIZES } from "../constants";

type LoginProps = NativeStackScreenProps<ParamListBase, "Login">;

export default function Login({ navigation }: LoginProps) {
  const { email, setEmail, login, avatarBase64 } = useContext(AuthContext);
  
  const [password, setPassword] = useState("thap");

  async function onLogin() {
    const success = await login(password);
    if (success) {
      navigation.navigate("Main Stack Navigation");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInputRow title="Email" text={email} onChange={setEmail} />
        <TextInputRow
          title="Password"
          text={password}
          onChange={setPassword}
          secureTextEntry={true}
        />
        <MediumButton title="Continue" onPress={onLogin} />
        <TinyText
          text="Don't have an account? Register here!"
          onPress={() => navigation.navigate("Register")}
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
