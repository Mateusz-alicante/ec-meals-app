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
  const [date, setDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const cFetch = useFetch();

  useEffect(() => {
    fetchMeals();
  }, [date]);

  const fetchMeals = async () => {
    console.log("fetching for: ", date);
    setLoading(true);
    const res = await cFetch
      .post(`${process.env.EXPO_PUBLIC_BACKEND_API}/api/day`, {
        date: buildDayString(date),
      })
      .catch((err) =>
        console.log("Error while fetching data from server: ", err)
      );
    console.log("res: ", res);
    setMealData(res);
    setLoading(false);
  };

  return (
    <>
      <DeepNavLink
        route={route}
        navigation={navigation}
        routes={["Dashboard"]}
      />
      <Container style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.outerContianer}
          style={{ flex: 1 }}
        >
          <View>
            <View style={styles.headerContainer}>
              <Button
                title="<"
                onPress={() => {
                  const prevDay = new Date(date);
                  prevDay.setDate(prevDay.getDate() - 1);
                  setDate(prevDay);
                }}
              />
              <Text style={styles.dayText}>{UIDateString(date)}</Text>
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
              <SingleDay mealData={mealData} date={date} fetch={fetchMeals} />
            </Loader>
          </View>
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
  dayText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const buildDayString = (date) => {
  if (typeof date === "string") return date;

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const UIDateString = (date) => {
  // Get the day of the week:
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[date.getDay()];

  // Get the date:
  const dayDate = date.getDate();

  // Check if today
  const today = new Date();
  let isToday = false;
  if (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  )
    isToday = true;

  return `${day} ${dayDate} ${isToday ? "(Today)" : ""}`;
};
