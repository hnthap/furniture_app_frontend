import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../AuthContext";
import { COLORS, SIZES } from "../constants";

export default function Profile({ navigation }) {
  const { username, deleteAccountAsync, logout, avatarBase64, coverBase64 } =
    useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <StatusBar backgroundColor={COLORS.gray} />
        <TouchableOpacity onPress={() => navigation.navigate("Change Images")}>
          <View style={{ width: "100%" }}>
            <Image
              source={
                coverBase64
                  ? { uri: `data:image/jpeg;base64,${coverBase64}` }
                  : require("../assets/cover-photo-default.jpg")
              }
              resizeMode="cover"
              style={styles.maiImag}
            />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Change Images")}
          >
            <Image
              source={
                avatarBase64
                  ? { uri: `data:image/jpeg;base64,${avatarBase64}` }
                  : require("../assets/avatar-default.png")
              }
              resizeMode="cover"
              style={styles.profileImg}
            />
          </TouchableOpacity>

          <Text style={styles.name}>{username}</Text>

          {/* <TouchableOpacity>
            <View style={styles.loginBtn}>
              <Text style={styles.menuItemText}>LOGIN</Text>
            </View>
          </TouchableOpacity> */}

          <View style={styles.menuWrapper}>
            {/* Settings */}
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <View style={styles.menuItem(0.5)}>
                <Ionicons
                  name="settings-outline"
                  color={COLORS.primary}
                  size={25}
                />
                <Text style={styles.menuItemText}>Settings</Text>
              </View>
            </TouchableOpacity>

            {/* Favorites */}
            <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
              <View style={styles.menuItem(0.5)}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  color={COLORS.primary}
                  size={25}
                />
                <Text style={styles.menuItemText}>Favorites</Text>
              </View>
            </TouchableOpacity>

            {/* Orders */}
            <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
              <View style={styles.menuItem(0.5)}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuItemText}>Orders</Text>
              </View>
            </TouchableOpacity>

            {/* Cart */}
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <View style={styles.menuItem(0.5)}>
                <SimpleLineIcons name="bag" size={24} color={COLORS.primary} />
                <Text style={styles.menuItemText}>Cart</Text>
              </View>
            </TouchableOpacity>

            {/* Clear Cache */}
            {/* <TouchableOpacity>
              <View style={styles.menuItem(0.5)}>
                <MaterialCommunityIcons
                  name="cached"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuItemText}>Clear Cache</Text>
              </View>
            </TouchableOpacity> */}

            {/* Delete Account */}
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Delete My Account",
                  "Are you REALLY sure? Account Deletion is IRREVERSIBLE!",
                  [
                    {
                      text: "Cancel",
                      onPress: () => {}, // Do nothing
                      style: "cancel",
                    },
                    {
                      text: "Delete my account",
                      onPress: async () => {
                        await deleteAccountAsync();
                        navigation.navigate("Auth Stack Navigation");
                      },
                      style: "destructive",
                    },
                  ]
                );
              }}
            >
              <View style={styles.menuItem(0.5)}>
                <AntDesign name="deleteuser" size={24} color={COLORS.primary} />
                <Text style={styles.menuItemText}>Delete Account</Text>
              </View>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity
              onPress={() => {
                logout();
                navigation.navigate("Auth Stack Navigation");
              }}
            >
              <View style={styles.menuItem(0)}>
                <AntDesign name="logout" size={24} color={COLORS.primary} />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    padding: 2,
    borderWidth: 0.4,
    borderRadius: SIZES.xxLarge,
    borderColor: COLORS.primary,
  },
  maiImag: {
    height: 290,
    width: SIZES.width,
  },
  profileImg: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.secondary,
    borderWidth: 2,
    marginTop: -90,
    backgroundColor: COLORS.secondary,
  },
  name: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginVertical: 4,
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  menuItem: (borderBottomWidth) => ({
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: borderBottomWidth,
  }),
  menuItemText: {
    fontFamily: "regular",
    color: COLORS.gray,
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 26,
  },
});
