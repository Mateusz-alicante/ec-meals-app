import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import useAlert from "../../../../../_helpers/useAlert";
import { isMobile } from 'react-device-detect';


export default function SingleMealList({ mealName, mealData, index, removeUserFromMeal }) {
  return (
    <View key={index} style={styles.mealInfoContainer}>
      <Text style={styles.mealTypeHeader}>{mealName}</Text>
      <View style={styles.personListContainer}>
        {mealData.map(({ name, _id, diet }) => {
          return singleUserMealElement(name, _id, diet, removeUserFromMeal)
        })}
      </View>
    </View>
  );
}

export function DetailedMealList({ mealName, mealData, index, allUsers, removeUserFromMeal }) {
  const notSignedUp = allUsers.filter((user) => {
    return !mealData.some((meal) => meal._id == user.id);
  });

  return (
    <View key={index} style={styles.mealInfoContainer}>
      <Text style={styles.mealTypeHeader}>{mealName}</Text>
      <View style={styles.personListDetailedContainer}>
        <View>
          <Text style={styles.signedUpLabel}>Signed Up</Text>
          {mealData.map(({ name, _id, diet }) => {
            return singleUserMealElement(name, _id, diet, removeUserFromMeal)
          })}
        </View>


        <View> 
          <Text style={styles.notSignedUpLabel}>Not Signed Up</Text>
          {notSignedUp.map(({ firstName, lastName, id }) => {
            const name = `${firstName} ${lastName}`;
            return singleUserMealElement(name, id, null, null)
          })}
        </View>
      </View>
    </View>
  );
}



const removeUserFromMealWrapper = async (removeUser, userName, userID) => {
  console.log("removeUserFromMealWrapper: ", userName, userID);
  // if on mobiel show alert
  if (Platform.OS ==="web") {
    if (confirm(`Are you sure you want to remove ${userName} from the meal?`)) {
      await removeUser(userID);
      useAlert("Success", "User removed from meal");
    } 
  } else 
  Alert.alert(
    "Remove User",
    `Are you sure you want to remove ${userName} from the meal?`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: async () => {
          await removeUser(userID);
          useAlert("Success", "User removed from meal");
        },
      },
    ]
  );

  
}

const singleUserMealElement = (name, id, diet, removeUserFromMeal) => {
  return (
    <TouchableOpacity key={id} onPress={() => {
      if (removeUserFromMeal && !isMobile) {
        console.log("id: ", id);
        removeUserFromMealWrapper(removeUserFromMeal, name, id); 
      }
    }}>
      <Text  style={styles.singlePersonListTextElement}>
      {name}{diet && "\n   "}{diet && `(${diet})`}
    </Text>
    </TouchableOpacity>
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
