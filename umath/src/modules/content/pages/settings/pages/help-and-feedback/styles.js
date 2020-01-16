import { StyleSheet } from "react-native";

import Styles from "../../../../../../../assets/styles";
import Variables from "../../../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
  },

  text: {
    fontSize: Variables.normalFontSize,
    marginBottom: 10,
  },

  button: {
    width: 150,
    marginTop: 30,
    ...Styles.button.classic,
  },

  buttonTitle: {
    color: 'white',
  },

  suggestionText: {
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 10,
    paddingRight: 10,
  },

  suggestionButton: {
    color: Variables.blue,
  },
});

export default LocalStyles;