import { Fontisto, Ionicons } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import { Carousel, Headings, ProductRow, Welcome } from "../components";
import { COLORS, SERVER_ENDPOINT, SIZES } from "../constants";
import { homeStyles } from "./style";

type HomeProps = NativeStackScreenProps<ParamListBase, "Home">;

export default function Home({ navigation }: HomeProps) {
  const { logout, userId, location } = useContext(AuthContext);

  const [cartTitlesCount, setCartTitlesCount] = useState(0);

  async function countCartTitlesAsync() {
    const url = `${SERVER_ENDPOINT}/api/cart/count/${userId}`;
    try {
      const response = await axios.get(url);
      const count = parseInt(response.data.count);
      setCartTitlesCount(count);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  useEffect(() => {
    function onBackPress() {
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          {
            text: "Cancel",
            onPress: () => {
              // Do nothing
            },
            style: "cancel",
          },
          {
            text: "YES",
            // onPress: () => BackHandler.exitApp(),
            onPress: () => {
              navigation.navigate("Auth Stack Navigation");
              logout();
            },
          },
        ],
        { cancelable: false }
      );
      return true;
    }
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      countCartTitlesAsync();
    });
    return () => {
      navigation.removeListener("focus", unsubscribe);
    };
  }, [navigation]);

  function openSearch() {
    navigation.navigate("Search");
  }

  return (
    <SafeAreaView>
      <View style={homeStyles.appBarWrap}>
        <View style={homeStyles.appBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="location-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Text style={homeStyles.location}>{location}</Text>
          </TouchableOpacity>
          <View style={homeStyles.featured}>
            <View
              style={[
                homeStyles.cartCount,
                {
                  backgroundColor: cartTitlesCount > 0 ? "green" : COLORS.black,
                },
              ]}
            >
              <Text style={homeStyles.cartCountText}>{cartTitlesCount}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome openSearch={openSearch} />
        <Carousel
          imageSources={[
            require("../assets/sales.jpg"),
            require("../assets/images/fn1.jpg"),
            require("../assets/images/fn2.jpg"),
            require("../assets/images/fn3.jpg"),
            require("../assets/images/fn4.jpg"),
            require("../assets/images/fn5.jpg"),
          ]}
          imageStyle={{
            borderRadius: 15,
            width: SIZES.width,
            height: 200,
            marginTop: 10,
          }}
          scrollDuration={5000}
          style={{ flex: 1 }}
        />
        <Headings goToProductList={() => navigation.navigate("Product List")} />
        <ProductRow />
      </ScrollView>
    </SafeAreaView>
  );
}
