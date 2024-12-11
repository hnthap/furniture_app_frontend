import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import { ActivityIndicator, Alert, Keyboard, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductListContent, SearchInput } from "../components";
import { COLORS, SERVER_ENDPOINT, SIZES } from "../constants";
import { Product } from "../interface";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [startsSearch, setStartsSearch] = useState(false);
  const [loads, setLoads] = useState(false);

  async function search() {
    if (query.length === 0) return;
    Keyboard.dismiss();
    setLoads(true);
    const url = `${SERVER_ENDPOINT}/api/product/search/${query}`;
    try {
      const response = await axios.get(url);
      const results = response.data["products"];
      setResults(results);
      setStartsSearch(true);
      setLoads(false);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  return (
    <SafeAreaView>
      <SearchInput
        query={query}
        setQuery={setQuery}
        search={search}
        icon={
          <Feather name="search" size={SIZES.xLarge} color={COLORS.offwhite} />
        }
      />
      {results.length === 0 ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontFamily: "semibold", fontSize: 30 }}>
            {startsSearch ? "NO RESULTS" : ""}
            {/* {startsSearch ? "NO RESULTS" : "⬆️ Click to search ⬆️"} */}
          </Text>
        </View>
      ) : loads ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
        </View>
      ) : (
        <ProductListContent products={results} />
      )}
    </SafeAreaView>
  );
}
