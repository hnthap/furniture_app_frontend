import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { Order } from "../../interface";

type OrderTileProps = {
  item: Order;
};

export default function OrderTile({ item }: OrderTileProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.number}>Order ID {item.id.toString(16)}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
        <Text style={styles.total}>${(item.total / 100).toFixed(2)}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.rightIcon}>{item.done ? "✅" : "⏳"}</Text>
        <Text style={styles.rightText}>
          {item.done ? "Delivered!" : "Pending"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.white,
    flexDirection: "row",
  },
  left: {
    flex: 4,
    flexDirection: "column",
  },
  number: {
    fontFamily: "semibold",
    marginBottom: 4,
    fontSize: SIZES.medium,
  },
  date: {
    fontFamily: "light",
    fontSize: SIZES.medium,
  },
  total: {
    marginTop: SIZES.small,
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  right: {
    flex: 1,
    flexDirection: "column",
  },
  rightIcon: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: SIZES.xLarge,
    flex: 3,
  },
  rightText: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    textAlign: "center",
    flex: 1,
  },
});
