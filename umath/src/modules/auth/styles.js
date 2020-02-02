import { StyleSheet } from "react-native";

import Styles from "../../../assets/styles";
import Variables from "../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
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

  datePicker: {
    alignItems: 'flex-start',
    borderWidth: 0,
    marginVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
  },
});

export default LocalStyles;