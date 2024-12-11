import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useFetch } from "../../hooks";
import ProductCard from "./ProductCard";
import { rowStyles } from "./style";

export default function ProductRow() {
  const { data, loads, error } = useFetch();
  return (
    <View style={rowStyles.container}>
      {loads ? (
        <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong!</Text>
      ) : (
        <FlatList
          data={data["products"].slice(0, 5)}
          // keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCard item={item} />}
          contentContainerStyle={rowStyles.list}
          horizontal
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
