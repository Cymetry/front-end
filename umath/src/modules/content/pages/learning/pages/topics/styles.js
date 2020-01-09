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

  title: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  completeText: {
    color: Variables.gray,
    fontSize: Variables.smallestFontSize,
  },
});

export default LocalStyles;