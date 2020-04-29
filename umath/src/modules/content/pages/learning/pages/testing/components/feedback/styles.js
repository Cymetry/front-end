import { StyleSheet } from "react-native";

import Variables from "../../../../../../../../../assets/styles/variables";
import Styles from "../../../../../../../../../assets/styles";

const FeedbackPageStyles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  percent: {
    color: Variables.blue,
    fontSize: Variables.titleFontSize,
    padding: 10,
  },
  sentimentText: {
    fontSize: Variables.normalFontSize,
    padding: 10,
  },
  button: {
    ...Styles.button.classic,
    width: 200,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    padding: 15,
  },
  resultTextWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FeedbackPageStyles;
