import { Button, View, StyleSheet, Dimensions } from "react-native";

import Link from "./Link";

const screeenWidth = Dimensions.get("window").width;
const isDesktop = screeenWidth > 500;

export default function HeaderDeskNav({ route, navigation }) {
  if (isDesktop) {
    return (
      <View style={styles.container}>
        <Link to="Home" name="Home" curr={route.name} navigation={navigation} />
        <Link
          to="Log In"
          name="Log In"
          curr={route.name}
          navigation={navigation}
        />
      </View>
    );
  } else {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    margin: 10,
  },
});
