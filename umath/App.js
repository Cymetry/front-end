import React, { Component, createRef } from 'react';
// import { createAppContainer } from 'react-navigation';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import Modules from './src/modules';
import ROUTES from './src/platform/constants/routes';
import Styles from './assets/styles';
import { navigationWrapper, createNavigationOptions } from './src/platform/services/navigation';
import Constants from './src/platform/constants';

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

class App extends Component {

  state = {
    rendered: false,
  };

  navigationRef = createRef();

  componentDidMount() {
    if (this.navigationRef.current) {
      navigationWrapper.navigation = this.navigationRef.current;
      this.setState({ rendered: true });
    }
  }

  render() {
    const { rendered } = this.state;

    return <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={this.navigationRef}>
        {rendered && <Stack.Navigator headerLayoutPreset="center" screenOptions={() => Styles.navigation} initialRouteName={ROUTES.HOME}>
          <Stack.Screen
            name={ROUTES.HOME}
            component={Modules.Home}
            options={createNavigationOptions(Constants.ProjectTitle)}
          />

          <Stack.Screen
            name={ROUTES.AUTH}
            component={Modules.Auth}
            options={{
              title: 'Welcome',
              headerLeft: () => <HeaderBackButton
                onPress={() => navigationWrapper.navigation.navigate(ROUTES.HOME)}
              />,
            }}
          />

          <Stack.Screen
            name={ROUTES.CONTENT}
            component={Modules.Content}
            options={{ headerShown: false  }}
          />
        </Stack.Navigator>}
      </NavigationContainer>
    </>;
  }
}

export default App;