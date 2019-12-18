import React, { PureComponent } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";

import { createTabNavigationOptions } from '../../../../platform/services/navigation';
import Styles from "../../../../../assets/styles";
import LocalStyles from './styles';
  
const list = [
  {
    name: 'Vectors',
    avatar_url: '',
  },
  {
    name: 'Functions',
    avatar_url: '',
  },
  {
    name: 'Graphs',
    avatar_url: '',
  },
  {
    name: 'Polynomials',
    avatar_url: '',
  },
  {
    name: 'Algebraic Structures',
    avatar_url: '',
  },
  {
    name: 'Binomial Expansion',
    avatar_url: '',
  },
];

class Learning extends PureComponent {

  static navigationOptions = createTabNavigationOptions('Learning', 'Learning', 'sunny');

  render() {

    return (
      <View style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {list.map(item => <ListItem
              key={item.name}
              title={item.name}
              containerStyle={LocalStyles.listItem}
              leftAvatar={{ uri: item.avatar_url }}
              roundAvatar
              chevron
            />)}
          </View>
        </View>
      </View>
    );
  }
};

export default Learning;