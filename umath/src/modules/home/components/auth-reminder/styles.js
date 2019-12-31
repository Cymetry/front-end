import { StyleSheet } from "react-native";

import Styles from "../../../../../assets/styles";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
    marginBottom: 30,
  },

  button: {
    width: 150,
    marginTop: 40,
    ...Styles.button.classic,
  },

  buttonTitle: {
    color: 'white',
  },
});

export default LocalStyles;