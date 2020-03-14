import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Modules from './src/modules';
import ROUTES from './src/platform/constants/routes';
import Styles from './assets/styles';

// const MainNavigator = createStackNavigator({
//   [ROUTES.HOME]: Modules.Home,
//   [ROUTES.AUTH]: Modules.Auth,
//   [ROUTES.CONTENT]: {
//     screen: Modules.Content,
//     navigationOptions: { header: null }
//   }
// }, {
//   initialRouteName: ROUTES.HOME,
//   headerLayoutPreset: 'center',
//   defaultNavigationOptions: () => Styles.navigation,
// });

const Stack = createStackNavigator();

const App = createAppContainer(MainNavigator);

class App extends Component {

  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator headerLayoutPreset="center" defaultNavigationOptions={() => Styles.navigation} initialRouteName={ROUTES.HOME}>
          <Stack.Screen name={ROUTES.HOME} component={Modules.Home} />
          <Stack.Screen name={ROUTES.AUTH} component={Modules.Auth} />
          <Stack.Screen name={ROUTES.CONTENT} component={Modules.Content} navigationOptions={{ header: null }}  />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;