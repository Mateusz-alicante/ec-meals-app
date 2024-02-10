import { Fragment, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const screeenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function SingleDay({ mealData }) {
  if (!mealData) return null;
  if (mealData.error) {
    return <Text>{mealData.error}</Text>;
  } else
    return (
      <>
        <DayOverview mealData={mealData} />

        <Meals
          mealData={mealData.meals}
          mealTypeList={MEALS}
          header={"Meals"}
        />

        <Meals
          mealData={mealData.packedMeals}
          mealTypeList={PACKEDMEALS}
          header={"Packed Meals"}
        />
      </>
    );
}

const Meals = ({ mealData, mealTypeList, header }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Text style={styles.mealCatHeader}>{header}</Text>
      </TouchableOpacity>
      {mealData &&
        open &&
        mealTypeList.map((meal, index) => (
          <Fragment key={index}>
            <Text style={styles.mealTypeHeader}>{meal}</Text>
            {mealData[index].map(({ name, id }) => {
              return <Text key={id}>{name}</Text>;
            })}
          </Fragment>
        ))}
    </>
  );
};

const DayOverview = ({ mealData }) => {
  const [open, setOpen] = useState(true);
  if (mealData)
    return (
      <Fragment>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Text style={styles.mealCatHeader}>Overview</Text>
        </TouchableOpacity>
        {open && (
          <View style={styles.overviewOuterContainer}>
            <View>
              {MEALS.map((meal, index) => (
                <View key={index} style={styles.singleOverviewContainer}>
                  <Text style={styles.mealTypeHeader}>{meal}: </Text>
                  <Text>{getNSignedUp(mealData.meals[index])}</Text>
                </View>
              ))}
            </View>

            <View>
              {PACKEDMEALS.map((meal, index) => (
                <View key={index} style={styles.singleOverviewContainer}>
                  <Text style={styles.mealTypeHeader}>{meal}: </Text>
                  <Text>{getNSignedUp(mealData.packedMeals[index])}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Fragment>
    );
};

const getNSignedUp = (day) => {
  return day.reduce((acc, meal) => {
    if (meal) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
};

const styles = StyleSheet.create({
  mealCatHeader: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
    backgroundColor: "#3b78a1",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  mealTypeHeader: {
    fontSize: 20,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
  singleOverviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  overviewOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

const MEALS = ["Breakfast", "Lunch", "Supper"];
const PACKEDMEALS = ["P1", "P2", "PS"];
