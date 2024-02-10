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
  const [auth, setAuth] = useAtom(authAtom);
  const cFetch = useFetch();
  const [loading, setLoading] = useState(false);
  const [emailPref, setEmailPref] = useState(1);

  useEffect(() => {
    loadPreferences();
  }, [route]);

  const loadPreferences = async () => {
    setLoading(true);
    const res = await cFetch.get(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/api/preferences`
    );
    setEmailPref(res.preferences.email);
    setLoading(false);
  };

  const savePreferences = async () => {
    setLoading(true);
    const preferences = await cFetch.post(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/api/preferences`,
      {
        email: emailPref,
      }
    );
    setLoading(false);
    navigation.navigate("Preferences Dashboard");
    Toast.success("Preferences saved");
  };

  return (
    <View>
      <DeepNavLink routes={route.params.returnPaths} navigation={navigation} />

      <Container>
        <Loader loading={loading}>
          <Text>Email Preferences:</Text>
          <View>
            <Text>No emails</Text>
            <Checkbox
              onValueChange={() => setEmailPref(0)}
              value={emailPref == 0}
            />
          </View>
          <View>
            <Text>Only email if not meals marked:</Text>
            <Checkbox
              onValueChange={() => setEmailPref(1)}
              value={emailPref == 1}
            />
          </View>
          <View>
            <Text>Daily meal report:</Text>
            <Checkbox
              onValueChange={() => setEmailPref(2)}
              value={emailPref == 2}
            />
          </View>
          <View>
            <Button title="Save" onPress={savePreferences} />
          </View>
        </Loader>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({});
