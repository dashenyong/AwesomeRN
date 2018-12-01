import React from "react";
import { Image } from "react-native";
class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require("../assets/logo-student.png")}
        style={{ width: 20, height: 30 }}
      />
    );
  }
}

export default LogoTitle;
