import { Fragment, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import OverviewCategoryDisplay from "./Components/Overview/OverviewCategoryDisplay";
import SingleMealList from "./Components/Meals/SingleMealList";
import MealStatusIndicator from "./Components/Status/MealsStatus";
import GenerateReportControls from "./Components/Status/generateReportControls";

export default function SingleDay({ mealData: data }) {
  if (!data) return null;

  const mealData = data.meals;
  const status = data.status;

  if (mealData.error) {
    return <Text>{mealData.error}</Text>;
  } else
    return (
      <>
        <View>
          <MealStatusIndicator mealStatus={status} />
          <GenerateReportControls mealData={mealData} />
        </View>
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
  if (!mealData || !mealTypeList) return null;
  const [open, setOpen] = useState(true);

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Text style={styles.mealCatHeader}>{header}</Text>
      </TouchableOpacity>
      {mealData &&
        open &&
        mealTypeList.map((meal, index) =>
          SingleMealList({ mealData: mealData[index], mealName: meal })
        )}
    </>
  );
};

const DayOverview = ({ mealData }) => {
  if (!mealData) return null;
  const [open, setOpen] = useState(false);
  console.log(mealData);
  if (mealData)
    return (
      <Fragment>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Text style={styles.mealCatHeader}>Overview</Text>
        </TouchableOpacity>
        {open && (
          <View style={styles.overviewOuterContainer}>
            <View style={styles.innerOverviewContainer}>
              {mealData.meals &&
                MEALS.map((meal, index) =>
                  OverviewCategoryDisplay({
                    mealCategory: meal,
                    mealData: mealData.meals[index],
                  })
                )}
              {mealData.packedMeals &&
                PACKEDMEALS.map((meal, index) =>
                  OverviewCategoryDisplay({
                    mealCategory: meal,
                    mealData: mealData.packedMeals[index],
                  })
                )}
            </View>
          </View>
        )}
      </Fragment>
    );
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
  overviewOuterContainer: {},
  innerOverviewContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
});

const MEALS = ["Breakfast", "Lunch", "Supper"];
const PACKEDMEALS = ["P1", "P2", "PS"];
