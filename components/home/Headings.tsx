import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { headingsStyle } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

type HeadingsProps = {
  goToProductList: () => void;
}

export default function Headings({ goToProductList }: HeadingsProps) {
  return (
    <View style={headingsStyle.container}>
      <View style={headingsStyle.header}>
        <Text style={headingsStyle.title}>New Products</Text>
        <TouchableOpacity onPress={goToProductList}>
          <Ionicons name="ios-grid" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
