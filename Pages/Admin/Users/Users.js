import Container from "../../../components/Container/Container";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  TextInput,
} from "react-native";
import DeepNavLink from "../../../components/header/DeepNavLinks/DeepNavLinks";


import { useFetch } from "../../../_helpers/useFetch";
import { useEffect, useState } from "react";

import Loader from "../../../components/Loader/Loader";
import { useIsFocused } from "@react-navigation/native";

export default function Users({ navigation, route }) {
  const cFetch = useFetch();

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const getUsers = async () => {
    setLoading(true);
    const users = await cFetch.get(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/api/users/all`
    );
    if (users) setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [isFocused]);

  return (
    <>
      <DeepNavLink
        route={route}
        navigation={navigation}
        routes={["Dashboard"]}
      />
      <Container style={styles.outerContainerStyles}>
        <Button
          title="Add User"
          onPress={() =>
            navigation.navigate("Modify User", {
              returnPaths: ["Dashboard", "Users List"],
            })
          }
        />
        <Text>Users:</Text>
        <View style={styles.scrollContainer}>
          <Loader loading={loading}>
            <>
              <Text>Search by first name:</Text>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchField}
              />
              {users
                .filter((user) =>
                  user.firstName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <View key={user.id} style={styles.singleUserContainer}>
                    <Text>
                      {user.firstName} {user.lastName}
                    </Text>
                    <View style={styles.rightButtonContainer}>
                      <Button
                        title="Meals"
                        onPress={() =>
                          navigation.navigate("IdMeals", {
                            user_id: user.id,
                            returnPaths: ["Dashboard", "Users List"],
                          })
                        }
                      />
                      <View style={{ width: 10 }} />
                      <Button
                        title="Edit"
                        onPress={() =>
                          navigation.navigate("Modify User", {
                            user_id: user.id,
                            returnPaths: ["Dashboard", "Users List"],
                          })
                        }
                      />
                    </View>
                  </View>
                ))}
            </>
          </Loader>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  singleUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    margin: 10,
  },
  searchField: {
    width: "100%",
    padding: 10,
    backgroundColor: "whitesmoke",
  },
  rightButtonContainer: {
    flexDirection: "row",
  },
});
