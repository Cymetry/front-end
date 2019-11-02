import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Modules from './src/modules';
import ROUTES from './src/platform/constants/routes';

const MainNavigator = createStackNavigator({
  [ROUTES.HOME]: { screen: Modules.Home },
});

const App = createAppContainer(MainNavigator);

export default App;