import Container from "../../../components/Container/Container";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useState, useEffect } from "react";
import { useFetch } from "../../../_helpers/useFetch";
import DeepNavLink from "../../../components/header/DeepNavLinks/DeepNavLinks";
import Loader from "../../../components/Loader/Loader";
import SingleDay from "./SingleDay";
import { ScrollView } from "react-native-gesture-handler";

export default function Meals({ navigation, route }) {
  const today = new Date();
  const TodayString = buildDayString(today);

  const [mealData, setMealData] = useState(null);
  const [day, setDay] = useState(TodayString);
  const [date, setDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const cFetch = useFetch();

  useEffect(() => {
    setDay(buildDayString(date));
  }, [date]);

  useEffect(() => {
    fetchMeals();
  }, [day]);

  const fetchMeals = async () => {
    console.log("fetching for: ", day);
    setLoading(true);
    const res = await cFetch
      .post(`${process.env.EXPO_PUBLIC_BACKEND_API}/api/day`, {
        date: day,
      })
      .catch((err) =>
        console.log("Error while fetching data from server: ", err)
      );

    setMealData(res.meals);
    setLoading(false);
  };

  return (
    <>
      <DeepNavLink
        route={route}
        navigation={navigation}
        routes={["Dashboard"]}
      />
      <Container>
        <ScrollView contentContainerStyle={styles.outerContianer}>
          <View style={styles.headerContainer}>
            <Button
              title="<"
              onPress={() => {
                const prevDay = new Date(date);
                prevDay.setDate(prevDay.getDate() - 1);
                setDate(prevDay);
              }}
            />
            <Text>
              {day} {day == TodayString && "(today)"}
            </Text>
            <Button
              title=">"
              onPress={() => {
                const nextDay = new Date(date);
                nextDay.setDate(nextDay.getDate() + 1);
                setDate(nextDay);
              }}
            />
          </View>
          <Loader loading={loading}>
            <SingleDay mealData={mealData} />
          </Loader>
        </ScrollView>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  outerContianer: {},
});

const buildDayString = (date) => {
  if (typeof date === "string") return date;

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
