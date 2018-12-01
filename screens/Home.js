"use strict";
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image
} from "react-native";
import SideSwipe from "react-native-sideswipe";
import LogoTitle from "../components/LogoTitle";

class Home extends React.Component {
  static navigationOptions = {
    title: `A`,
    headerBackTitle: "A much too long text for back button from B to A",
    headerTruncatedBackTitle: `to A`,
    headerTitle: <LogoTitle />,
    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="Info"
        color="#fff"
      />
    )
  };

  state = {
    currentIndex: 0
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* other code from before here */}
        <Image
          source={{ uri: "https://facebook.github.io/react/logo-og.png" }}
          style={{ width: 400, height: 400 }}
        />
        <Text>Home</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("Details")}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const HomeStack = createStackNavigator(
  {
    Home: Home,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#07C070"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default HomeStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  }
});
