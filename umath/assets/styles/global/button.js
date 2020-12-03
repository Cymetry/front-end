import { StyleSheet } from "react-native";

import Variables from "../variables";
import { scale } from "../../../src/utils/sacling";

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

  myAccountButtonTitle: {
    color: "white",
    padding: 10,
    fontSize: scale(15),
  },

  disabledTitle: {
    color: "black",
  },
});
