import React from "react";
import { View, Text, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import AccountController from '../../../../../../platform/api/account';

import { createNavigationOptions } from "../../../../../../platform/services/navigation";
import LocalStyles from "./styles";
import Styles from "../../../../../../../assets/styles";

class HelpAndFeedback extends React.PureComponent {
  static navigationOptions = createNavigationOptions("Help & Feedback");
  
  state = {
    name: '',
    text: '',
    email: '',
    school: '',
    telephone: '',
  };

  submit = () => {
    AccountController.Help({...this.state});
    Alert.alert(
      "Thank you for submitting a feedback. We will make sure to get back to you as soon as possible",
      "",
      [{ text: "done" }]
    );
  };

  onInputChange = (key, value) => this.setState({ [key]: value });

  render() {
    return (
      <ScrollView style={Styles.page}>
        <View style={LocalStyles.container}>
          <Text style={LocalStyles.text}>
            If you need any help, please refer to FAQ. However, if you cannot
            find an answer to your question, feel free to contact us and we will
            get back to you as soon as possible.
          </Text>
          <Input
            containerStyle={Styles.input.classic}
            placeholder="Name"
            onChangeText={(value) => this.onInputChange('name', value)} />
          <Input
            containerStyle={Styles.input.classic}
            placeholder="Phone number"
            onChangeText={(value) => this.onInputChange('telephone', value)}
          />
          <Input
            containerStyle={Styles.input.classic}
            placeholder="Email"
            onChangeText={(value) => this.onInputChange('email', value)}
          />
          <Input
            containerStyle={Styles.input.classic}
            placeholder="School"
            onChangeText={(value) => this.onInputChange('school', value)}
          />
          <Input
            containerStyle={Styles.input.classic}
            placeholder="Message"
            onChangeText={(value) => this.onInputChange('text', value)}
          />
          <View style={LocalStyles.button}>
            <Button
              onPress={this.submit}
              titleStyle={Styles.button.title}
              title="Send"
              type="clear"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default HelpAndFeedback;
