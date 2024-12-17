import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { OrderedItem } from "../../interface";

type OrderTileProps = {
  item: OrderedItem;
};

export default function OrderedItemTile({ item }: OrderTileProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/jpeg;base64,${item.product.base64}` }}
        />
      </View>
      <View style={styles.right}>
        <Text style={styles.title}>{item.product.title}</Text>
        <View style={styles.row1}>
          <Text style={styles.total}>
            ${(item.total_price / 100).toFixed(2)}
          </Text>
          <Text style={styles.quantity}>× {item.count}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.xLarge,
    paddingVertical: SIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    marginTop: SIZES.small,
  },
  right: {
    flex: 2.5,
    flexDirection: "column",
  },
  row1: {
    flexDirection: "row",
  },
  title: {
    fontFamily: "regular",
    marginBottom: 4,
    fontSize: SIZES.large,
  },
  quantity: {
    flex: 1,
    fontFamily: "light",
    fontSize: SIZES.medium,
    textAlign: "right",
  },
  total: {
    flex: 2,
    marginTop: SIZES.small,
    fontFamily: "semibold",
    fontSize: SIZES.xLarge,
    textAlign: "center",
    textAlignVertical: "bottom",
  },
  left: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginRight: SIZES.small,
  },
  image: {
    flex: 1,
    borderRadius: SIZES.small,
  },
});
