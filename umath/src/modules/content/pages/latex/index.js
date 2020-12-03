import React, { PureComponent } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import MathJax from "react-native-mathjax";

import { createTabNavigationOptions } from '../../../../platform/services/navigation';
import Styles from "../../../../../assets/styles";
import LocalStyles from './styles';

class Learning extends PureComponent {

  static navigationOptions = createTabNavigationOptions('Learning', 'Learning', 'sunny');

  state = {
    latex: '',
    viewing: false,
  };

  change = latex => this.setState({ latex });

  render() {
    const { latex, viewing } = this.state;

    return (
      <View style={Styles.page}>
        {viewing ? <View>
          <View style={{ ...LocalStyles.button, marginBottom: 40 }}>
            <Button
              title="Back"
              type="clear"
              titleStyle={Styles.button.title}
              onPress={() => this.setState({ viewing: false, latex: '' })}
            />
          </View>
          <MathJax
            // style={{ flex: 1, flexDirection: 'column' }}
            html={`$${latex}$`}
          />
        </View> : <View style={LocalStyles.container}>
          <Input
            containerStyle={Styles.input.classic}
            onChangeText={this.change}
            placeholder="Write LaTeX"
          />  
          <View style={LocalStyles.button}>
            <Button
              title="Test"
              type="clear"
              titleStyle={Styles.button.title}
              onPress={() => this.setState({ viewing: true })}
            />
          </View>
        </View>}
      </View>
    );
  }
};

export default Learning;