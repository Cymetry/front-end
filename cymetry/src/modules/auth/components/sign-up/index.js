import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

import LocalStyles from '../../styles';
import { ViewTypeEnum } from '../../constants/enums';
import Styles from '../../../../../assets/styles';

const SignUp = ({ changeViewType }) => (
  <View style={LocalStyles.container}>
    <Text style={{ ...Styles.text.center, ...Styles.text.normalSize }}>Profile</Text>
    <Input
      containerStyle={Styles.input.classic}
      placeholder="First name"
    />
    <Input
      containerStyle={Styles.input.classic}
      placeholder="Last name"
    />  
    <Input
      containerStyle={Styles.input.classic}
      placeholder="Username"
    />
    <Input
      containerStyle={Styles.input.classic}
      placeholder="Password"
      secureTextEntry
    />
    <Input
      containerStyle={Styles.input.classic}
      placeholder="Confirm password"
      secureTextEntry
    />
    <Text style={LocalStyles.suggestionText}>
      Already a member?&nbsp;
      <Text
        style={LocalStyles.suggestionButton}
        onPress={() => changeViewType(ViewTypeEnum.SignIn)}
        accessibilityRole="button"
      >Sign in</Text>
    </Text>
    <View style={LocalStyles.button}>
      <Button
        title="Sign up"
        type="clear"
        titleStyle={LocalStyles.buttonTitle}
      />
    </View>
  </View>
);

export default SignUp;