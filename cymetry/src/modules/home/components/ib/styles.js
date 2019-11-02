import Styles from "../../../../../assets/styles";
import Variables from "../../../../../assets/styles/variables";

const LocalStyles = {
  container: {
    ...Styles.card.classic,
    marginTop: 30,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  title: {
    height: 50,
    paddingHorizontal: 10,
    lineHeight: 50,
    fontSize: Variables.normalFontSize,
    textAlign: 'center',
  },
  listContainer: {
    width: '100%',
  },
};

export default LocalStyles;