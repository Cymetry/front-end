import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

import LocalStyles from '../../styles';
import { ViewTypeEnum } from '../../constants/enums';
import Styles from '../../../../../assets/styles';

const SignIn = ({ changeViewType }) => (
  <View style={LocalStyles.container}>
    <Text style={{ ...Styles.text.center, ...Styles.text.normalSize }}>Profile</Text>
    <Input
      containerStyle={Styles.input.classic}
      placeholder="Username"
    />
    <Input
      containerStyle={Styles.input.classic}
      placeholder="Password"
      secureTextEntry
    />
    <Text style={LocalStyles.suggestionText}>
      Not logined yet?&nbsp;
      <Text
        style={LocalStyles.suggestionButton}
        accessibilityRole="button"
        onPress={() => changeViewType(ViewTypeEnum.SignUp)}
      >Sign up</Text>
    </Text>
    <View style={LocalStyles.button}>
      <Button
        title="Sign in"
        type="clear"
        titleStyle={LocalStyles.buttonTitle}
      />
    </View>
  </View>
);

export default SignIn;