import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";

import generateDoc from "./generateDoc";

export default function GenerateReportControls({ mealData }) {
  if (Platform.OS === "web") {
    return (
      <Button title={"Generate Report"} onPress={() => generateDoc(mealData)} />
    );
  }
}

const styles = StyleSheet.create({});
