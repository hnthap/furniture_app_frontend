import { Ionicons } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import { CartTile } from "../components";
import { COLORS, SERVER_ENDPOINT, SIZES } from "../constants";
import { CartItem, Product } from "../interface";

type CartProps = NativeStackScreenProps<ParamListBase, "Cart">;

type DataType = { item: CartItem; product: Product }[];

export default function Cart({ navigation }: CartProps) {
  const { userId } = useContext(AuthContext);

  const [items, setItems] = useState<DataType>([]);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    reloadCartAsync();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await reloadCartAsync();
    });
    return () => {
      navigation.removeListener("focus", unsubscribe);
    };
  }, [navigation]);

  useEffect(() => {
    setTotal(items.reduce((prev, curr) => prev + curr.item.total_price, 0));
  }, [items]);

  async function reloadCartAsync() {
    const url = `${SERVER_ENDPOINT}/api/cart/${userId}`;
    try {
      const response = await axios.get(url);
      const carts = response.data.items as CartItem[];
      const products = response.data.products as Product[];
      setItems(carts.map((cart, i) => ({ item: cart, product: products[i] })));
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
      setItems([]);
    }
  }

  async function deleteAsync(productId: number) {
    const url = `${SERVER_ENDPOINT}/api/cart/${userId}/${productId}`;
    try {
      await axios.delete(url);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    } finally {
      await reloadCartAsync();
    }
  }

  function open(item: Product) {
    navigation.navigate("Product Details", { item, needsReload: true });
  }

  function checkoutOne(item: CartItem, product: Product) {
    navigation.navigate("Checkout", { items: [{ item, product }] });
  }

  function checkoutAll() {
    if (items.length > 0) {
      navigation.navigate("Checkout", { items });
    } else {
      Alert.alert("Your Cart is Empty", "Add something to the cart to buy it!");
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
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cart</Text>
        <TouchableOpacity onPress={checkoutAll} style={styles.button}>
          <Text style={styles.buttonTitle}>
            {total === null || total === 0
              ? "ADD SOMETHING FIRST"
              : `CHECKOUT $${(total / 100).toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {items.length === 0 ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontFamily: "regular", fontSize: 20 }}>
              Your Cart is Empty
            </Text>
          </View>
        ) : (
          items.map(({ item, product }, i) => {
            return (
              <CartTile
                key={i}
                item={item}
                product={product}
                checkout={() => checkoutOne(item, product)}
                deleteItem={() => deleteAsync(product.id)}
                openItem={() => open(product)}
              />
            );
          })
        )}
      </ScrollView>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: "bold",
    fontWeight: "500",
    letterSpacing: 2,
    paddingTop: SIZES.small,
    marginBottom: SIZES.xSmall,
    marginHorizontal: SIZES.large,
  },
  button: {
    width: SIZES.width / 2,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    borderRadius: SIZES.medium,
    height: SIZES.large * 2,
    marginRight: SIZES.large,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  buttonTitle: {
    color: COLORS.primary,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    fontFamily: "bold",
    marginHorizontal: SIZES.xSmall,
  },
  scrollView: {
    marginBottom: SIZES.large,
  }
});
