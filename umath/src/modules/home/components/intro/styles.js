import { StyleSheet } from "react-native";

import Styles from "../../../../../assets/styles";
import Variables from "../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'space-around'
  },
  button: {
    ...Styles.button.classic,
    marginTop: 5,
    width: 150,
  },
  subTitle: {
    ...Styles.text.center,
    ...Styles.text.smallSize,
    color: Variables.textGray
  },
  image: {
    height: '30%',
    resizeMode: 'contain'
  }
});

export default LocalStyles;
