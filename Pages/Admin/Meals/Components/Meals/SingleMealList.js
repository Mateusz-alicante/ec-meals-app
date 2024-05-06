import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function SingleMealList({ mealName, mealData }) {
  return (
    <View key={mealName} style={styles.mealInfoContainer}>
      <Text style={styles.mealTypeHeader}>{mealName}</Text>
      <View style={styles.personListContainer}>
        {mealData.map(({ name, id, diet }) => {
          return (
            <Text key={id}>
              {name} {diet && `(${diet})`}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mealTypeHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mealInfoContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#3b78a1",
    backgroundColor: "whitesmoke",
  },
  personListContainer: {
    marginLeft: 10,
    userSelect: "text",
  },
});
