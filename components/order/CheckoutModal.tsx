import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { CartItem, Product } from "../../interface";

export default function CheckoutModal({
  item,
  goBack,
}: {
  item: { item: CartItem; product: Product };
  goBack: (count: number, total: number) => void;
}) {
  const [count, setCount] = useState(item.item.count);
  const [total, setTotal] = useState(item.item.total_price);
  function incrementProductCount() {
    setCount((count) => {
      count += 1;
      setTotal(item.product.price * count);
      return count;
    });
  }
  function decrementProductCount() {
    if (count > 0) {
      setCount((count) => {
        count -= 1;
        setTotal(item.product.price * count);
        return count;
      });
    }
  }
  return (
    <Modal style={styles.container} transparent={false} visible={true}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          style={{ paddingLeft: 0 }}
          onPress={() => goBack(count, total)}
        >
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.product.title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `data:image/jpeg;base64,${item.product.base64}`,
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <Text style={styles.left}>Unit price</Text>
          <Text style={styles.right}>
            ${(item.product.price / 100).toFixed(2)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Quantity</Text>
          <View style={styles.quantityView}>
            <TouchableOpacity onPress={decrementProductCount}>
              <SimpleLineIcons
                style={styles.quantityIcon}
                name="minus"
                size={20}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{count}</Text>
            <TouchableOpacity onPress={incrementProductCount}>
              <SimpleLineIcons
                style={styles.quantityIcon}
                name="plus"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={styles.left}>Total</Text>
          <Text style={styles.right}>${(total / 100).toFixed(2)}</Text>
        </View>
      </View>
    </Modal>
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
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    width: SIZES.width / 1.5,
    height: SIZES.width / 1.5,
    borderRadius: SIZES.xLarge,
    marginVertical: SIZES.large,
  },
  contentContainer: {
    marginHorizontal: SIZES.xLarge,
  },
  row: {
    flexDirection: "row",
    marginTop: SIZES.large,
  },
  left: {
    flex: 3,
    fontFamily: "semibold",
    textAlignVertical: "bottom",
    fontSize: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
  right: {
    flex: 2,
    fontFamily: "regular",
    textAlign: "left",
    textAlignVertical: "bottom",
    fontSize: SIZES.medium,
  },
  quantityView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  quantity: {
    fontSize: SIZES.medium,
    fontFamily: "regular",
    height: SIZES.large * 2,
    textAlignVertical: "center",
  },
  quantityIcon: {
    height: SIZES.large * 2,
    textAlignVertical: "center",
  },
  separator: {
    backgroundColor: COLORS.gray,
    height: 1,
    marginTop: SIZES.large * 2,
  },
});
