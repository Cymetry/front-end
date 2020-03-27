import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';

import ROUTES from '../../../../platform/constants/routes';
import { withNavigation } from 'react-navigation';
import AuthController from '../../../../platform/api/auth';
import { ViewTypeEnum } from '../../constants/enums';
import LocalStyles from '../../styles';
import Styles from '../../../../../assets/styles';
import { navigationWrapper } from '../../../../platform/services/navigation';

class SignIn extends Component {

  state = {
    form: {
      email: '',
      password: '',
    },
  };

  get formValid() {
    const { form } = this.state;
    return form.email && form.password;
  }

  change = (name, value) => {
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  }

  submit = async () => {
    if (this.formValid) {
      const { form } = this.state;
      const result = await AuthController.Login(form);
      if (result) {
        await AsyncStorage.multiSet([
          ['token', result.jwt],
          ['premium', result.isPremium ? 'true' : ''],
        ]);
        this.props.navigation.navigate(ROUTES.HOME);
      } else Alert.alert('Username or Password is incorrect!!');
    }
  }
  
  render() {
    const { changeViewType, signUpActive } = this.props;
    
    return (
      <View style={LocalStyles.container}>
        <Text style={{ ...Styles.text.center, ...Styles.text.normalSize }}>Profile</Text>
        <Input
          containerStyle={Styles.input.classic}
          placeholder="Username"
          onChangeText={value => this.change('email', value)}
        />
        <Input
          containerStyle={Styles.input.classic}
          placeholder="Password"
          onChangeText={value => this.change('password', value)}
          secureTextEntry
        />
        {signUpActive && <Text style={LocalStyles.suggestionText}>
          Not logined yet?&nbsp;
          <Text
            style={LocalStyles.suggestionButton}
            accessibilityRole="button"
            onPress={() => changeViewType(ViewTypeEnum.SignUp)}
          >Sign up</Text>
        </Text>}
        <View style={{ ...LocalStyles.button, ...(!this.formValid ? Styles.button.disabled : {}) }}>
          <Button
            titleStyle={Styles.button.title} 
            title="Sign in"
            type="clear"
            onPress={this.submit}
          />
        </View>
      </View>
    );
  }
}

export default SignIn;