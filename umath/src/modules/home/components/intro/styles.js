import { StyleSheet } from "react-native";

import Styles from "../../../../../assets/styles";
import Variables from "../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
    marginVertical: 80,
    marginHorizontal: 40,
    backgroundColor: 'transparent', 
  },
  button: {
    width: 150,
    marginTop: 10,
    ...Styles.button.classic,
  },
  subTitle: {
    ...Styles.text.center, 
    ...Styles.text.smallSize,
    color: Variables.textGray, 
  },
  image: {
      marginVertical: 60
  },
  skipButton: {
      marginTop: 40,
  },
});

export default LocalStyles;