import { Text, View, StyleSheet, Dimensions } from "react-native";
import Icons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";

const screeenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const iconSize = screeenWidth > 500 ? 30 : 20;

const fontSize = screeenWidth > 500 ? 30 : 20;

export default function MealHeader({ updateState, nextUpdateTime, name }) {
  return (
    <View style={styles.HeaderContainer}>
      <View style={styles.singleContainer}>
        <Icons
          name={updateState ? "checkmark-outline" : "alert-circle-outline"}
          size={iconSize}
          color={updateState ? "green" : "red"}
        />
        <Text style={updateState ? styles.updateSaved : styles.updateNotSaved}>
          {updateState ? "Up to date" : "Not saved"}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: fontSize }}>{name}</Text>
      </View>
      <View style={styles.singleContainer}>
        {nextUpdateTime && (
          <Text style={{ fontSize: fontSize }}>{nextUpdateTime}</Text>
        )}
        <Icons name="timer-outline" size={iconSize} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: screeenWidth > 500 ? 20 : 5,
  },
  updateSaved: {
    fontSize: fontSize,
    color: "green",
  },
  updateNotSaved: {
    fontSize: fontSize,
    color: "red",
  },
  singleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
