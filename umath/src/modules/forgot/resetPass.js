import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import ROUTES from 'src/platform/constants/routes';
import AuthController from 'src/platform/api/auth';
import LocalStyles from 'src/modules/auth/styles';
import Styles from 'assets/styles';
import { navigationWrapper } from 'src/platform/services/navigation';

class SignIn extends Component {

  state = {
    form: {
      password: '',
      confirmPass: '',
    },
  };

  get formValid() {
    const { form } = this.state;
    return form.password && form.confirmPass && form.password === form.confirmPass;
  }

  change = (name, value) => {
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  }

  submit = async () => {
    // TODO: Change it
    if (this.formValid) {
      // const { form } = this.state;
      // const result = await AuthController.Login(form);
      // if (result) {
      //   await AsyncStorage.multiSet([
      //     ['token', result.jwt],
      //     ['premium', result.isPremium ? 'true' : ''],
      //   ]);
        this.props.navigation.navigate(ROUTES.AUTH);
      } else Alert.alert('Username or Password is incorrect!!');
  }
  
  render() {
    
    return (
      <View style={LocalStyles.container}>
        <Image 
          source={require('assets/images/logo.png')}
          style={LocalStyles.logo}
        />
        <Text style={{ ...Styles.text.center, ...Styles.text.normalSize, marginBottom: 20 }}>Enter a new password</Text>
        <Input
          containerStyle={Styles.input.classic}
          placeholder="New Password (Required)"
          onChangeText={value => this.change('password', value)}
          secureTextEntry
        />
        <Input
          containerStyle={Styles.input.classic}
          placeholder="Confirm the Password (Required)"
          onChangeText={value => this.change('confirmPass', value)}
          secureTextEntry
        />
        <View style={{ ...LocalStyles.button, ...(!this.formValid ? Styles.button.disabled : {}) }}>
          <Button
            titleStyle={Styles.button.title} 
            title="Confirm"
            type="clear"
            onPress={this.submit}
          />
        </View>
      </View>
    );
  }
}

export default SignIn;