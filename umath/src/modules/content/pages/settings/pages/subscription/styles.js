import { StyleSheet } from "react-native";

import Variables from "../../../../../../../assets/styles/variables";
import Styles from "../../../../../../../assets/styles";

const styles = StyleSheet.create({
  content_wrapper: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  scrollview_wrapper: {
    flexGrow: 1,
  },
  text: {
    fontSize: 24,
    color: Variables.textGray,
    textAlign: "center",
    paddingHorizontal: 50,
  },
  card_wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 15,
  },
  button: {
    ...Styles.button.classic,
    width: 278,
    height: 60,
    backgroundColor: Variables.vividBlue,
  },
});

export default styles;
