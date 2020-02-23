  import { StyleSheet } from "react-native";

import Styles from "../../../../../assets/styles";
import Variables from "../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
  },

  listItem: {
    ...Styles.list.item,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Variables.gray,
  },

  button: {
    width: 150,
    marginTop: 30,
    ...Styles.button.classic,
  },
});

export default LocalStyles;