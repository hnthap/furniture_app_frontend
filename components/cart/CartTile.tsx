import { AntDesign } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { CartItem, Product } from "../../interface";

type CartTileProps = {
  item: CartItem;
  product: Product;
  checkout: () => void;
  deleteItem: () => void;
  openItem: () => void;
};

export default function CartTile({
  item,
  product,
  checkout,
  deleteItem,
  openItem,
}: CartTileProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={openItem}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${product.base64}` }}
          resizeMode="cover"
          style={styles.productImg}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.supplierTxt} numberOfLines={1}>
          {product.supplier}
        </Text>
        <Text style={styles.totalText} numberOfLines={1}>
          ${item.total_price / 100}
        </Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={deleteItem} style={styles.deleteButton}>
          <AntDesign
            name="delete"
            size={25}
            color="red"
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={checkout} style={styles.button}>
          <Text style={styles.buttonTitle}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    flexDirection: "row",
  },
  imageContainer: {},
  productImg: {
    width: SIZES.width / 4.5,
    aspectRatio: 1.2,
    marginLeft: SIZES.small,
    marginVertical: SIZES.xSmall,
    borderRadius: SIZES.medium,
  },
  textContainer: {
    alignContent: "space-around",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: SIZES.small,
    width: SIZES.width / 2,
  },
  productTxt: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  supplierTxt: {
    fontFamily: "regular",
    fontSize: SIZES.small,
  },
  totalText: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  right: {
    flex: 1,
    marginRight: SIZES.small,
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    borderRadius: SIZES.medium,
    height: SIZES.large * 2,
  },
  buttonTitle: {
    color: COLORS.lightWhite,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 11,
    fontFamily: "regular",
    marginHorizontal: SIZES.xSmall,
  },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  deleteIcon: {
    width: 25,
  },
});
