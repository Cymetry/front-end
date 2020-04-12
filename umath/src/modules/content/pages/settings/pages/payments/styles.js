import { StyleSheet } from "react-native";
import Variables from "../../../../../../../assets/styles/variables";
import Styles from "../../../../../../../assets/styles";

const LocalStyles = StyleSheet.create({
  headerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  planTitle: {
    marginVertical: 5,
    color: Variables.vividBlue,
    fontSize: 20,
  },
  infoText: {
    color: Variables.gray,
    marginVertical: 5,
    fontSize: 18,
  },
  listItem: {
    ...Styles.list.item,
    borderTopWidth: 1,
    borderTopColor: Variables.gray,
    borderBottomWidth: 0,
  },
  itemsWrapper: {
    flex: 1,
    marginBottom: 0,
  },
});

export default LocalStyles;
