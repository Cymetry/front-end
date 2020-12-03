import { StyleSheet } from "react-native";

import Variables from "../variables";

export default StyleSheet.create({
  title: {
    fontSize: Variables.titleFontSize,
    color: Variables.blue,
    marginBottom: 10,
  },

  normalSize: {
    fontSize: Variables.normalFontSize,
  },

  smallSize: {
    fontSize: Variables.smallFontSize,
  },

  smallestSize: {
    fontSize: Variables.smallestFontSize,
  },

  center: {
    textAlign: 'center',
  },
});