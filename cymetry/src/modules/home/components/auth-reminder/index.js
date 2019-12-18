import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import ROUTES from '../../../../platform/constants/routes';
import Styles from '../../../../../assets/styles';
import LocalStyles from './styles';

const AuthReminder = memo(({ navigation }) => (
  <View style={LocalStyles.container}>
    <Text style={{ ...Styles.text.center, ...Styles.text.normalSize }}>
      Begin your personalised{"\n"}
      mathematics learning today!
    </Text>
    
    <View style={LocalStyles.button}>
      <Button
        title="Sign in"
        type="clear"
        titleStyle={LocalStyles.buttonTitle}
        onPress={() => navigation.navigate(ROUTES.AUTH)} 
      />
    </View>
  </View>
));

export default withNavigation(AuthReminder);