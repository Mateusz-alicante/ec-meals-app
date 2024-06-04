import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

export default function Link({ name, to, curr, navigation }) {
  const styles = StyleSheet.create({
    link: {
      color: "#3b78a1",
      borderRadius: 5,
      padding: 10,
      fontSize: 20,
      fontWeight: "500",
      textDecorationLine: curr === to ? "underline" : "none",

      // Box shadow:
      shadowColor: curr === to ? "#000" : "transparent",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
  });
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate(to)}>
        <Text style={styles.link}>{name}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
