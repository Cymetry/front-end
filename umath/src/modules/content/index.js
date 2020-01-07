import { createBottomTabNavigator } from 'react-navigation-tabs';

import Learning from './pages/learning';
import Settings from './pages/settings';
import MyAccount from './pages/my-account';
import ROUTES from '../../platform/constants/routes';
import { createNavigationOptions } from '../../platform/services/navigation';

export default createBottomTabNavigator({
  [ROUTES.CONTENT_LEARNING]: Learning,
  [ROUTES.CONTENT_SETTINGS]: Settings,
  [ROUTES.CONTENT_MY_ACCOUNT]: MyAccount,
}, {
  initialRouteName: ROUTES.CONTENT_LEARNING,
});