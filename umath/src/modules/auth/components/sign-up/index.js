import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

import ROUTES from '../../../../platform/constants/routes';
import UserController from '../../../../platform/api/user';
import AuthController from '../../../../platform/api/auth';
import LocalStyles from '../../styles';
import { ViewTypeEnum } from '../../constants/enums';
import Styles from '../../../../../assets/styles';

import isEmailValid from '../../../../utils/validateEmail';

class SignUp extends Component {
  state = {
    submited: false,
    form: {
      name: '',
      surname: '',
      password: '',
      email: '',
      dob: null,
      role: 'USER',
      school: '',
    },
    emailValid: true,
  };

  get disabled() {
    const { emailValid, form } = this.state;
    return (
      !form.dob ||
      !form.name ||
      !emailValid ||
      !form.email ||
      !form.surname ||
      !form.password
    );
  }

  change = (name, value) => {
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });

    if (name == 'email') {
      const emailValid = isEmailValid(value);
      this.setState({ emailValid });
    }
  };

  submit = async () => {
    const { form } = this.state;
    const { navigation } = this.props;
    const { lastPath, lastParams } = navigation.state?.params || {};

    const result = await UserController.Create(form);

    if (result) {
      const authResult = await AuthController.Login({
        email: form.email,
        password: form.password,
      });
      if (authResult) {
        await AsyncStorage.multiSet([
          ['token', authResult.jwt],
          ['isPremium', authResult.isPremium ? 'true' : ''],
        ]);

        navigation.navigate(
          lastPath || ROUTES.CONTENT,
          lastParams || { loggedIn: true },
        );
      } else {
        Alert.alert('Something is wrong!!');
      }
    } else {
      Alert.alert('Something is wrong!!');
    }
  };

  render() {
    const { form, emailValid } = this.state;
    const { changeViewType } = this.props;

    return (
      <View style={LocalStyles.container}>
        <Text
          style={{
            ...LocalStyles.suggestionButton,
            ...LocalStyles.logoTitle,
          }}
        >
          umath
        </Text>
        <Text style={{ ...Styles.text.center, ...Styles.text.normalSize }}>
          Register an account
        </Text>
        <Input
          value={form.name}
          onChangeText={(value) => this.change('name', value)}
          containerStyle={Styles.input.classic}
          placeholder="Name"
        />
        <Input
          value={form.surname}
          onChangeText={(value) => this.change('surname', value)}
          containerStyle={Styles.input.classic}
          placeholder="Surname"
        />
        <Input
          errorMessage={!emailValid ? 'invalid email' : undefined}
          value={form.email}
          onChangeText={(value) => this.change('email', value)}
          containerStyle={Styles.input.classic}
          autoCapitalize="none"
          placeholder="Email"
        />
        <Input
          value={form.password}
          onChangeText={(value) => this.change('password', value)}
          containerStyle={Styles.input.classic}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
        />
        <DatePicker
          style={{ ...Styles.input.classic, width: '100%' }}
          customStyles={{
            placeholderText: Styles.text.smallSize,
            dateInput: LocalStyles.datePicker,
            dateText: Styles.text.smallSize,
          }}
          mode="date"
          date={form.dob}
          locale={'en_us'}
          showIcon={false}
          cancelBtnText="Cancel"
          confirmBtnText="Confirm"
          placeholder="Date of Birth"
          onDateChange={(value) => this.change('dob', value)}
        />
        <Input
          value={form.school}
          onChangeText={(value) => this.change('school', value)}
          containerStyle={Styles.input.classic}
          placeholder="School"
        />
        <View style={LocalStyles.signUpPromptWrapper}>
          <Text style={LocalStyles.suggestionText}>
            Already a member?&nbsp;
          </Text>
          <Button
            type="clear"
            title="Sign In"
            titleStyle={LocalStyles.signUpTitle}
            onPress={() => changeViewType(ViewTypeEnum.SignIn)}
          />
        </View>
        <View
          style={{
            ...LocalStyles.button,
            ...(this.disabled ? Styles.button.disabled : {}),
          }}
        >
          <Button
            disabled={this.disabled}
            titleStyle={Styles.button.title}
            disabledTitleStyle={{ color: 'white' }}
            title="Sign up"
            type="clear"
            onPress={this.submit}
          />
        </View>
      </View>
    );
  }
}

export default SignUp;
