import { Ionicons } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import { OrderModal, OrdersList } from "../components";
import { COLORS, SERVER_ENDPOINT, SIZES } from "../constants";
import { Order } from "../interface";

type OrdersProps = NativeStackScreenProps<ParamListBase, "Orders">;

export default function Orders({ navigation }: OrdersProps) {
  const { userId } = useContext(AuthContext);

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, selectOrder] = useState<Order | null>(null);

  useEffect(() => {
    setTimeout(() => {
      reloadOrders();
    }, 500);
  }, []);

  async function reloadOrders() {
    const url = `${SERVER_ENDPOINT}/api/order/${userId}`;
    try {
      const response = await axios.get(url);
      setOrders(response.data.orders);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
      setOrders([]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          style={{ paddingLeft: 0 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}> Orders </Text>
      </View>
      <OrdersList
        items={orders}
        onPressEachOrder={selectOrder}
      />
      <OrderModal
        visible={selectedOrder !== null}
        onRequestClose={() => selectOrder(null)}
        order={selectedOrder!}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.lightWhite,
    position: "relative",
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: SIZES.width - 50,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: "bold",
    fontWeight: "500",
    letterSpacing: 2,
    paddingTop: SIZES.small,
    marginBottom: SIZES.xSmall,
  },
});
