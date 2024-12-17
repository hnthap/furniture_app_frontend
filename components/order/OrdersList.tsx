import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Order } from "../../interface";
import OrderTile from "./OrderTile";

type OrdersListProps = {
  items: Order[];
  onPressEachOrder: (order: Order) => void;
};

export default function OrdersList({
  items,
  onPressEachOrder,
}: OrdersListProps) {
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressEachOrder(item)}>
            <OrderTile item={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
