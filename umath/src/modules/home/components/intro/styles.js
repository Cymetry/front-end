import { StyleSheet } from "react-native";

import Styles from "../../../../../assets/styles";
import Variables from "../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
    marginTop: 35,
    marginHorizontal: 40,
    backgroundColor: "transparent"
  },
  button: {
    width: 150,
    marginTop: 10,
    ...Styles.button.classic
  },
  subTitle: {
    ...Styles.text.center,
    ...Styles.text.smallSize,
    color: Variables.textGray
  },
  image: {
    marginTop: 57,
    marginBottom: 68,
    width: 205,
    height: 203
  },
  skipButton: {
    marginTop: 40
  }
});

export default LocalStyles;
