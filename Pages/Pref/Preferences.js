import { StyleSheet, View, Dimensions, Text, Button } from "react-native";
import * as Linking from "expo-linking";
import Container from "../../components/Container/Container";

import { useAtom } from "jotai";
import { authAtom } from "../../_helpers/Atoms";

export default function Preferences({ navigation, route }) {
  const [auth, setAuth] = useAtom(authAtom);

  return (
    <Container>
      <View>
        <Text>Preferences</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Log Out"
            onPress={() => {
              setAuth({});
              navigation.navigate("Home");
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Edit account"
            onPress={() =>
              navigation.navigate("Edit Account", {
                returnPaths: ["Preferences Dashboard"],
                token: auth.token,
              })
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Preferences"
            onPress={() =>
              navigation.navigate("Notification Preferences", {
                returnPaths: ["Preferences Dashboard"],
              })
            }
          />
        </View>
      </View>
      <View style={styles.bottomInfoContainerOuter}>
        <View style={styles.bottomInfoContainerInner}>
          <Text>App by </Text>
          <Text
            onPress={() => Linking.openURL(process.env.EXPO_PUBLIC_DEV_URL)}
            style={{ textDecorationLine: "underline" }}
          >
            Mateusz Kazimierczak
          </Text>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
  },
  bottomInfoContainerOuter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  bottomInfoContainerInner: {
    flexDirection: "row",
  },
});
