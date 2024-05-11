import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";

import Icons from "@expo/vector-icons/Ionicons";

export default function MealStatusIndicator({ mealStatus }) {
  return (
    <View style={styles.statusIndicator}>
      <Icons
        name={mealStatus == "final" ? "lock-closed-outline" : "help-outline"}
        size={30}
        color={"#3b78a1"}
      />
      <Text style={styles.statusText}>{mealStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusIndicator: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
