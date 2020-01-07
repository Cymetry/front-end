import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Modules from './src/modules';
import ROUTES from './src/platform/constants/routes';
import Styles from './assets/styles';

const MainNavigator = createStackNavigator({
  [ROUTES.HOME]: Modules.Home,
  [ROUTES.AUTH]: Modules.Auth,
  [ROUTES.CONTENT]: {
    screen: Modules.Content,
    navigationOptions: { header: null }
  }
}, {
  initialRouteName: ROUTES.HOME,
  headerLayoutPreset: 'center',
  defaultNavigationOptions: () => Styles.navigation,
});

const App = createAppContainer(MainNavigator);

export default App;