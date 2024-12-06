import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SERVER_ENDPOINT, SIZES } from "../../constants";
import { Order, OrderedItem, Product } from "../../interface";
import OrderedItemTile from "./OrderedItemTile";

type OrderModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  order: Order | null;
};

export default function OrderModal({
  visible,
  onRequestClose,
  order,
}: OrderModalProps) {
  if (order === null) {
    return <></>;
  }

  const [items, setItems] = useState<OrderedItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      reloadItems();
    }, 200);
  }, []);

  async function reloadItems() {
    const url = `${SERVER_ENDPOINT}/api/order/details/${order!.id}`;
    try {
      const response = await axios.get(url);
      const items = response.data.items;
      const products: Product[] = response.data.products;
      setItems(products.map((product, i) => ({ ...items[i], product })));
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
      setItems([]);
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity onPress={onRequestClose}>
        <Text style={styles.closeText}>⬇️</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderedItemTile item={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <></>}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeText: {
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: SIZES.xLarge,
  },
  container: {
    marginHorizontal: SIZES.small,
    marginVertical: SIZES.medium,
  },
});
