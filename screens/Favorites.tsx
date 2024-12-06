import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import { COLORS, SERVER_ENDPOINT, SHADOWS, SIZES } from "../constants";
import { Product } from "../interface";

type FavoritesProps = NativeStackScreenProps<ParamListBase, "Favorites">;

const Favorites = ({ navigation }: FavoritesProps) => {
  const { userId } = useContext(AuthContext);

  const [products, setProducts] = useState<Product[]>([]);

  async function reloadFavoritesAsync() {
    const url = `${SERVER_ENDPOINT}/api/favorite/${userId}`;
    try {
      const response = await axios.get(url);
      const products: Product[] = response.data.products;
      setProducts(products);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  async function unfavoriteAsync(productId: number) {
    const url = `${SERVER_ENDPOINT}/api/favorite/${userId}/${productId}`;
    try {
      const response = await axios.delete(url);
      const products: Product[] = response.data.products;
      setProducts(products);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  useEffect(() => {
    reloadFavoritesAsync();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await reloadFavoritesAsync();
    });
    return () => {
      navigation.removeListener("focus", unsubscribe);
      unsubscribe();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          style={{ paddingLeft: 0 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Product Details", {
                item,
                needsReload: true,
              })
            }
            style={styles.favcontainer}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.base64}` }}
                resizeMode="cover"
                style={styles.productImg}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.productTxt} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.supplierTxt} numberOfLines={1}>
                {item.supplier}
              </Text>
              <Text style={styles.supplierTxt} numberOfLines={1}>
                ${(item.price / 100).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => unfavoriteAsync(item.id)}>
              <SimpleLineIcons name="trash" size={24} color="black" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: SIZES.width - 50,
    marginBottom: SIZES.xSmall,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: "bold",
    fontWeight: "500",
    letterSpacing: 2,
  },
  favcontainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.xSmall,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  imageContainer: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTxt: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  supplierTxt: {
    fontSize: SIZES.small + 2,
    fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});
