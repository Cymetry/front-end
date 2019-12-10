import { StyleSheet } from "react-native";

import Styles from "../../../../../assets/styles";
import Variables from "../../../../../assets/styles/variables";

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
});

export default LocalStyles;