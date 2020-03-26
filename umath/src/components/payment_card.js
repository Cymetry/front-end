import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

import Variables from "../../assets/styles/variables";

const PaymentCard = ({ title, description, isSelected = false, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonCard, isSelected && styles.buttonCard_selected]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}> {title} </Text>
        <Text style={styles.description}> {description} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonCard: {
    alignItems: "center",
    backgroundColor: Variables.lightGray,
    width: 130,
    height: 150,
    borderRadius: 8,
    justifyContent: "flex-start",
    margin: 6.5
  },
  buttonCard_selected: {
    borderWidth: 3,
    borderColor: Variables.vividBlue
  },
  textContainer: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    color: Variables.vividBlue,
    fontSize: 24,
    paddingVertical: 20
  },
  description: {
    color: Variables.gray,
    fontSize: 18,
    textAlign: "center"
  }
});

export default PaymentCard;
