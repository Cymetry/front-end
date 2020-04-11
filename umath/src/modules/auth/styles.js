import { StyleSheet } from "react-native";

import Styles from "../../../assets/styles";
import Variables from "../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
    flex: 1,
  },

  button: {
    width: 150,
    marginTop: 30,
    ...Styles.button.classic,
  },

  suggestionText: {
    width: "100%",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 10,
    paddingRight: 10,
  },

  logo: {
    marginBottom: 10,
  },

  suggestionButton: {
    color: Variables.blue,
  },

  forgotButton: {
    display: "flex",
    flex: 1,
    textAlign: "right",
    width: "100%",
  },

  datePicker: {
    alignItems: "flex-start",
    borderWidth: 0,
    marginVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
  },
  logoTitle: {
    fontFamily: "Futura-PT",
    fontWeight: "bold",
    fontSize: 32,
  },
});

export default LocalStyles;
