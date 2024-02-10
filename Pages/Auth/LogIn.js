import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { set, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Container from "../../components/Container/Container";
import LoginSchema from "../../_helpers/Schemas/LoginSchema";

import CustomTextInput from "../../components/Forms/CTextInput";

import { useFetch } from "../../_helpers/useFetch";

import { useAtom } from "jotai";
import { authAtom } from "../../_helpers/Atoms";

export default function Login({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(LoginSchema),
  });

  const cFetch = useFetch();
  const [auth, setAuth] = useAtom(authAtom);

  const onSubmit = async (data) => {
    const res = await cFetch
      .post(`${process.env.EXPO_PUBLIC_BACKEND_API}/api/auth`, data)
      .catch((err) =>
        console.log("Error while fetching data from server: ", err)
      );

    console.log("login in: ", res);

    setAuth(res);

    navigation.navigate("Home");
  };

  return (
    <Container>
      <CustomTextInput
        control={control}
        name={"username"}
        placeholder={"username"}
        label={"username"}
        errors={errors}
      />

      <CustomTextInput
        control={control}
        name={"password"}
        placeholder={"password"}
        label={"password"}
        errors={errors}
      />

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          title="Log in"
          color="#3b78a1"
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    width: "100%",
    margin: "auto",
  },

  buttonContainer: {
    margin: 10,
  },
});
