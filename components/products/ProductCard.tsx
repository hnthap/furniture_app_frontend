import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../AuthContext";
import { COLORS, SERVER_ENDPOINT } from "../../constants";
import { Product } from "../../interface";
import { cardStyles } from "./style";

export default function ProductCard({ item }: { item: Product }) {
  // TODO: assure type safety
  const navigation = useNavigation<any>();

  const { userId } = useContext(AuthContext);

  async function addCartAsync() {
    const url = `${SERVER_ENDPOINT}/api/cart`;
    const data = { userId, productId: item.id, count: 1 };
    try {
      await axios.post(url, data);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`)
    }
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Product Details", { item, needsReload: true })
      }
    >
      <View style={cardStyles.container}>
        <View style={cardStyles.imageWrapper}>
          <Image
            style={cardStyles.image}
            source={{ uri: `data:image/jpeg;base64,${item.base64}` }}
          />
        </View>
        <View style={cardStyles.details}>
          <Text style={cardStyles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={cardStyles.supplier} numberOfLines={1}>
            {item.supplier}
          </Text>
          <Text style={cardStyles.price} numberOfLines={1}>
            ${item.price / 100}
          </Text>
        </View>
        <TouchableOpacity style={cardStyles.addButton} onPress={addCartAsync}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
