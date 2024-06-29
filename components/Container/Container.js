import { StyleSheet, View, Dimensions, ScrollView } from "react-native";

const screeenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Container({
  children,
  style,
  wide = false,
  maxHeight = true,
}) {
  const styles = StyleSheet.create({
    container: {
      maxHeight: "93%",

      width: wide ? "100%" : screeenWidth > 500 ? "50%" : "95%",
      margin: "none",
      marginTop: 20,
      marginBottom: 5,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,

      // Center elements
      alignSelf: "center",

      // Box shadow:
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      flex: 1,
      ...style,
    },
  });

  return <ScrollView><View style={[styles.container, style]}>{children}</View></ScrollView>;
}
