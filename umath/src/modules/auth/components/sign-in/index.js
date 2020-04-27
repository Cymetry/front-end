import React, { Component } from "react";
import { View, Text, Alert, AsyncStorage, Image } from "react-native";
import { Input, Button } from "react-native-elements";
import { CommonActions } from "@react-navigation/native";

import ROUTES from "../../../../platform/constants/routes";
import AuthController from "../../../../platform/api/auth";
import { ViewTypeEnum } from "../../constants/enums";
import LocalStyles from "../../styles";
import Styles from "../../../../../assets/styles";
import { navigationWrapper } from "../../../../platform/services/navigation";

import isEmailValid from "../../../../utils/validateEmail";

class SignIn extends Component {
  state = {
    emailValid: true,
    form: {
      email: "",
      password: "",
    },
  };

  get formValid() {
    const { emailValid, form } = this.state;
    return emailValid && form.email && form.password;
  }

  change = (name, value) => {
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });

    if (name === "email") {
      const emailValid = isEmailValid(value);
      this.setState({ emailValid });
    }
  };

  submit = async () => {
    if (this.formValid) {
      const { form } = this.state;
      const result = await AuthController.Login(form);
      if (result) {
        await AsyncStorage.multiSet([
          ["token", result.jwt],
          ["isPremium", result.isPremium ? "true" : ""],
        ]);
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ROUTES.CONTENT,
                params: { loggedIn: true },
              },
            ],
          })
        );
      } else Alert.alert("Username or Password is incorrect!!");
    }
  };

  render() {
    const { emailValid } = this.state;
    const { changeViewType, signUpActive } = this.props;

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
        <Text
          style={{
            ...Styles.text.center,
            ...Styles.text.normalSize,
            marginBottom: 20,
          }}
        >
          Sign in to your existing account
        </Text>
        <Input
          placeholder="Email"
          autoCapitalize={false}
          containerStyle={Styles.input.classic}
          onChangeText={(value) => this.change("email", value)}
          errorMessage={!emailValid ? "invalid email" : undefined}
        />
        <Input
          secureTextEntry
          placeholder="Password"
          containerStyle={Styles.input.classic}
          onChangeText={(value) => this.change("password", value)}
        />
        <Text
          style={{
            ...LocalStyles.suggestionButton,
            ...LocalStyles.forgotButton,
          }}
          accessibilityRole="button"
          onPress={() =>
            navigationWrapper.navigation.navigate(ROUTES.FORGOT_EMAIL, {
              lastPath: ROUTES.AUTH,
            })
          }
        >
          Forgot password?
        </Text>
        {signUpActive && (
          <View style={LocalStyles.signUpPromptWrapper}>
            <Text style={LocalStyles.suggestionText}>
              Not logged in yet?&nbsp;
            </Text>
            <Button
              type="clear"
              accessibilityRole="button"
              title="Sign Up"
              titleStyle={LocalStyles.signUpTitle}
              onPress={() => changeViewType(ViewTypeEnum.SignUp)}
            />
          </View>
        )}
        <View
          style={{
            ...LocalStyles.button,
            ...(!this.formValid ? Styles.button.disabled : {}),
          }}
        >
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
