"use strict";
import React, { Component } from "react";
import moment from "moment";
import axios from "../src/axios-sports";
import { createStackNavigator } from "react-navigation";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from "react-native";
import SideSwipe from "react-native-sideswipe";
import LogoTitle from "../components/LogoTitle";
import ArtImage from "../assets/Art.png";
import GymImage from "../assets/Gym.png";
import LanguageImage from "../assets/Language.png";
import MathImage from "../assets/Math.png";
import ProgrammingImage from "../assets/Programming.png";
import OthersImage from "../assets/Others.png";

const planets = [
  { title: "Sun", value: "sun", abbr: "SUN" },
  { title: "Venus", value: "venus", abbr: "VNS" },
  { title: "Earth", value: "earth", abbr: "ERH" }
];

class Home extends React.Component {
  static navigationOptions = {
    title: `FoxSmart`,
    headerBackTitle: "Home",
    headerTruncatedBackTitle: `Home`,
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
    categories: [],
    courses: []
  };

  getCategories = () => {
    axios.get("categories").then(res => {
      this.setState({
        categories: res.data.data
      });
      debugger;
    });
  };

  getCourses = () => {
    axios.get("courses/newest").then(res => {
      this.setState({
        courses: res.data.data
      });
      debugger;
    });
  };

  componentDidMount() {
    this.getCategories();
    this.getCourses();
  }

  render = () => {
    const { width } = Dimensions.get("window");
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SideSwipe
          index={this.state.currentIndex}
          itemWidth={ImageComponent.WIDTH}
          style={width}
          onIndexChange={index =>
            this.setState(() => ({ currentIndex: index }))
          }
          data={planets}
          renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
            <ImageComponent
              onSearchBtn={() => this.props.navigation.navigate("Details")}
            />
          )}
        />
        <View style={styles.panelHeading}>
          <View style={styles.panelHeadingIndicator} />
          <Text style={styles.panelHeadingText}>Course Types</Text>
        </View>
        <View style={{ height: 200 }}>
          {this.state.categories ? (
            <FlatList
              contentContainerStyle={styles.catlist}
              numColumns={3}
              data={this.state.categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <CategoryCard item={item} />}
            />
          ) : (
            ""
          )}
        </View>
        <View style={styles.seperator} />
        <View style={styles.panelHeading}>
          <View style={styles.panelHeadingIndicator} />
          <Text style={styles.panelHeadingText}>Featured Courses</Text>
        </View>
        <View style={{ height: "100%" }}>
          {this.state.courses ? (
            <FlatList
              contentContainerStyle={styles.catlist}
              numColumns={2}
              data={this.state.courses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <CourseCard item={item} />}
            />
          ) : (
            ""
          )}
        </View>
      </ScrollView>
    );
  };
}

class CourseCard extends React.Component {
  render = () => {
    const dimensions = Dimensions.get("window");
    const imageWidth = (dimensions.width - 20) / 2 - 10;
    const imageHeight = Math.round((imageWidth * 2) / 3);
    const grades = [
      "",
      "Pre K",
      "Kinder",
      "Grade 1",
      "Grade 2",
      "Grade 3",
      "Grade 4",
      "Grade 5",
      "Grade 6",
      "Grade 7",
      "Grade 8",
      "Grade 9",
      "Grade 10",
      "Grade 11",
      "Grade 12",
      "Adult"
    ];
    let item = this.props.item;
    let fromDate = "";
    let tuition = 0;
    if (item) {
      fromDate = moment(item.from_date).format("MM/DD");
      tuition =
        item.tuition > 0
          ? (item.tuition / item.total_classes).toFixed(2) + "/课"
          : "待定";
    }
    return item ? (
      <View style={styles.shadow}>
        <View style={[styles.shadow, styles.courseCart]}>
          <ImageBackground
            source={{ uri: item.image.image_path }}
            style={[
              styles.courseCartImageBack,
              { width: imageWidth, height: "auto" }
            ]}
          >
            <View
              style={{
                padding: 10,
                paddingTop: 50,
                overflow: "hidden",
                backgroundColor: "rgba(0,0,0,0.2)",
                height: 110
              }}
            >
              <Text style={{ color: "#fff", fontSize: 11 }} numberOfLines={1}>
                {item.school.name}
              </Text>
              <Text
                style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}
                numberOfLines={2}
              >
                {item.course_title}
              </Text>
              <View
                style={{
                  position: "absolute",
                  top: 20,
                  right: 0,
                  backgroundColor: "#fff",
                  minWidth: 80,
                  maxWidth: imageWidth - 20,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  height: 20
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 12,
                    textAlign: "center",
                    lineHeight: 20
                  }}
                >
                  {item.city}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View
            style={[
              styles.courseCartImageBack,
              {
                width: imageWidth,
                height: 100,
                backgroundColor: "#fafbfc",
                padding: 5
              }
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 10, color: "#bababa" }}>开学</Text>
                <Text>{fromDate}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 10, color: "#bababa" }}>年级</Text>
                <Text>
                  {grades[item.min_grade]} - {grades[item.max_grade]}
                </Text>
              </View>
            </View>

            <Text>${tuition}</Text>
          </View>
        </View>
      </View>
    ) : (
      ""
    );
  };
}

