import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Variables from "../../assets/styles/variables";

const Section = ({ children, title, style }) => (
  <>
    {title && <Text style={styles.title}>{title}</Text>}
    <View style={[styles.wrapper, style]}>{children}</View>
  </>
);

const styles = StyleSheet.create({
  title: {
    color: Variables.gray,
    fontSize: 14,
    paddingVertical: 10,
    paddingLeft: 5,
  },
  wrapper: {
    backgroundColor: "white",
    marginBottom: 20,
  },
});

export default Section;
