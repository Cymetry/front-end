import React, { useState } from "react";
import { View, Text, Alert, AsyncStorage, Image } from "react-native";
import { Button } from "react-native-elements";
import CodeInput from "react-native-confirmation-code-input";

import ROUTES from "src/platform/constants/routes";
import AuthController from "src/platform/api/auth";
import LocalStyles from "src/modules/auth/styles";
import Styles from "assets/styles";
import Variables from "assets/styles/variables";
import { navigationWrapper } from "src/platform/services/navigation";

const Verification = ({ navigation, route }) => {
  const CELL_COUNT = 6;
  const [code, setCode] = useState("");
  const email = route.params.email;

  const submit = () => {
    if (code.length === CELL_COUNT) {
      navigation.navigate(ROUTES.FORGOT_RESET, {
        success: true,
        code,
        email,
      });
    } else {
      alert("Invalid code");
    }
  };

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
        Enter the verification code below
      </Text>
      <Text
        style={{
          ...Styles.text.center,
          ...Styles.text.smallSize,
          ...{ color: Variables.textGray },
        }}
      >
        Sent to {email}
      </Text>
      <CodeInput
        codeLength={CELL_COUNT}
        className="border-b"
        onFulfill={(code) => {
          setCode(code);
        }}
        containerStyle={{ height: 40, flex: "auto", marginBottom: 40 }}
        inactiveColor={Variables.textGray}
        activeColor="black"
      />
      <Text
        style={{
          ...LocalStyles.suggestionButton,
        }}
        accessibilityRole="button"
        onPress={navigationWrapper.navigation.goBack}
      >
        Didn't get the code?
      </Text>
      <View style={{ ...LocalStyles.button }}>
        <Button
          titleStyle={Styles.button.title}
          title="Continue"
          type="clear"
          onPress={submit}
        />
      </View>
    </View>
  );
};

export default Verification;
