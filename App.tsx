import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import AuthProvider from "./AuthContext";
import { AuthStack, MainStack } from "./navigation";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loadsFonts] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (loadsFonts) {
      await SplashScreen.hideAsync();
    }
  }, [loadsFonts]);

  if (!loadsFonts) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Auth Stack Navigation"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main Stack Navigation"
            component={MainStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
