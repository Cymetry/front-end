import { StyleSheet } from "react-native";

import Styles from "../../../../../../../assets/styles";
import Variables from "../../../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  video: {
    flex: 1,
    height: 200,
    marginBottom: 20,
  },

  questionWrapper: {
    backgroundColor: 'white', 
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  stepWrapper: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  stepText: {
    fontSize: Variables.smallFontSize,
    marginBottom: 10,
  },

  latexWrapper: {
    marginBottom: 20,
  },

  solution: {
    flex: 1,
    color: 'white',
    padding: 10,
    fontSize: Variables.smallFontSize,
    backgroundColor: Variables.blue,
  },

  buttonWrapper: {
    ...Styles.card.classic,
    width: '100%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  button: {
    ...Styles.button.classic,
    width: 120,
  },

  lastButtons: {
    marginVertical: 10,
    marginHorizontal: 10,
  },

  buttonTitle: {
    ...Styles.button.title,
    fontSize: 14,
  },

  disabledButtonTitle: {
    ...Styles.button.disabledTitle,
    fontSize: 14,
  }
});

export default LocalStyles;