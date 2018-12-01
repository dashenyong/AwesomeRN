"use strict";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

class Trips extends Component {
  render() {
    let pic = {
      uri:
        "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg"
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Trips</Text>
        <Image source={pic} style={{ width: 193, height: 110 }} />
      </View>
    );
  }
}

export default Trips;

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