class CategoryCard extends React.Component {
  render = () => {
    const dimensions = Dimensions.get("window");
    const imageWidth = (dimensions.width - 20) / 3 - 10;
    const imageHeight = Math.round((imageWidth * 2) / 3);
    let item = this.props.item;
    let imageUrl = ArtImage;
    // let imageUrl = item ? item.name_en == 'Art' ? ArtImage : item.name_en == 'Art';
    if (item) {
      switch (item.name_en) {
        case "Gym":
          imageUrl = GymImage;
          break;
        case "Math":
          imageUrl = MathImage;
          break;
        case "Others":
          imageUrl = OthersImage;
          break;
        case "Language":
          imageUrl = LanguageImage;
          break;
        case "Programming":
          imageUrl = ProgrammingImage;
          break;
        default:
          imageUrl = ArtImage;
          break;
      }
    }
    return item ? (
      <View style={styles.shadow}>
        <ImageBackground
          source={imageUrl}
          style={[
            styles.catCartImageBack,
            { width: imageWidth, height: imageHeight }
          ]}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12
            }}
          >
            <Text style={styles.catText}>{item.name_en}</Text>
          </View>
        </ImageBackground>
      </View>
    ) : (
      ""
    );
  };
}

class ImageComponent extends React.Component {
  render = () => {
    const dimensions = Dimensions.get("window");
    const imageHeight = Math.round((dimensions.width * 9) / 16);
    const imageWidth = dimensions.width;
    return (
      <ImageBackground
        source={{
          uri:
            "https://s3.amazonaws.com/ninja-storage/ninja-public-call/projects/foxsmart/course-category-bg/home-page.jpg"
        }}
        style={{ width: imageWidth, height: imageHeight }}
      >
        <View style={styles.sliderContent}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              paddingLeft: 15
            }}
          >
            <Text style={styles.sliderText}>FoxSmart</Text>
            <Text style={styles.sliderText}>慧狐成长体系</Text>
            <TouchableOpacity onPress={this.props.onSearchBtn}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Search Course</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
  button: {
    color: "#333",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid",
    padding: 10,
    width: 140,
    textAlign: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
    marginTop: 10
  },
  buttonText: {
    textAlign: "center"
  },
  sliderContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor:
      "linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.3))",
    color: "#fff"
  },
  sliderText: {
    color: "#fff",
    fontSize: 24
  },
  catlist: {
    justifyContent: "center",
    flexDirection: "column",
    padding: 10
  },
  catText: {
    color: "#fff",
    fontSize: 16
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
  shadow: {
    shadowOffset: { width: 1, height: 5 },
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 3,
    zIndex: 999
  },
  catCartImageBack: {
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 12,
    margin: 5
  },
  courseCart: {
    overflow: "hidden",
    borderRadius: 12,
    margin: 5,
    position: "relative"
  },
  courseCartImageBack: {
    resizeMode: "contain",
    overflow: "hidden"
  },
  seperator: {
    width: "100%",
    height: 10,
    backgroundColor: "#eee"
  }
});
