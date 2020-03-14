import { createBottomTabNavigator } from 'react-navigation-tabs';

import Learning from './pages/learning';
import Settings from './pages/settings';
import MyAccount from './pages/my-account';
import ROUTES from '../../platform/constants/routes';

export default createBottomTabNavigator({
  [ROUTES.CONTENT_LEARNING]: Learning,
  [ROUTES.CONTENT_MY_ACCOUNT]: MyAccount,
  [ROUTES.CONTENT_SETTINGS]: Settings,
}, {
  initialRouteName: ROUTES.CONTENT_LEARNING,
});