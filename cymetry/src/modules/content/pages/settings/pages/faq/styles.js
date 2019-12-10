import { StyleSheet } from "react-native";

import Styles from "../../../../../../../assets/styles";
import Variables from "../../../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    ...Styles.card.classic,
  },

  accordionHeader: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    borderColor: Variables.gray,
    borderRadius: 8,
    marginBottom: 20,
  },

  accordionHeaderText: {
    fontSize: Variables.smallFontSize,
  },
});

export default LocalStyles;