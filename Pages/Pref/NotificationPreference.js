import { StyleSheet, View, Dimensions, Text, Button } from "react-native";
import DeepNavLink from "../../components/header/DeepNavLinks/DeepNavLinks";
import Container from "../../components/Container/Container";

import { useAtom } from "jotai";
import { authAtom } from "../../_helpers/Atoms";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { useFetch } from "../../_helpers/useFetch";
import { set } from "react-hook-form";

import Checkbox from "expo-checkbox";
import { Toast } from "toastify-react-native";

export default function NotificationPreferences({ navigation, route }) {
  const cFetch = useFetch();
  const [loading, setLoading] = useState(false);
  const [emailPref, setEmailPref] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    loadPreferences();
  }, [route]);

  const loadPreferences = async () => {
    setLoading(true);
    const res = await cFetch.get(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/api/preferences`,
      null,
      {
        user_id: route.params.forUser,
      }
    );
    console.log("Preferences: ", res, route.params.forUser);
    setEmailPref(res.preferences.email);
    setName(res.firstName);
    setLoading(false);
  };

  const savePreferences = async () => {
    setLoading(true);

    const preferences = await cFetch.post(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/api/preferences`,
      {
        email: emailPref,
      },
      {
        user_id: route.params.forUser,
      }
    );
    setLoading(false);
    navigation.navigate(route.params.returnPaths[route.params.returnPaths.length - 1]);
    Toast.success("Preferences saved");
  };

  return (
    <View>
      <DeepNavLink routes={route.params.returnPaths} navigation={navigation} />

      <Container>
        <Loader loading={loading}>
          {route.params.forUser && !loading && (
            <Text style={{ fontSize: 30, color: "#3b78a1" }}>
            {name}'s Notification Preferences
          </Text>
          )}
          <Text style={styles.optionGroupLabel}>Email Preferences:</Text>
          <View style={styles.singleOptionContainer}>
            
            <Checkbox
            style={styles.checkbox}
              onValueChange={() => setEmailPref(0)}
              value={emailPref == 0}
            />
            <Text style={styles.singleOptionTextLabel}>No emails</Text>
          </View>
          <View style={styles.singleOptionContainer}>
            
            <Checkbox
              style={styles.checkbox}
              onValueChange={() => setEmailPref(1)}
              value={emailPref == 1}
            />
            <Text style={styles.singleOptionTextLabel}>Only email if not meals marked:</Text>
          </View>
          <View style={styles.singleOptionContainer}>
            
            <Checkbox
              style={styles.checkbox}
              onValueChange={() => setEmailPref(2)}
              value={emailPref == 2}
            />
            <Text style={styles.singleOptionTextLabel}>Daily meal report:</Text>
          </View>
          <View>
            <Button title="Save" onPress={savePreferences} />
          </View>
        </Loader>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  singleOptionContainer: {
    flexDirection: "row",
    marginVertical: "0.5em",
    marginHorizontal: "0",
  },
  singleOptionTextLabel: {
    fontSize: 18,
    marginLeft: "0.5em"
  },
  checkbox: {
    height: 18,
    width: 18,
  },
  optionGroupLabel: {
    fontSize: 30,
    textDecorationLine: "underline",
    color: "#3b78a1",
  }
});
