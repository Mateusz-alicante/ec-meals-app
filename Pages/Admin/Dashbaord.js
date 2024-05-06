import Container from "../../components/Container/Container";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

import Icons from "@expo/vector-icons/Ionicons";

export default function Dashbaord({ navigation }) {
  return (
    <Container>
      <View style={styles.ScreensContainer}>
        {screens.map((screen) => (
          <TouchableOpacity
            key={screen.name}
            style={styles.SingleScreenContainer}
            onPress={() => navigation.navigate(screen.path)}
          >
            <Icons name={screen.icon} size={70} color={"#3b78a1"} />
            <Text style={styles.ScreenTextContainer}>{screen.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
}

const screens = [
  { name: "Users", icon: "people-outline", path: "Users" },
  { name: "Meals", icon: "pizza-outline", path: "Meals" },
  { name: "Diets", icon: "leaf-outline", path: "Diets" },
];

const styles = StyleSheet.create({
  ScreensContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    margin: 20,
  },
  SingleScreenContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#3b78a1",
  },
  ScreenTextContainer: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
});
