import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import { CheckoutModal } from "../components";
import { COLORS, SERVER_ENDPOINT, SIZES } from "../constants";
import { CartItem, Product } from "../interface";

type CheckoutProps = NativeStackScreenProps<ParamListBase, "Checkout">;

type CheckoutParamList = {
  params: {
    items: { item: CartItem; product: Product }[];
  };
};

const PAYMENT_METHODS = ["Cash", "E-wallet"] as const;

type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export default function Checkout({ navigation }: CheckoutProps) {
  const { location, userId } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const route = useRoute<RouteProp<CheckoutParamList, "params">>();

  const [total, setTotal] = useState(0);
  const [items, setItems] = useState(route.params.items);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  function updateTotal(items: { item: CartItem; product: Product }[]) {
    setTotal(items.reduce((prev, curr) => prev + curr.item.total_price, 0));
  }

  async function updateCartAsync(index: number) {
    if (index >= 0 && index < items.length) {
      try {
        const url = `${SERVER_ENDPOINT}/api/cart/`;
        const item = items[index];
        const data = {
          userId,
          productId: item.product.id,
          count: item.item.count,
        };
        const response = await axios.post(url, data);
      } catch (error) {
        Alert.alert(`failed, reason: ${error}`);
      }
    }
  }

  async function orderAsync() {
    const url = `${SERVER_ENDPOINT}/api/order`;
    try {
      const response = await axios.post(url, {
        address: location,
        cartIds: items.map((item) => item.item.id),
        userId,
      });
      // const order: Order = response.data.order;
      // const orderedItem: OrderedItem[] = response.data.items;
      // const products: Product[] = response.data.products;
      Alert.alert(
        `Ordered Successfully`,
        `Your package will be delivered soon! Thank you for choosing us among many others.`
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  useEffect(() => {
    updateTotal(items);
  }, [items]);

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
        <Text style={styles.title}>Checkout</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.section}>Address</Text>
          <View style={styles.location}>
            <Ionicons
              style={styles.locationIcon}
              name="location-outline"
              size={24}
            />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <Text style={styles.section}>Order Summary</Text>
          <View style={styles.itemContainer}>
            {items.map((item, i) => (
              <TouchableOpacity key={i} onPress={() => setCurrentIndex(i)}>
                <View style={styles.item}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.product.title}
                  </Text>
                  <Text style={styles.itemTotal}>
                    ${(item.item.total_price / 100).toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.section}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            {PAYMENT_METHODS.map((method, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setPaymentMethod(method)}
              >
                <Text
                  style={[
                    styles.paymentMethodsItem,
                    paymentMethod === method
                      ? { color: "green", fontFamily: "bold" }
                      : { color: COLORS.gray, fontFamily: "semibold" },
                  ]}
                >
                  {method}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalValue}>${(total / 100).toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={orderAsync}>
            <Text style={styles.buttonTitle}>BUY</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {currentIndex === null ? (
        <></>
      ) : (
        <CheckoutModal
          item={items[currentIndex]}
          goBack={(count, total) => {
            updateCartAsync(currentIndex).then(() => {
              setItems((items) => {
                if (count > 0) {
                  const item = items[currentIndex];
                  item.item.count = count;
                  item.item.total_price = total;
                  items[currentIndex] = item;
                } else {
                  items = items.filter((item, i) => i !== currentIndex);
                }
                updateTotal(items);
                return items;
              });
              setCurrentIndex(null);
            });
          }}
        />
      )}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SIZES.large,
  },
  button: {
    width: SIZES.width / 1.5,
    backgroundColor: COLORS.tertiary,
    flexDirection: "row",
    borderRadius: SIZES.medium,
    height: SIZES.large * 3,
    marginRight: SIZES.large,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  buttonTitle: {
    color: COLORS.primary,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: SIZES.large,
    fontFamily: "semibold",
    marginHorizontal: SIZES.xSmall,
  },
  content: {
    marginHorizontal: SIZES.large,
    marginTop: SIZES.small,
  },
  location: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: SIZES.small,
    marginTop: SIZES.small,
  },
  locationIcon: {
    marginHorizontal: SIZES.large,
  },
  locationText: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: "green",
  },
  section: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
    marginTop: SIZES.small,
  },
  itemContainer: {
    flexDirection: "column",
  },
  item: {
    height: SIZES.xLarge * 2,
    flexDirection: "row",
    marginVertical: SIZES.xSmall,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.large,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.small,
  },
  itemTitle: {
    flex: 1,
    textAlign: "left",
    fontFamily: "semibold",
  },
  itemTotal: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "regular",
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SIZES.small,
  },
  paymentMethodsItem: {
    fontSize: SIZES.medium,
  },
  total: {
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
  },
  totalText: {
    flex: 1,
    fontFamily: "semibold",
    fontSize: SIZES.xLarge,
    textAlignVertical: "bottom",
  },
  totalValue: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    textAlignVertical: "bottom",
  },
});
