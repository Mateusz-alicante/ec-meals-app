import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";

import Icons from "@expo/vector-icons/Ionicons";

export default function Loader({
  children,
  loading,
  warning = false,
  warningMessage = "",
  warningIconName,
}) {
  return (
    <View style={{ height: "100%" }}>
      {warning && (
        <View style={styles.warningContainer}>
          <Icons name={warningIconName} size={70} color={"#3b78a1"} />
          <Text>{warningMessage}</Text>
        </View>
      )}
      {loading && !warning && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#3b78a1" />
          <Text>Loading...</Text>
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    backgroundColor: "whitesmoke",
    opacity: 0.8,
    borderRadius: 10,
  },
  warningContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    backgroundColor: "orange",
    opacity: 0.8,
    borderRadius: 10,
  },
});
