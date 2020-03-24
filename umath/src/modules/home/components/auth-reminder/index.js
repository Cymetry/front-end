import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import ROUTES from '../../../../platform/constants/routes';
import Styles from '../../../../../assets/styles';
import LocalStyles from './styles';
import { navigationWrapper } from '../../../../platform/services/navigation';

const AuthReminder = memo(() => (
  <View style={LocalStyles.container}>
    <Text style={{ ...Styles.text.center, ...Styles.text.normalSize }}>
      Begin your personalised{"\n"}
      mathematics learning today!
    </Text>
    
    <View style={LocalStyles.button}>
      <Button
        titleStyle={Styles.button.title}
        title="Sign in"
        type="clear"
        onPress={() => navigationWrapper.navigation.navigate(ROUTES.AUTH, { signUp: false, lastPath: ROUTES.HOME })} 
      />
    </View>
  </View>
));

export default AuthReminder;