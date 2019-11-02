import Styles from '../../../assets/styles';
import Variables from '../../../assets/styles/variables';

export const createNavigationOptions = title => ({
  title,
  headerStyle: {
    height: 60,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 1,
    borderColor: Variables.gray,
    backgroundColor: Variables.lightGray,
  },
  headerTitleStyle: {
    flex: 1,
    fontWeight: 'normal',
    ...Styles.text.normalSize,
    ...Styles.text.center,
  },
});