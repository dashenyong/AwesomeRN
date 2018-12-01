"use strict";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";


class Explore extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Explore</Text>
      </View>
    );
  }
}

export default Explore;

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
