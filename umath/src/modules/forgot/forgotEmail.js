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
      email: '',
    },
  };

  get formValid() {
    const { form } = this.state;
    return form.email;
  }

  change = (name, value) => {
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  }

  submit = async () => {
    // TODO: Change it
    if (this.formValid) {
      const { form } = this.state;
      const result = await AuthController.ForgotEmail(form);
      if (result) {
        this.props.navigation.navigate(ROUTES.FORGOT_VERIFY, { email: form.email });
      }
    } else Alert.alert('Username or Password is incorrect!!');
  }
  
  render() {
    
    return (
      <View style={LocalStyles.container}>
        <Image 
          source={require('assets/images/logo.png')}
          style={LocalStyles.logo}
        />
        <Text style={{ ...Styles.text.center, ...Styles.text.normalSize, marginBottom: 20 }}>Enter your email address</Text>
        <Input
          containerStyle={Styles.input.classic}
          placeholder="Email (Required)"
          onChangeText={value => this.change('email', value)}
        />
        <View style={{ ...LocalStyles.button, ...(!this.formValid ? Styles.button.disabled : {}) }}>
          <Button
            titleStyle={Styles.button.title} 
            title="Continue"
            type="clear"
            onPress={this.submit}
          />
        </View>
      </View>
    );
  }
}

export default SignIn;