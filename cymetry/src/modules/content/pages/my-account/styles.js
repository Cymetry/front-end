import { StyleSheet } from "react-native";

import Variables from "../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'gray',
  },

  fullName: {
    width: '100%',
    fontSize: Variables.smallFontSize,
    textAlign: 'center',
    marginVertical: 15,
  },

  progressItem: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default LocalStyles;