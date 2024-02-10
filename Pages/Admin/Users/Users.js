import Container from "../../../components/Container/Container";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import DeepNavLink from "../../../components/header/DeepNavLinks/DeepNavLinks";

import { useFetch } from "../../../_helpers/useFetch";
import { useEffect, useState } from "react";

import Loader from "../../../components/Loader/Loader";
import { useIsFocused } from "@react-navigation/native";

export default function Users({ navigation, route }) {
  const cFetch = useFetch();

  const [users, setUsers] = useState([]);
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Loader loading={loading}>
            {users.map((user) => (
              <View key={user.id} style={styles.singleUserContainer}>
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
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
            ))}
          </Loader>
        </ScrollView>
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
});
