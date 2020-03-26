import React from 'react';
import Learning from './pages/learning';
import Settings from './pages/settings';
import MyAccount from './pages/my-account';
import { withNavigation } from 'react-navigation';
import ROUTES from '../../platform/constants/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createTabNavigationOptions } from '../../platform/services/navigation';

const Tab = createBottomTabNavigator();

const ContentScreens = ({ route }) => {
  const { id } = route.params;
  return (
    <Tab.Navigator initialRouteName={ROUTES.CONTENT_LEARNING}>
      <Tab.Screen
        name={ROUTES.CONTENT_LEARNING}
        options={createTabNavigationOptions('Learning', 'sunny')}
      >
        {(props) => <Learning {...props} id={id} /> }
      </Tab.Screen>

      <Tab.Screen
        name={ROUTES.CONTENT_MY_ACCOUNT}
        component={MyAccount}
        options={createTabNavigationOptions('My Account', 'person')}
      />

      <Tab.Screen
        name={ROUTES.CONTENT_SETTINGS}
        component={Settings}
        options={createTabNavigationOptions('Settings', 'settings')}
      />
    </Tab.Navigator>
  );
}

export default withNavigation(ContentScreens);