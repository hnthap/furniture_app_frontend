import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../constants";
import { useFetch } from "../../hooks";
import ProductCard from "./ProductCard";
import { listContentStyles as styles } from "./style";
import { Product } from "../../interface";

type ProductListContentProps = {
  products: Product[];
};

export default function ProductListContent({
  products,
}: ProductListContentProps) {
  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({ item }) => <ProductCard item={item} />}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}
