import { StyleSheet } from "react-native";

import Variables from "../variables";

export default StyleSheet.create({
  classic: {
    fontSize: Variables.smallFontSize,
    paddingVertical: 5,
    textAlign: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    overflow: "hidden",
    backgroundColor: Variables.blue,
  },

  disabled: {
    opacity: 0.5,
    backgroundColor: "#999",
  },

  title: {
    color: "white",
  },

  disabledTitle: {
    color: "black",
  },
});
