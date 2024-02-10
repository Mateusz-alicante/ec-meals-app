import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { useFetch } from "../../_helpers/useFetch";

const screeenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function HomeMeals({ navigation, route }) {
  const cFetch = useFetch();
  const [loading, setLoading] = useState(false);
  const [mealData, setMealData] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, [route]);

  const fetchMeals = async () => {
    setLoading(true);
    const res = await cFetch
      .get(`${process.env.EXPO_PUBLIC_BACKEND_API}/api/meals`)
      .catch((err) =>
        console.log("Error while fetching data from server: ", err)
      );

    console.log(res);
    setMealData(res.meals);
    setLoading(false);
  };

  let TodayIndex = new Date().getDay() - 1;
  if (TodayIndex < 0) TodayIndex = 0;
  const TomorrowIndex = TodayIndex + 1 > 6 ? 0 : TodayIndex + 1;
  return (
    <View style={styles.outerContainer}>
      <Loader loading={loading}>
        <View style={styles.myMealsContainer}>
          <View>
            <Text style={styles.headerText}>Meals today</Text>
            {mealData &&
              mealData[TodayIndex].map(
                (meal, index) =>
                  meal && (
                    <Text
                      style={styles.singleMeal}
                      key={`${index}${TodayIndex}`}
                    >
                      {MealCategories[index]}
                    </Text>
                  )
              )}
          </View>
          <View>
            <Text style={styles.headerText}>Meals tomorrow</Text>
            {mealData &&
              mealData[TomorrowIndex].map(
                (meal, index) =>
                  meal && (
                    <Text
                      style={styles.singleMeal}
                      key={`${index}${TomorrowIndex}`}
                    >
                      {MealCategories[index]}
                    </Text>
                  )
              )}
          </View>
        </View>
      </Loader>
      <Button title="Mark meals" onPress={() => navigation.navigate("Meals")} />
    </View>
  );
}

const styles = StyleSheet.create({
  myMealsContainer: {
    flexDirection: "row",
    justifyContent: screeenWidth > 500 ? "space-around" : "space-between",
  },
  headerText: {
    fontSize: screeenWidth > 500 ? 25 : 20,
    fontWeight: "600",
    backgroundColor: "#3b78a1",
    color: "white",
    padding: screeenWidth > 500 ? 10 : 3,
    margin: screeenWidth > 500 ? 0 : 5,
    borderRadius: "10px",
  },
  singleMeal: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    padding: 10,
  },
  outerContainer: {
    padding: 30,
  },
});

const MealCategories = [
  "Breakfast",
  "Lunch",
  "Supper",
  "P1",
  "P2",
  "PS",
  "No Meals",
  "Unmarked",
];
