import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function SingleMealList({ mealName, mealData, index }) {
  return (
    <View key={index} style={styles.mealInfoContainer}>
      <Text style={styles.mealTypeHeader}>{mealName}</Text>
      <View style={styles.personListContainer}>
        {mealData.map(({ name, id, diet }) => {
          return singleUserMealElement(name, id, diet)
        })}
      </View>
    </View>
  );
}

export function DetailedMealList({ mealName, mealData, index, allUsers }) {
  const notSignedUp = allUsers.filter((user) => {
    return !mealData.some((meal) => meal.id == user.id);
  });

  return (
    <View key={index} style={styles.mealInfoContainer}>
      <Text style={styles.mealTypeHeader}>{mealName}</Text>
      <View style={styles.personListDetailedContainer}>
        <View>
          <Text style={styles.signedUpLabel}>Signed Up</Text>
          {mealData.map(({ name, id, diet }) => {
            return singleUserMealElement(name, id, diet)
          })}
        </View>


        <View> 
          <Text style={styles.notSignedUpLabel}>Not Signed Up</Text>
          {notSignedUp.map(({ firstName, lastName, id }) => {
            const name = `${firstName} ${lastName}`;
            return singleUserMealElement(name, id)
          })}
        </View>
      </View>
    </View>
  );
}

const singleUserMealElement = (name, id, diet) => {
  return (
    <Text key={id} style={styles.singlePersonListTextElement}>
      {name}{diet && "\n   "}{diet && `(${diet})`}
    </Text>
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
  personListDetailedContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signedUpLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  notSignedUpLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  singlePersonListTextElement: {
    fontSize: 14,
    margin: 1,
  }
});
