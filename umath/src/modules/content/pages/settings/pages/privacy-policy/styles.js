import { StyleSheet } from "react-native";

import Styles from "../../../../../../../assets/styles";

const LocalStyles = StyleSheet.create({
  page: {
    ...Styles.page,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  headingText: {
    fontWeight: 'bold',
    marginBottom: 20,
  },

  text: {
    marginBottom: 40,
  },
});

export default LocalStyles;