import React from "react";
import { View, Button, Text, Image } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import Explore from "./screens/Explore";
import Inbox from "./screens/Inbox";
import HomeStack from "./screens/Home";
import Saved from "./screens/Saved";

export default createAppContainer(
  createBottomTabNavigator(
    {
      Courses: HomeStack,
      Family: Explore,
      Inbox: Inbox,
      Others: Saved
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === "Courses") {
            iconName = `${focused ? "ios-home" : "ios-home"}`;
          } else if (routeName === "Family") {
            iconName = `${focused ? "ios-planet" : "ios-planet"}`;
          } else if (routeName === "Inbox") {
            iconName = `${focused ? "ios-chatbubbles" : "ios-chatbubbles"}`;
          } else if (routeName === "Others") {
            iconName = `${focused ? "ios-albums" : "ios-albums"}`;
          }
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return (
            <Ionicons
              name={iconName}
              size={horizontal ? 20 : 25}
              color={tintColor}
            />
          );
        }
      }),
      tabBarOptions: {
        activeTintColor: "#07C070",
        inactiveTintColor: "gray"
      }
    }
  )
);
