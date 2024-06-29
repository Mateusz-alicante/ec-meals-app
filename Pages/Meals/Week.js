// This file is a mess. If you are reading this, please fix it.

import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Button,
  ScrollView,
} from "react-native";


import React from "react";

import { useFocusEffect } from "@react-navigation/native";

import { Table, TableWrapper, Row, Rows } from "react-native-reanimated-table";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";

import Loader from "../../components/Loader/Loader";

import { useFetch } from "../../_helpers/useFetch";

import MealHeader from "./MealHeader";
import useTimer from "../../_helpers/useTimer";

const screeenWidth = Dimensions.get("window").width;

const screenHeight = Dimensions.get("window").height;

const constructWarningMessage = (time) => {
  const min = `${Math.floor((time / (1000 * 60 * 60)) % 24)}`.padStart(2, 0);
  const sec = `${Math.floor((time / 1000 / 60) % 60)}`.padStart(2, 0);

  return `Come back in ${min}:${sec}`;
};

const DaysOfTheWeek = [
  "Meals",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MealTypes =
  screeenWidth > 500
    ? ["Breakfast", "Lunch", "Supper", "P1", "P2", "PS", "No Meals"]
    : ["B", "L", "S", "P1", "P2", "PS", "X"];

const DayCheckbox = ({
  data,
  setData,
  indexDay,
  indexType,
  setUpdateState,
  disabledDay,
}) => {
  let isDisabled;
  if (indexType < 3 || indexType == MealTypes.length - 1) {
    isDisabled = indexDay == disabledDay;
  }
  if (indexType >= 3 && !isDisabled) {
    isDisabled = indexDay == (disabledDay + 1) % 7;
  }

  const toggleValue = () => {
    setUpdateState(false);
    setData((prev) => {
      const newData = [...prev];

      if (indexType == MealTypes.length - 1) {
        // If No meals is selected, unselect everything else
        newData[indexDay] = newData[indexDay].map(() => false);
        newData[indexDay][indexType] = true;
        return newData;
      } else {
        // Otherwise just toggle the value
        newData[indexDay][indexType] = !newData[indexDay][indexType];
        newData[indexDay][MealTypes.length - 1] = false;
        return newData;
      }
    });
  };

  getBackgroundColor = () => {
    if (isDisabled) {
      return "red";
    } else if (indexType == MealTypes.length - 1) {
      return "#ffd063";
    } else {
      return undefined;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5,
        backgroundColor: getBackgroundColor(),
      }}
    >
      <Checkbox
        style={
          screeenWidth > 500 ? styles.checkboxDesktop : styles.checkboxMobile
        }
        // disabled={isDisabled}
        value={data[indexDay][indexType]}
        onValueChange={toggleValue}
        color={"#3b78a1"}
      />
    </View>
  );
};

export default function Week({ user_id }) {
  const [mealData, setMealData] = useState(
    DaysOfTheWeek.slice(1).map((day) => MealTypes.map((meal) => false))
  );
  const [firstName, setFirstName] = useState("");
  const [disabledDay, setDisabledDay] = useState(undefined);

  const [loading, setLoading] = useState(true);
  const [updateState, setUpdateState] = useState(false);
  const cFetch = useFetch();

  const [timerText, warning, setTimer] = useTimer({
    nextCall: () => fetchMeals(),
  });

  const fetchMeals = async () => {
    setLoading(true);

    const res = await cFetch
      .get(`${process.env.EXPO_PUBLIC_BACKEND_API}/api/meals`, null, {
        forUser: user_id,
      })
      .catch((err) =>
        console.log("Error while fetching data from server: ", err)
      );

    console.log("res: ", res);

    setMealData(res.meals);
    setTimer(res.updateTime);
    setUpdateState(true);
    setLoading(false);
    setDisabledDay(user_id ? undefined : res.disabledDay);
    setFirstName(res.firstName);
  };

  const TableData = MealTypes.map((day, indexType) =>
    [day].concat(
      DaysOfTheWeek.slice(1).map((val, indexDay) => (
        <DayCheckbox
          data={mealData}
          setData={setMealData}
          indexDay={indexDay}
          indexType={indexType}
          setUpdateState={setUpdateState}
          disabledDay={disabledDay}
        />
      ))
    )
  );

  const SaveData = async () => {
    setLoading(true);
    const res = await cFetch
      .post(
        `${process.env.EXPO_PUBLIC_BACKEND_API}/api/meals`,
        { meals: mealData },
        { forUser: user_id }
      )
      .catch((err) =>
        console.log("Error while fetching data from server: ", err)
      );
    setUpdateState(true);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("API: ", process.env.EXPO_PUBLIC_BACKEND_API);
      fetchMeals();
    }, [])
  );

  return (
    <>
      <Loader
        loading={loading}
        warningIconName={"cloud-upload-outline"}
        warning={warning}
        warningMessage={timerText}
      >
        <MealHeader
          updateState={updateState}
          nextUpdateTime={timerText}
          name={firstName}
        />
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={DaysOfTheWeek}
              style={styles.head}
              textStyle={styles.headerText}
            />
            <Rows
              data={TableData}
              textStyle={styles.text}
              style={styles.commonRow}
            />
          </Table>
          <View style={{ margin: 20 }}>
            <Button title="Submit" onPress={SaveData} />
          </View>
        </View>
      </Loader>
    </>
  );
}

const TEXT_LENGTH = 100;
const TEXT_HEIGHT = 30;
const OFFSET = TEXT_LENGTH / 2 - TEXT_HEIGHT / 2;

const styles = StyleSheet.create({
  commonRow: { height: screeenWidth > 500 ? 60 : 50 },
  head: { height: screeenWidth > 500 ? 30 : 100, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  headerText: {
    margin: 6,
    padding: 5,
    fontWeight: "bold",
    transform: screeenWidth < 500 && [
      { rotate: "-90deg" },
      { translateX: 0 },
      { translateY: -OFFSET },
    ],
    width: TEXT_LENGTH,
    height: TEXT_HEIGHT,
  },
  noMealsRow: {
    backgroundColor: "red",
  },

  checkboxDesktop: {
    height: 40,
    width: 40,
  },
  checkboxMobile: {
    height: "80%",
    width: "80%",
  },
});
