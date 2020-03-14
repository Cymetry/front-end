import { StyleSheet } from "react-native";

import Styles from "../../../../../../../assets/styles";
import Variables from "../../../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  listItem: {
    ...Styles.list.item,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Variables.gray,
  },

  learningCompleteText: {
    fontSize: Variables.smallFontSize,
    color: Variables.blue,
  },

  button: {
    ...Styles.button.classic,
    width: 120,
    marginTop: 20,
  },

  buttonTitle: {
    ...Styles.button.title,
    fontSize: 16,
  },

  completeContainer: {
    ...Styles.card.classic,
    flex: 1,
    marginBottom: 40,
    paddingVertical: 20,
  },
});

export default LocalStyles;