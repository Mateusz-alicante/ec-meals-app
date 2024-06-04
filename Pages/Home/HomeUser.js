import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Header,
  TouchableWithoutFeedback,
} from "react-native";

import HomeMeals from "./HomeMeals";

import Container from "../../components/Container/Container";

export default function HomeScreen({ navigation, route }) {
  return (
    <Container>
      <Text style={styles.headTitle}>Welcome to Ernescliff!</Text>
      <HomeMeals navigation={navigation} route={route} />
    </Container>
  );
}

const styles = StyleSheet.create({
  headTitle: {
    textAlign: "center",
    fontSize: 40,
    color: "#3b78a1",
    fontWeight: "600",
  },
  subtitle: {
    textAlign: "center",
    margin: 30,
    fontWeight: "400",
  },
});
