"use strict";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Button,
  FlatList
} from "react-native";
import axios from "../src/axios-sports";
import LogoTitle from "../components/LogoTitle";
import { createStackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

class Avatar extends React.Component {
  render = () => {
    let imageUrl = this.props.imageUrl;
    return (
      <View
        style={{
          borderWidth: 2,
          borderColor: "#eee",
          borderRadius: 39,
          height: 78,
          width: 78,
          justifyContent: "center",
          alignItems: "center",
          margin: 0
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            overflow: "hidden"
          }}
        />
      </View>
    );
  };
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

class PlusAvatar extends React.Component {
  render = () => {
    return (
      <View
        style={{
          borderWidth: 2,
          borderColor: "#eee",
          borderRadius: 39,
          height: 78,
          width: 78,
          justifyContent: "center",
          alignItems: "center",
          margin: 0
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: "#eee",
            borderRadius: 35,
            height: 70,
            width: 70,
            justifyContent: "center",
            alignItems: "center",
            margin: 0
          }}
        >
          <Icon name="add" color="#eee" />
        </View>
      </View>
    );
  };
}

class Explore extends Component {
  static navigationOptions = {
    title: `Family`,
    headerBackTitle: "Family",
    headerTruncatedBackTitle: `Family`,
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
    currentIndex: 0,
    userInfo: {}
  };

  getProfile = () => {
    axios.get("get-test-profile").then(res => {
      console.log(res.data.data);
      this.setState({
        userInfo: res.data.data
      });
      debugger;
    });
  };

  componentDidMount() {
    this.getProfile();
  }

  render() {
    let userInfo = this.state.userInfo;
    let students = userInfo ? userInfo.kids : [];
    const { width } = Dimensions.get("window");
    return userInfo ? (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.panelHeading}>
          <View style={styles.panelHeadingIndicator} />
          <Text style={styles.panelHeadingText}>Family Members</Text>
        </View>
        <View style={styles.flexRow}>
          <View
            style={{
              width: width / 3,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10
            }}
          >
            <Avatar imageUrl={userInfo.avatar} />
            <Text>
              {userInfo.first_name} {userInfo.last_name}
            </Text>
          </View>
          <View
            style={{
              width: width / 3,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10
            }}
          >
            <PlusAvatar color="#eee" />
            <Text>Add Member</Text>
          </View>
        </View>
        <View style={styles.seperator} />
        <View style={styles.panelHeading}>
          <View style={styles.panelHeadingIndicator} />
          <Text style={styles.panelHeadingText}>Students</Text>
        </View>
        <View>
          {students ? (
            <View style={styles.flexRow}>
              {students.map((item, index) => (
                <View
                  key={index}
                  style={{
                    width: width / 3,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 10
                  }}
                >
                  <Avatar imageUrl={item.avatar} />
                  <Text>
                    {item.first_name} {item.last_name}
                  </Text>
                </View>
              ))}
              <View
                style={{
                  width: width / 3,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10
                }}
              >
                <PlusAvatar color="#eee" />
                <Text>Add Student</Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: width / 3,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10
              }}
            >
              <PlusAvatar color="#eee" />
              <Text>Add Student</Text>
            </View>
          )}
        </View>
      </ScrollView>
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>No Family Yet</Text>
      </View>
    );
  }
}

const ExploreStack = createStackNavigator(
  {
    Explore: Explore,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Explore",
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

export default ExploreStack;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  panelHeading: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
    width: "100%"
  },
  panelHeadingIndicator: {
    backgroundColor: "#0CD67F",
    width: 6,
    height: 30
  },
  panelHeadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingLeft: 10
  },
  seperator: {
    width: "100%",
    height: 10,
    backgroundColor: "#eee"
  },
  flexRow: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },
  studentList: {
    justifyContent: "space-between",
    flexDirection: "column",
    padding: 10
  }
});
