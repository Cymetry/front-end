import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import Styles from '../../../../../assets/styles';

import LocalStyles from './styles';

const AuthReminder = () => (
  <View style={Styles.card.classic}>
    <Text style={{ ...Styles.text.center, ...Styles.text.normalSize }}>
      Begin your personalised{"\n"}
      mathematics learning today!
    </Text>
    
    <View style={LocalStyles.button}>
      <Button title="Sign in" type="clear" titleStyle={{ color: 'white' }} />
    </View>
  </View>
);

export default AuthReminder;