import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SIZES } from "../constants";

export interface ButtonRowProps {
  buttons: {
    title: string;
    onPress: (() => void) | (() => Promise<void>);
    enabled?: boolean;
  }[];
}

export default function ButtonRow({ buttons }: ButtonRowProps) {
  return (
    <View style={styles.container}>
      {buttons.map(({ title, onPress, enabled }, index) => (
        <TouchableOpacity
          disabled={!enabled}
          key={`[${index}] ${title}`}
          onPress={onPress}
          style={[
            { minWidth: SIZES.width / (buttons.length + 1.5) },
            styles.button,
            enabled ?? true ? styles.enabledButton : styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.title,
              enabled ?? true ? styles.enabledTitle : styles.disabledTitle,
            ]}
          >
            {title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.large,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.small,
  },
  enabledButton: {
    backgroundColor: "darkgreen",
  },
  disabledButton: {
    backgroundColor: "lightgreen",
  },
  title: {
    textAlign: "center",
    fontFamily: "regular",
  },
  enabledTitle: {
    color: "white",
  },
  disabledTitle: {
    color: "black",
  },
});
