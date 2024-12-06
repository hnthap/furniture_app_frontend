import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants";

export const cardStyles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginStart: 11,
    marginEnd: 11,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imageWrapper: {
    flex: 1,
    width: 170,
    marginLeft: SIZES.small / 1.5,
    marginTop: SIZES.small / 1.5,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    width: 170,
    height: 80,
    resizeMode: "cover",
    flex: 1,
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small,
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },
  addButton: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});

export const rowStyles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginLeft: 12,
  },
  list: {
    columnGap: SIZES.medium,
  },
});

export const listContentStyles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    paddingTop: SIZES.xxLarge * 2,
    marginHorizontal: SIZES.large,
  },
  separator: {
    height: 16,
  },
});
