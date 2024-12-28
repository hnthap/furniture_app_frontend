import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

export const headingsStyle = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "semibold",
    fontSize: SIZES.xLarge - 2,
  },
});

export const welcomeStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  text: {
    fontFamily: "bold",
    fontSize: SIZES.xxLarge - 20,
    marginHorizontal: SIZES.small,
  },
  text1: { color: COLORS.black, marginTop: SIZES.xSmall },
  text2: { color: COLORS.gray, marginTop: 0 },
});

export const searchInputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    marginHorizontal: SIZES.small,
  },
  icon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  input: {
    fontFamily: "regular",
    width: "100%",
    paddingHorizontal: SIZES.small,
    height: 50,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
});
