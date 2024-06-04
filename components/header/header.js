import { StyleSheet, Text, View, Image } from "react-native";

export default function HeaderLogo() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/ec_logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 170,
    resizeMode: "contain",
    margin: 10,
  },
});
