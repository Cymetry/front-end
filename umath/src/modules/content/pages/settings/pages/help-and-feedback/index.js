import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import { createNavigationOptions } from "../../../../../../platform/services/navigation";
import LocalStyles from './styles';
import Styles from '../../../../../../../assets/styles';

class HelpAndFeedback extends React.PureComponent {

  static navigationOptions = createNavigationOptions('Help & Feedback');

  render() {
    return (
      <ScrollView style={Styles.page}>
        <View style={LocalStyles.container}>
          <Text style={LocalStyles.text}>If you need any help, please refer to FAQ. However, if you cannot find an answer to your question, feel free to contact us and we will get back to you as soon as possible.</Text>
          <Input
            containerStyle={Styles.input.classic}
            placeholder="Name"
          />
          <Input
            containerStyle={Styles.input.classic}
            placeholder="Phone number"
          />
          <Input
            containerStyle={Styles.input.classic}
            placeholder="Email"
          />
          <Input
            containerStyle={Styles.input.classic}
            placeholder="School"
          />
          <Input
            containerStyle={Styles.input.classic}
            placeholder="Message"
          />
          <View style={LocalStyles.button}>
            <Button
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
