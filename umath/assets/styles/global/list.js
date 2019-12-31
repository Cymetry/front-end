import { StyleSheet } from "react-native";

import Variables from '../variables';

export default StyleSheet.create({
  container: {
    width: '100%',
  },

  item: {
    borderTopWidth: 1,
    borderTopColor: Variables.gray,
    paddingVertical: 10,
  },
})