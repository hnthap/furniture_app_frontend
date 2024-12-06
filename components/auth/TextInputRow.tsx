import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";

type TextInputRowProps = {
  title: string;
  text: string;
  onChange: (value: string) => void;
  secureTextEntry?: boolean;
};

export default function TextInputRow({
  title,
  text,
  onChange,
  secureTextEntry,
}: TextInputRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={title}
        value={text}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: SIZES.xLarge,
  },
  title: {
    width: SIZES.width / 4 - 10,
    textAlign: "right",
    textAlignVertical: "center",
    marginRight: 20,
    fontFamily: "regular",
  },
  input: {
    width: (SIZES.width / 3) * 2 - 20,
    textAlign: "left",
    textAlignVertical: "center",
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: SIZES.small,
    borderColor: COLORS.gray,
    fontFamily: "regular",
  },
});
