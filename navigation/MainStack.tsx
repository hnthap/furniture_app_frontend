import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Cart,
  Checkout,
  Favorites,
  Orders,
  ProductDetails,
  ProductList,
  Settings
} from "../screens";
import BottomTab from "./BottomTab";

const Stack = createNativeStackNavigator<ParamListBase>();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Bottom Tab Navigation">
      <Stack.Screen
        name="Bottom Tab Navigation"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product Details"
        component={ProductDetails}
        options={{ headerShown: false }}
        initialParams={{ item: undefined, needsReload: true }}
      />
      <Stack.Screen
        name="Product List"
        component={ProductList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
        initialParams={{ items: [] }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
