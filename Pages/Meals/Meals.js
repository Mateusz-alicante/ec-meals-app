import { StyleSheet, View, Dimensions, Text, ScrollView } from "react-native";
import Container from "../../components/Container/Container";
import DeepNavLink from "../../components/header/DeepNavLinks/DeepNavLinks";
import Week from "./Week";

export default function Meals({ children, style, route, navigation }) {
  user_id = route.params?.user_id;
  returnPaths = route.params?.returnPaths;
  return (
    <>
      {returnPaths && (
        <DeepNavLink
          route={route}
          navigation={navigation}
          routes={returnPaths}
        />
      )}
      <Container wide={true} maxHeight={false}>
        <Week user_id={user_id} />
      </Container>
    </>
  );
}
