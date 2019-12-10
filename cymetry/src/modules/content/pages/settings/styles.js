import { StyleSheet } from "react-native";

import Styles from "../../../../../assets/styles";
import Variables from "../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
    marginBottom: 30,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  listItem: {
    ...Styles.list.item,
    borderTopWidth: 1,
    borderTopColor: Variables.gray,
    borderBottomWidth: 0,
  },

  nameText: {
    color: Variables.blue,
    fontSize: Variables.normalFontSize,
    textAlign: 'center',
    marginBottom: 20,
  },

  descriptionText: {
    fontSize: Variables.smallFontSize,
    textAlign: 'center',
  },
});

export default LocalStyles;