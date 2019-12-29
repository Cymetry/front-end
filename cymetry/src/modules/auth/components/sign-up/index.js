import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

import UserController from '../../../../platform/api/user';
import LocalStyles from '../../styles';
import { ViewTypeEnum } from '../../constants/enums';
import Styles from '../../../../../assets/styles';

class SignUp extends Component {

  state = {
    submited: false,
    form: {
      name: '',
      surname: '',
      password: '',
      confirmPassword: '',
      email: '',
      dob: null,
      role: "USER",
    },
  };

  get disabled() {
    const { form } = this.state;
    return !form.name || !form.surname || !form.password || !form.email || !form.dob;
  };
  
  change = (name, value) => {
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  }

  submit = async () => { 
    const { form } = this.state;
    const { changeViewType } = this.props;

    if (!this.disabled && form.password === form.confirmPassword) {
      const result = await UserController.Create(form);
      result && changeViewType(ViewTypeEnum.SignIn);
    }
  };
  
  render() {
    const { form, submited } = this.state;
    const { changeViewType } = this.props;

    return (
      <View style={LocalStyles.container}>
        <Text style={{ ...Styles.text.center, ...Styles.text.normalSize }}>Profile</Text>
        <Input
          value={form.name}
          onChangeText={value => this.change('name', value)}
          containerStyle={Styles.input.classic}
          placeholder="Name"
        />
        <Input
          value={form.surname}
          onChangeText={value => this.change('surname', value)}
          containerStyle={Styles.input.classic}
          placeholder="Surname"
        />  
        <Input
          value={form.email}
          onChangeText={value => this.change('email', value)}
          containerStyle={Styles.input.classic}
          placeholder="Email"
        />
        <DatePicker
          style={{ width: '100%' }}
          customStyles={{
            placeholderText: Styles.text.smallSize,
            dateInput: LocalStyles.datePicker,
            dateText: Styles.text.smallSize,
          }}
          date={form.dob}
          mode="date"
          onDateChange={value => this.change('dob', value)}
          showIcon={false}
          placeholder="Date of Birth"
        />
        <Input
          value={form.password}
          onChangeText={value => this.change('password', value)}
          containerStyle={Styles.input.classic}
          placeholder="Password"
          secureTextEntry
        />
        <Input
          errorMessage={submited && form.password !== form.confirmPassword ? 'Password and confirm password are not same' : ''}
          value={form.confirmPassword}
          onChangeText={value => this.change('confirmPassword', value)}
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
        <View style={{ ...LocalStyles.button, ...(this.disabled ? Styles.button.disabled : {}) }}>
          <Button
            disabled={this.disabled}
            title="Sign up"
            type="clear"
            onPress={this.submit}
            titleStyle={LocalStyles.buttonTitle}
          />
        </View>
      </View>
    );
  }
};

export default SignUp;