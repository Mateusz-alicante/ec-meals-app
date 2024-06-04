import Container from "../../../components/Container/Container";
import Icons from "@expo/vector-icons/Ionicons";
import { useEffect, Fragment } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

export default function DeepNavLink({ navigation, routes }) {
  return (
    <View style={styles.container}>
      {routes.slice(0, -1).map((route) => (
        <Fragment key={route}>
          <TouchableOpacity
            key={route}
            onPress={() => navigation.navigate(route)}
          >
            <Text style={styles.singleLink}>{route}</Text>
          </TouchableOpacity>
          <Icons name={"arrow-forward-outline"} size={20} color={"#3b78a1"} />
        </Fragment>
      ))}
      <TouchableOpacity
        key={routes.slice(-1)[0]}
        onPress={() => navigation.navigate(routes.slice(-1)[0])}
      >
        <Text style={styles.singleLink}>{routes.slice(-1)[0]}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "white",
    padding: 10,
  },
  singleLink: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 17,
    paddingRight: 5,
    paddingLeft: 5,
  },
});
