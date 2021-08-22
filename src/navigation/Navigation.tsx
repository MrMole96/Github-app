import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "../screens/MainScreen";
import routeNames from "./routeNames";
import UserDetailsScreen from "../screens/UserDetailsScreen";


const Stack = createStackNavigator();

export type StackMainScreen = {
  [routeNames.MainFlow.MainScreen]: undefined;
  [routeNames.MainFlow.UserDetailsScreen]: { login: string };
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
          name={routeNames.MainFlow.UserDetailsScreen}
          component={UserDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
