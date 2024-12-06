import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

export const homeStyles = StyleSheet.create({
  text: {
    fontFamily: "bold",
    fontSize: 40,
  },
  appBarWrap: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  featured: {
    alignItems: "flex-end",
  },
  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  cartCountText: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.lightWhite,
  }
});

export const productDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  image: {
    width: SIZES.width,
    height: SIZES.height / 2,
    resizeMode: "cover",
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleWrapper: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  price: {
    padding: 10,
    fontFamily: "bold",
    fontSize: SIZES.large - 1,
  },
  ratingWrapper: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 20,
    top: 3,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: "medium",
    marginHorizontal: 5,
    textAlign: "center",
    textAlignVertical: "center",
    minWidth: 30,
    paddingHorizontal: SIZES.xSmall,
  },
  descriptionWrapper: {
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
  },
  descriptionTitle: {
    fontFamily: "medium",
    fontSize: SIZES.large - 2,
  },
  descriptionText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  locationWrapper: {
    marginBottom: SIZES.small,
    // marginTop: 15,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    marginHorizontal: 12,
    padding: 5,
    borderRadius: SIZES.large,
  },
  delivery: {
    flexDirection: "row",
    minWidth: "30%",
    alignContent: "center",
  },
  deliveryText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
  cartWrapper: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
  },
  cartButton: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.large,
    marginLeft: 12,
    padding: SIZES.small / 2,
  },
  cartText: {
    marginLeft: SIZES.small,
    textAlignVertical: "center",
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
  },
  addCartButton: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const productListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  noResultsImage: {
    resizeMode: "contain",
    width: SIZES.width - 100,
    height: SIZES.height - 300,
    opacity: 0.9,
  }
});
