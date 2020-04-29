import React, { memo } from "react";
import { View, Text, Image } from "react-native";

import Styles from "../../../../../assets/styles";
import LocalStyles from "./styles";

const AuthReminder = memo(() => (
  <View style={LocalStyles.container}>
    <View>
      <Text style={{ ...Styles.text.center, ...Styles.text.title }}>
        Welcome to Umath!
      </Text>
    </View>
    <Image
      source={require("assets/images/intro.png")}
      style={LocalStyles.image}
    />
  </View>
));

export default AuthReminder;
