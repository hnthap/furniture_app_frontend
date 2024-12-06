import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { productListStyles as styles } from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useFetch } from "../hooks";
import { ProductListContent } from "../components";

type ProductListProps = NativeStackScreenProps<ParamListBase, "Product List">;

export default function ProductList({ navigation }: ProductListProps) {
  const { data, loads, error } = useFetch();

  return (
    <SafeAreaView style={styles.container}>
      {loads ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons
                name="chevron-back-circle"
                size={40}
                color={COLORS.lightWhite}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>Products</Text>
          </View>
          {data["products"].length == 0 ? (
            <View style={{ flex: 1 }}>
              <Image
                style={styles.noResultsImage}
                source={require("../assets/images/Pose23.png")}
              />
            </View>
          ) : (
            <ProductListContent products={data["products"]} />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
