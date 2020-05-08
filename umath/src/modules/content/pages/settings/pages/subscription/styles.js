import { StyleSheet } from "react-native";

import Variables from "../../../../../../../assets/styles/variables";
import Styles from "../../../../../../../assets/styles";

const styles = StyleSheet.create({
  content_wrapper: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  scrollview_wrapper: {
    flexGrow: 1,
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: "center",
    paddingHorizontal: 50,
  },
  subtext: {
    fontSize: 10,
    color: 'black',
    textAlign: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  card_wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 15,
  },
  button: {
    width: 278,
    height: 60,
    backgroundColor: Variables.vividBlue,
    paddingVertical: 5,
    borderRadius: 8,
  },
  activityIndicatorWrapper: {
    flex: 1,
    height: 330,
    justifyContent: "center",
  },
});

export default styles;
