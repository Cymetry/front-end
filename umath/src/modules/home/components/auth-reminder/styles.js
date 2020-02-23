import { StyleSheet } from "react-native";

import Styles from "../../../../../assets/styles";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
    marginBottom: 40,
  },

  button: {
    width: 150,
    marginTop: 40,
    ...Styles.button.classic,
  },
});

export default LocalStyles;