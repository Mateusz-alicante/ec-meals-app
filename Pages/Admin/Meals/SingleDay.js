import { Fragment, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import OverviewCategoryDisplay from "./Components/Overview/OverviewCategoryDisplay";
import SingleMealList, {DetailedMealList} from "./Components/Meals/SingleMealList";
import MealStatusIndicator from "./Components/Status/MealsStatus";
import UnmarkedList from "./Components/Meals/UnmarkedList";
import AddUsers from "./Components/Functional/AddUsers";
import AddGuests from "./Components/Functional/AddGuests";
import GenerateReport from "./Components/Functional/GenerateReport";

export default function SingleDay({ mealData: data, date, fetch }) {
  if (!data) return null;

  const mealData = data.meals;
  const status = data.status;
  const allUsers = data.allUsers;

  if (mealData.error) {
    return <Text>{mealData.error}</Text>;
  } else
    return (
      <View style={{marginBottom: 30}}>
        <View style={styles.topContainer}>
          <MealStatusIndicator mealStatus={status} />
          <GenerateReport data={data} date={date} />
        </View>
        <DayOverview mealData={mealData} />

        <Meals
          mealData={mealData.meals}
          mealTypeList={MEALS}
          header={"Meals"}
          detailed={true}
          allUsers={allUsers}
        />

        <Meals
          mealData={mealData.packedMeals}
          mealTypeList={PACKEDMEALS}
          header={"Packed Meals"}
        />

          <UnmarkedList
            unmarked={mealData.unmarked}
            noMeals={mealData.noMeals}
          />

        {status == "final" && <AddUsers date={date} fetch={fetch} />}

        <AddGuests date={date} fetch={fetch} />
      </View>
    );
}

const Meals = ({ mealData, mealTypeList, header, detailed=false, allUsers=null }) => {
  if (!mealData || !mealTypeList) return null;
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Text style={styles.mealCatHeader}>{header}</Text>
      </TouchableOpacity>
      {mealData &&
        open &&
        mealTypeList.map((meal, index) =>
          {if (detailed) {
            return DetailedMealList({
              mealData: mealData[index],
              allUsers: allUsers,
              mealName: meal,
              index: index,
            });
          } else {
            return SingleMealList({
              mealData: mealData[index],
              mealName: meal,
              index: index,
            });
          }}
        )}
    </View>
  );
};

const DayOverview = ({ mealData }) => {
  if (!mealData) return null;
  const [open, setOpen] = useState(true);
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
                    index,
                  })
                )}
              {mealData.packedMeals &&
                PACKEDMEALS.map((meal, index) =>
                  OverviewCategoryDisplay({
                    mealCategory: meal,
                    mealData: mealData.packedMeals[index],
                    index: index + 3,
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
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const MEALS = ["Breakfast", "Lunch", "Supper"];
const PACKEDMEALS = ["P1", "P2", "PS"];
