import { StyleSheet } from "react-native";

import Styles from "../../../../../assets/styles";
import Variables from "../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  title: {
    height: 60,
    lineHeight: 60,
    fontSize: Variables.normalFontSize,
    textAlign: 'center',
  },
});

export default LocalStyles;