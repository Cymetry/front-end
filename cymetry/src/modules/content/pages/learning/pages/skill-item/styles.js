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
    paddingVertical: 20,
  },

  button: {
    ...Styles.button.classic,
    width: 150,
  },

  buttonTitle: {
    color: 'white',
  },
});

export default LocalStyles;