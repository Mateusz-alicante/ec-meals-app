import { StyleSheet, View, Dimensions, Text } from "react-native";
import Container from "../../components/Container/Container";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createMaterialTopTabNavigator();

import Week from "./Week";

export default function Meals({ children, style }) {
  return (
    <Container wide={true} maxHeight={false}>
      <Week />
    </Container>
  );
}
