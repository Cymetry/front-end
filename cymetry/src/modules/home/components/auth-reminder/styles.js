import { StyleSheet } from "react-native";

import Styles from "../../../../../assets/styles";

const LocalStyles = StyleSheet.create({
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