import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import { COLORS, SERVER_ENDPOINT } from "../constants";
import { Product } from "../interface";
import { productDetailsStyles as styles } from "./style";

// TODO: Modal for Description

type ProductDetailsProps = NativeStackScreenProps<
  ParamListBase,
  "Product Details"
>;

type ProductDetailsParamList = {
  params: {
    item: Product | undefined;
  };
};

export default function ProductDetails({ navigation }: ProductDetailsProps) {
  const { userId } = useContext(AuthContext);
  const route = useRoute<RouteProp<ProductDetailsParamList, "params">>();
  const { item } = route.params;

  const [count, setCount] = useState(0);
  const [previousCount, setPreviousCount] = useState(0);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    (async () => {
      await loadCountAsync();
      await loadFavoriteAsync();
    })();
  }, []);

  async function loadFavoriteAsync() {
    const url = `${SERVER_ENDPOINT}/api/favorite/${userId}/${item!.id}/`;
    try {
      const response = await axios.get(url);
      setFavorite(response.data.favorite);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  async function loadCountAsync() {
    const url = `${SERVER_ENDPOINT}/api/cart/count/${userId}/${item!.id}`;
    try {
      const response = await axios.get(url);
      const count = parseInt(response.data.count);
      setPreviousCount(count);
      setCount(count);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  async function removeCartAsync() {
    const url = `${SERVER_ENDPOINT}/api/cart/${userId}/${item!.id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  async function addCartAsync() {
    const url = `${SERVER_ENDPOINT}/api/cart`;
    const data = { userId, productId: item!.id, count };
    try {
      await axios.post(url, data);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  async function favoriteAsync() {
    const url = `${SERVER_ENDPOINT}/api/favorite/${userId}/${item!.id}`;
    console.log("POST", url);
    try {
      await axios.post(url);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  async function unfavoriteAsync() {
    const url = `${SERVER_ENDPOINT}/api/favorite/${userId}/${item!.id}`;
    console.log("DELETE", url)
    try {
      await axios.delete(url);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  function onClose() {
    if (previousCount !== count) {
      Alert.alert(
        "Unsaved Changes",
        count === 0
          ? `Do you want to remove this item from your cart?`
          : previousCount === 0
          ? `Do you want to buy ${count} item(s)?`
          : `You wanted to add ${previousCount} item(s), and now you have changed to ${count} item(s). Do you want to save?`,
        [
          {
            text: "YES",
            onPress: async () => {
              setPreviousCount(count);
              if (count === 0) {
                await removeCartAsync();
              } else {
                await addCartAsync();
              }
            },
          },
          { text: "NO", onPress: () => {} },
        ],
        { cancelable: false }
      );
    }
    (favorite ? favoriteAsync : unfavoriteAsync)().then(() => {
      navigation.goBack();
    }).catch((reason) => {
      Alert.alert(`failed to add or remove to favorites, reason: ${reason}`)
    });
  }

  function incrementProductCount() {
    setCount((count) => count + 1);
  }

  function decrementProductCount() {
    setCount((count) => {
      if (count < 1) return 0;
      return count - 1;
    });
  }

  return (
    <SafeAreaView>
      {item === undefined ? (
        <Text>No item specified</Text>
      ) : (
        <View style={styles.container}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="chevron-back-circle" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFavorite((v) => !v)}>
              <Ionicons
                name="heart"
                size={30}
                color={favorite ? COLORS.red : COLORS.lightWhite}
              />
            </TouchableOpacity>
          </View>
          <Image
            style={styles.image}
            source={{ uri: `data:image/jpeg;base64,${item.base64}` }}
          />
          <View style={styles.details}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.priceWrapper}>
                <Text style={styles.price}>${item.price / 100}</Text>
              </View>
            </View>
            <View style={styles.ratingWrapper}>
              <View style={styles.rating}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <Ionicons key={index} name="star" color="gold" size={24} />
                ))}
                <Text style={styles.ratingText}>{"(4.9)"}</Text>
              </View>
              <View style={styles.rating}>
                <TouchableOpacity onPress={decrementProductCount}>
                  <SimpleLineIcons name="minus" size={20} />
                </TouchableOpacity>
                <Text style={styles.ratingText}>{count}</Text>
                <TouchableOpacity onPress={incrementProductCount}>
                  <SimpleLineIcons name="plus" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{item.description}</Text>
              {/* <Text style={styles.descriptionText}>{TEXTS.dummy}</Text> */}
            </View>
            <View style={styles.locationWrapper}>
              <View style={styles.location}>
                <View style={styles.delivery}>
                  <Ionicons name="location-outline" size={20} />
                  <Text style={styles.deliveryText} numberOfLines={0}>
                    {item.product_location}
                  </Text>
                </View>
                <View style={styles.delivery}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={20}
                  />
                  <Text style={styles.deliveryText} numberOfLines={0}>
                    Free Delivery
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.cartWrapper}>
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => {
                  if (previousCount !== count) {
                    setPreviousCount(count);
                    let message: string;
                    if (count === 0) {
                      removeCartAsync();
                      message = `Successfully removed from cart`;
                    } else {
                      addCartAsync();
                      message = `Successfully added to cart`;
                    }
                    Alert.alert(message);
                  }
                }}
              >
                <Text style={styles.cartText}>BUY NOW</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addCartButton}
                onPress={() => navigation.navigate("Cart")}
              >
                <Fontisto
                  name="shopping-bag"
                  size={22}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
