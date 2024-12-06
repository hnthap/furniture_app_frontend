import { Ionicons } from "@expo/vector-icons";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { COLORS } from "../constants";
import { Home, Profile, Search } from "../screens";

const Tab = createBottomTabNavigator();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  tabBarStyle: {
    bottom: 0,
    elevation: 0,
    height: 70,
    left: 0,
    position: "absolute",
    right: 0,
  },
};

export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? COLORS.primary : COLORS.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"search-sharp"}
              size={24}
              color={focused ? COLORS.primary : COLORS.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? COLORS.primary : COLORS.gray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
