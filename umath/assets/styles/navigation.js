import Variables from "./variables";
import text from "./global/text";

export default {
  headerStyle: {
    height: 80,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 1,
    borderColor: Variables.gray,
    backgroundColor: Variables.lightGray,
  },
  headerTitleStyle: {
    fontWeight: 'normal',
    marginBottom: 7,
    ...text.normalSize,
  }
};