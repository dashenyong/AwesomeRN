"use strict";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "react-navigation";
import LogoTitle from "../components/LogoTitle";

class Inbox extends Component {
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
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Inbox</Text>
      </View>
    );
  }
}

const InboxStack = createStackNavigator(
  {
    Inbox: Inbox
  },
  {
    initialRouteName: "Inbox",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default InboxStack;

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
