import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import DeepNavLink from "../../../components/header/DeepNavLinks/DeepNavLinks";

import Container from "../../../components/Container/Container";
import { useState, useEffect } from "react";
import { useFetch } from "../../../_helpers/useFetch";

import platformAlert from "../../../_helpers/useAlert";

export default function Diets({ navigation, route }) {
  const [newDietName, setNewDietName] = useState("");
  const [diets, setDiets] = useState([]);
  const cFetch = useFetch();

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    const res = await cFetch
      .get(`${process.env.EXPO_PUBLIC_BACKEND_API}/api/diets`)
      .catch((err) =>
        console.log("Error while fetching data from server: ", err)
      );

    if (res.message == "OK") {
      setDiets(res.data);
    }
  };

  const newDiet = async () => {
    const res = await cFetch
      .post(`${process.env.EXPO_PUBLIC_BACKEND_API}/api/diets`, {
        name: newDietName,
      })
      .catch((err) =>
        console.log("Error while fetching data from server: ", err)
      );

    if (res.message == "DupKey") {
      console.log("Diet with that name already exists");
      return platformAlert(
        "Invalid name",
        "Diet with that name already exists"
      );
    }

    if (res.message == "OK") {
      console.log("Diet added");
      setNewDietName("");
      setDiets([...diets, res.diet]);
    }
  };

  const removeDiet = async (id) => {
    const res = await cFetch
      .delete(`${process.env.EXPO_PUBLIC_BACKEND_API}/api/diets`, { id })
      .catch((err) =>
        console.log("Error while fetching data from server: ", err)
      );

    console.log("Response: ", res);

    if (res.message == "OK") {
      console.log("Diet removed");
      setDiets(diets.filter((diet) => diet.id !== id));
    }
  };

  // FlatList components
  const Item = ({ diet }) => (
    <View key={diet.id} style={styles.singleDietContainer}>
      <Text style={{ fontSize: 20, textDecorationLine: "underline" }}>
        {diet.name}
      </Text>
      <Button title="Remove" onPress={() => removeDiet(diet.id)} />
    </View>
  );

  const renderItem = ({ item, index }) => <Item diet={item} />;

  return (
    <>
      <DeepNavLink
        route={route}
        navigation={navigation}
        routes={["Dashboard"]}
      />
      <Container>
        <View>
          <Text>Diets</Text>
          <View>
            <FlatList
              numColumns={2}
              data={diets}
              renderItem={renderItem}
              contentContainerStyle={{ gap: 10 }}
              columnWrapperStyle={{ gap: 20 }}
              ListEmptyComponent={DietListEmpty}
            />
          </View>
        </View>

        <View>
          <Text>Add new diet</Text>
          <View style={styles.newDietcontainer}>
            <TextInput
              onChangeText={(val) => setNewDietName(val)}
              value={newDietName}
              style={styles.addButton}
              placeholder="Diet name"
            />
            <Button onPress={newDiet} title="Add" />
          </View>
        </View>
      </Container>
    </>
  );
}

const DietListEmpty = () => {
  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Text>No diets. Add one using the form below:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: "70%",
    padding: 10,
    borderColor: "black",
  },
  newDietcontainer: {
    display: "flex",
    flexDirection: "row",
  },
  singleDietContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    textAlign: "center",
    width: "45%",
  },
  allDietsContainer: {
    display: "flex",
    flexDirection: "column",
  },
});
