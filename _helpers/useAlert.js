import { Platform, Alert } from "react-native";

export default function platformAlert(title, message) {
  if (Platform.OS === "web") {
    return alert(`${title}: ${message}`);
  } else {
    return Alert.alert(title, message);
  }
}
