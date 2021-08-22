import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import UserDetails from "../screens/UserDetails";
import routeNames from "./routeNames";

const Stack = createStackNavigator();

export type StackMainScreen = {
  [routeNames.MainFlow.MainScreen]: undefined;
  [routeNames.MainFlow.UserDetails]: { login: string };
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={routeNames.MainFlow.MainScreen}
          component={MainScreen}
        />
        <Stack.Screen
          name={routeNames.MainFlow.UserDetails}
          component={UserDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
